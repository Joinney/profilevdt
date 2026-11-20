import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Character3DCanvas({
  isAutoSpin = true,
  onAngleChange,
  resetTrigger = 0,
  theme = 'dark'
}) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const pivotRef = useRef(null);
  const initialCamPos = useRef(new THREE.Vector3(0, 1.25, 3.6));
  const initialTarget = useRef(new THREE.Vector3(0, 1.15, 0));

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Khôi phục góc nhìn chính diện
  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current && cameraRef.current) {
      const controls = controlsRef.current;
      const camera = cameraRef.current;
      camera.position.copy(initialCamPos.current);
      controls.target.copy(initialTarget.current);
      controls.update();
      if (onAngleChange) onAngleChange(0);
    }
  }, [resetTrigger, onAngleChange]);

  // Đồng bộ trạng thái tự xoay
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoSpin;
    }
  }, [isAutoSpin]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.copy(initialCamPos.current);
    cameraRef.current = camera;

    // 3. Renderer (Nền trong suốt chuẩn suốt chamber)
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      setLoadError('Trình duyệt không hỗ trợ WebGL');
      setIsLoading(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = theme === 'light' ? 1.1 : 1.35;
    container.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(initialTarget.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.minDistance = 2.2;
    controls.maxDistance = 5.2;
    controls.autoRotate = isAutoSpin;
    controls.autoRotateSpeed = 2.6;
    controls.minPolarAngle = Math.PI / 4.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.12;
    controlsRef.current = controls;

    // 5. Lighting (Studio Cyber Hologram Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'light' ? 1.6 : 1.4);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Fill Light Cyber Cyan
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Rim Back Light
    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.4);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Pedestal Upward Point Light
    const pedestalLight = new THREE.PointLight(0x06b6d4, 1.8, 4.5);
    pedestalLight.position.set(0, 0.1, 0);
    scene.add(pedestalLight);

    // 6. Pivot group chứa nhân vật
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivotRef.current = pivot;

    // 7. Tải Model GLB với Meshopt Decoder
    let isMounted = true;

    async function loadModel() {
      try {
        await MeshoptDecoder.ready;

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);

        loader.load(
          '/avatar3d.glb',
          (gltf) => {
            if (!isMounted) return;
            const model = gltf.scene;

            // Tính toán bounding box để căn giữa và chuẩn hóa kích thước
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Đặt chân nhân vật chạm mặt bục (y = 0) và tâm (x=0, z=0)
            model.position.set(-center.x, -box.min.y, -center.z);

            // Tỷ lệ chuẩn vừa vặn với cyber chamber
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetHeight = 2.2;
            const scale = targetHeight / (maxDim || 1);
            pivot.scale.setScalar(scale);

            // Tối ưu PBR materials và shadows
            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  child.material.side = THREE.DoubleSide;
                  child.material.needsUpdate = true;
                }
              }
            });

            pivot.add(model);
            setIsLoading(false);
          },
          (xhr) => {
            if (xhr.lengthComputable && isMounted) {
              const percent = Math.min(99, Math.round((xhr.loaded / xhr.total) * 100));
              setLoadingProgress(percent);
            }
          },
          (error) => {
            console.error('Lỗi khi tải model 3D:', error);
            if (isMounted) {
              setLoadError('Không thể tải mô hình 3D');
              setIsLoading(false);
            }
          }
        );
      } catch (err) {
        console.error('Lỗi khởi tạo MeshoptDecoder:', err);
        if (isMounted) {
          setLoadError('Lỗi giải nén meshopt');
          setIsLoading(false);
        }
      }
    }

    loadModel();

    // 8. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();

      // Cập nhật góc quay ra ngoài HUD
      if (onAngleChange) {
        const azimuth = controls.getAzimuthalAngle();
        const deg = Math.round((azimuth * 180) / Math.PI);
        onAngleChange(deg);
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // 10. Cleanup
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();

      // Giải phóng bộ nhớ Three.js
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, onAngleChange]);

  if (loadError) {
    return (
      <div className="character-model-fallback">
        <img
          src="/teo_hd_clean.gif"
          alt="Võ Duy Toàn 3D Avatar"
          className="character-model-img"
          onError={(e) => { e.target.src = '/teo3d.gif'; }}
        />
        <div className="fallback-badge">
          <span>{loadError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="character-3d-canvas-container" ref={mountRef}>
      {isLoading && (
        <div className="character-3d-loading-overlay">
          <div className="cyber-loader-spinner"></div>
          <div className="cyber-loader-text">
            <span>TẢI MÔ HÌNH 3D PBR</span>
            <strong>{loadingProgress}%</strong>
          </div>
          <div className="cyber-loader-bar">
            <div
              className="cyber-loader-fill"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
