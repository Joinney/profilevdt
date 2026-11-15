import React, { useState, useEffect, useRef } from 'react';

// Dữ liệu mã nguồn thực tế từ Google Sheets (38 sản phẩm hoàn chỉnh)
const sourceCodes = [
  {
    "id": 36,
    "title": "Cây Thông Noel",
    "category": "3D",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/14LwjFssL9GHow1YWQgKmLa5uTwg93747",
    "driveLink": "https://drive.google.com/file/d/14LwjFssL9GHow1YWQgKmLa5uTwg93747/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766242220/taivideo.vn_-_Cy_Thng_merrychristmas_code_caythongnoel_noel_foryou_grfxzc.mp4",
    "demo": "",
    "download": "https://drive.google.com/drive/folders/1DzJaVRHXL-PwuQJzUrVM9X-izn9HGkkT?usp=sharing"
  },
  {
    "id": 37,
    "title": "Cây Thông Noel 2",
    "category": "3D",
    "lang": "HTML",
    "price": "20k",
    "date": "17/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1pyohzb0G1IAEV_zRaVNZY8z4Mvy0MHG9",
    "driveLink": "https://drive.google.com/file/d/1pyohzb0G1IAEV_zRaVNZY8z4Mvy0MHG9/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766243312/taivideo.vn_-_Ln_siu_phm_n_code_tinhyeu_xuhuong_merrychristmas_caythongnoel_i80xy2.mp4",
    "demo": "",
    "download": "https://drive.google.com/drive/folders/1DzJaVRHXL-PwuQJzUrVM9X-izn9HGkkT?usp=sharing"
  },
  {
    "id": 1,
    "title": "Thầy trò rủ nhau đi thỉnh kinh",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "30K",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1TuPKB-3tPv9SHqi7D_RMdrPgu3gcf_02",
    "driveLink": "https://drive.google.com/file/d/1TuPKB-3tPv9SHqi7D_RMdrPgu3gcf_02/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1765945480/taivideo.vn_-_Thy_tr_r_nhau_i_thnh_kinh_trn_html_html_website_animation_tayduky_laptrinh_foryou_trend_viral_coder_hoctap_ycrbg0.mp4",
    "demo": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1765945480/taivideo.vn_-_Thy_tr_r_nhau_i_thnh_kinh_trn_html_html_website_animation_tayduky_laptrinh_foryou_trend_viral_coder_hoctap_ycrbg0.mp4",
    "download": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1765945480/taivideo.vn_-_Thy_tr_r_nhau_i_thnh_kinh_trn_html_html_website_animation_tayduky_laptrinh_foryou_trend_viral_coder_hoctap_ycrbg0.mp4"
  },
  {
    "id": 2,
    "title": "Vẽ Tom and Jerry bằng python",
    "category": "HOATHINH",
    "lang": "PYTHON",
    "price": "FREE(follow)",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1TqyY7jqd8atlBCNhHFtItT-86RivtsbT",
    "driveLink": "https://drive.google.com/file/d/1TqyY7jqd8atlBCNhHFtItT-86RivtsbT/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1765946494/taivideo.vn_-_V_Tom_and_Jerry_bng_python_laptrinh_foryou_trend_viral_tomandjerry_hoctap_coder_draw_eb8exm.mp4",
    "demo": "",
    "download": "gà công nghiệp"
  },
  {
    "id": 3,
    "title": "Loopy đáng yêu",
    "category": "HOATHINH",
    "lang": "PYTHON",
    "price": "10K",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1yVnSLgXFk6V-LkRTMj5aVoaTwFIrMi1r",
    "driveLink": "https://drive.google.com/file/d/1yVnSLgXFk6V-LkRTMj5aVoaTwFIrMi1r/view?usp=drive_link",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1765955326/taivideo.vn_-_Loopy_ng_yu_c_share_cho_nhng_ai_thch_nh_laptrinh_loopy_cute_cute_trending_viral_foryou_draw_tiktok_kjrsbp.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 4,
    "title": "I Love Yêu 2d",
    "category": "To Tinh",
    "lang": "HTML",
    "price": "20k",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1H8HteDzv83ncRNY6-YoireLkTJobe17E",
    "driveLink": "https://drive.google.com/file/d/1H8HteDzv83ncRNY6-YoireLkTJobe17E/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1765956152/taivideo.vn_-_I_Love_Yu_cute_viral_foryou_love_tiktok_html_xuhuong_beutiful_ndv1cl.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 5,
    "title": "Change Photo",
    "category": "HINHANH",
    "lang": "HTML",
    "price": "10K",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1Hl8Zu5iGJ7_t87ESBGDmzPHk4CzP7o-N",
    "driveLink": "https://drive.google.com/file/d/1Hl8Zu5iGJ7_t87ESBGDmzPHk4CzP7o-N/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766037666/taivideo.vn_-_Change_Photo_viral_htmlcss_foryou_TeoHocLapTrinh_xuhuong_p39vjf.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 6,
    "title": "Baw chiu một chút màu mè cho trang web của minh",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "10k",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/16Dk6AZiFqOJnrpGJGg09tYn-cS5-_wmk",
    "driveLink": "https://drive.google.com/file/d/16Dk6AZiFqOJnrpGJGg09tYn-cS5-_wmk/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766038591/taivideo.vn_-_Baw_chiu_mt_cht_mu_m_cho_trang_web_ca_minh_thobaymau_code_html_viral_tiktok_foryou_cuocsong_chill_pkzz21.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 7,
    "title": "Web tỏ tình",
    "category": "To Tinh",
    "lang": "HTML",
    "price": "10k",
    "date": "20/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1rk21fevsI2d8aDTlcSi9x2JXXn8mfKQE",
    "driveLink": "https://drive.google.com/file/d/1rk21fevsI2d8aDTlcSi9x2JXXn8mfKQE/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766078570/taivideo.vn_-_Web_t_tnh_code_html_viral_tiktok_foryou_cute_love_laptrinh_frsvxr.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 8,
    "title": "Profile Card",
    "category": "Card",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/10r0eZzN4OcjREdJPVFsj3ZDsVyRo6tIE",
    "driveLink": "https://drive.google.com/file/d/10r0eZzN4OcjREdJPVFsj3ZDsVyRo6tIE/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766079002/taivideo.vn_-_Tiktok_w8k6vd.mp4",
    "demo": "",
    "download": "https://drive.google.com/drive/folders/1AE37Pavc0B4fTiPBjHAnYcnU4iezB988"
  },
  {
    "id": 9,
    "title": "Nghệ Sĩ Đường Phố",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "10k",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1xezHY0Qv8y4HCxVBMcOHQ1JE8z6snJec",
    "driveLink": "https://drive.google.com/file/d/1xezHY0Qv8y4HCxVBMcOHQ1JE8z6snJec/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766079322/taivideo.vn_-_Tiktok_1_lfhwbs.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 10,
    "title": "Box Shoes",
    "category": "Card",
    "lang": "HTML",
    "price": "10k",
    "date": "16/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1l6FHdGc2EQnB6Lz0O7BYm1LXLlzgQSfI",
    "driveLink": "https://drive.google.com/file/d/1l6FHdGc2EQnB6Lz0O7BYm1LXLlzgQSfI/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766079672/taivideo.vn_-_Tiktok_2_lcxgpt.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 11,
    "title": "One piece card",
    "category": "Card",
    "lang": "HTML",
    "price": "10k",
    "date": "20/12/2025",
    "img": "https://lh3.googleusercontent.com/d/1EHV16jSyccESNgV-HtItIQYqHVCbCxW5",
    "driveLink": "https://drive.google.com/file/d/1EHV16jSyccESNgV-HtItIQYqHVCbCxW5/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766250130/taivideo.vn_-_Onepiece_card_onepiece_luffy_zoro_sanji_html_3d_viral_foryou_tiktok_ysithh.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 12,
    "title": "Text + IMG",
    "category": "HINHANH",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "16/10/2025",
    "img": "https://lh3.googleusercontent.com/d/1sKobmjNi-4GCW1-lV6t7j-l3Hrv2vJmP",
    "driveLink": "https://drive.google.com/file/d/1sKobmjNi-4GCW1-lV6t7j-l3Hrv2vJmP/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766250537/taivideo.vn_-_Text_IMG_htmlcss_viral_foryou_tiktok_xuhuong_code_j9yze0.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 13,
    "title": "Login cute",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "30k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1LHQL8WgiG9C2VSYNJxSzr8KJ1gbX_Is5",
    "driveLink": "https://drive.google.com/file/d/1LHQL8WgiG9C2VSYNJxSzr8KJ1gbX_Is5/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766250685/taivideo.vn_-_Login_cute_htmlcss_viral_foryou_tiktok_xuhuong_code_javascript_laptrinh_3d_login_p7bsb8.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 14,
    "title": "Tạo Mã QR cho riêng bạn",
    "category": "TOOL",
    "lang": "HTML",
    "price": "...",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1KySj35ek3C26N8asx3Acts5RBz73oLEs",
    "driveLink": "https://drive.google.com/file/d/1KySj35ek3C26N8asx3Acts5RBz73oLEs/view?usp=drive_link",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766251070/taivideo.vn_-_To_M_QR_cho_ring_bn_htmlcss_viral_foryou_xuhuong_tiktok_code_laptrinh_QR_cvb3qs.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 15,
    "title": "Profile Card 2",
    "category": "Card",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/17t2lvix0Y6kzKlY5YQHFxBZWQS0yPjUV",
    "driveLink": "https://drive.google.com/file/d/17t2lvix0Y6kzKlY5YQHFxBZWQS0yPjUV/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766251273/taivideo.vn_-_Profile_Card_htmlcss_viral_foryou_xuhuong_tiktok_code_laptrinh_card_profile_shumsw.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 16,
    "title": "Loading Iron Man 🧍‍♂️",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1yK6xgw9eYNH8_slLYZbfz5Kihzjtiu7u",
    "driveLink": "https://drive.google.com/file/d/1yK6xgw9eYNH8_slLYZbfz5Kihzjtiu7u/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766251616/taivideo.vn_-_Loading_Iron_Man_htmlcss_viral_foryou_xuhuong_tiktok_code_laptrinh_loading_ironman_nhfosp.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 17,
    "title": "Photo card",
    "category": "Card",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1OtIXK171NIC_OGi7dmWLnjLLJfyFUmTV",
    "driveLink": "https://drive.google.com/file/d/1OtIXK171NIC_OGi7dmWLnjLLJfyFUmTV/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766251852/taivideo.vn_-_Photo_card_htmlcss_viral_foryou_xuhuong_tiktok_code_laptrinh_card_hlesyj.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 18,
    "title": "Profile Water",
    "category": "Card",
    "lang": "HTML",
    "price": "30K",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1U3Vyu_whMIcCAQe_OEdmK5FEyB5lWYJw",
    "driveLink": "https://drive.google.com/file/d/1U3Vyu_whMIcCAQe_OEdmK5FEyB5lWYJw/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766251959/taivideo.vn_-_Profile_Water_viral_htmlcss_profile_foryou_TeoHocLapTrinh_kiylga.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 19,
    "title": "Tuỳ Chình trỏ Chuột",
    "category": "Card",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1sOe0rADqQXvoPCWU47oAmQzaWJGXkfBN",
    "driveLink": "https://drive.google.com/file/d/1sOe0rADqQXvoPCWU47oAmQzaWJGXkfBN/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766252174/taivideo.vn_-_Tu_Chnh_tr_Chut_htmlcss_viral_foryou_TeoHocLapTrinh_xuhuong_ssklaq.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 20,
    "title": "Tom khịa dog",
    "category": "HOATHINH",
    "lang": "PYTHON",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1igYL-a31SD0eEoLEsKTtRkg8bczhmESo",
    "driveLink": "https://drive.google.com/file/d/1igYL-a31SD0eEoLEsKTtRkg8bczhmESo/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766252493/taivideo.vn_-_Tom_kha_dog_drawing_xhteohoclaptrinh_nfa9wu.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 21,
    "title": "Error 404 Batman🦇",
    "category": "404",
    "lang": "HTML",
    "price": "15K",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1KaU825hbwlLf7ST4rtpIftZ0zz3Ls_Mm",
    "driveLink": "https://drive.google.com/file/d/1KaU825hbwlLf7ST4rtpIftZ0zz3Ls_Mm/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766252593/taivideo.vn_-_Error_404_Batman_teohoclaptrinh_viral_htmlcss_tiktok_foryou_ahhahh.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 22,
    "title": "MA CA RONG",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/19UQuh1zL9mAsuQ0EN88CEbwrIWVuTjzQ",
    "driveLink": "https://drive.google.com/file/d/19UQuh1zL9mAsuQ0EN88CEbwrIWVuTjzQ/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766252758/taivideo.vn_-_Hot_hnh_htmlcss_viral_tiktok_teohoclaptrinh_foryou_wjfvzd.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 23,
    "title": "Designer Bicycles",
    "category": "Card",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1DdAjixD4kYTBcBt2kcDWK13Kp1d3_MBu",
    "driveLink": "https://drive.google.com/file/d/1DdAjixD4kYTBcBt2kcDWK13Kp1d3_MBu/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766252883/taivideo.vn_-_Designer_Bicycles_htmlcss_viral_teohoclaptrinh_tiktok_foryou_j97mvx.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 24,
    "title": "Profile Technology",
    "category": "Card",
    "lang": "HTML",
    "price": "30k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1ZL1-LaDqwPsWo0kyvYilenlAk9CE-PZX",
    "driveLink": "https://drive.google.com/file/d/1ZL1-LaDqwPsWo0kyvYilenlAk9CE-PZX/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766253063/taivideo.vn_-_Technology_Profile_htmlcss_viral_teohoclaptrinh_tiktok_foryou_mfglxo.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 25,
    "title": "Quack Quack 🦆",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1n6iuClW-j6qGWeKNFKgPflAtVVU3NOzA",
    "driveLink": "https://drive.google.com/file/d/1n6iuClW-j6qGWeKNFKgPflAtVVU3NOzA/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766253206/taivideo.vn_-_Quack_Quack_htmlcss_viral_teohoclaptrinh_tiktok_foryou_tp7j1a.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 26,
    "title": "Card Tiger Beer",
    "category": "Card",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1LTjCWokECT_Eqjxuh8r2KegHbq71vkT8",
    "driveLink": "https://drive.google.com/file/d/1LTjCWokECT_Eqjxuh8r2KegHbq71vkT8/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766253448/taivideo.vn_-_Bia_tiger_viral_teohoclaptrinh_htmlcss_tiktok_foryou_omhfqp.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 27,
    "title": "Drinks Menu 🥰",
    "category": "Card",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1-2VCwn7EX3dhqD8F9bjGsFQV-u9XFY_n",
    "driveLink": "https://drive.google.com/file/d/1-2VCwn7EX3dhqD8F9bjGsFQV-u9XFY_n/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766253865/taivideo.vn_-_Drinks_Menu_teohoclaptrinh_viral_htmlcss_tiktok_foryou_ofqcdg.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 28,
    "title": "Lobby Room 💁‍♂️",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "20k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1m9kifPoHyb8-TcThyNt8obFQ7t0CwF6i",
    "driveLink": "https://drive.google.com/file/d/1m9kifPoHyb8-TcThyNt8obFQ7t0CwF6i/view?usp=drive_link",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766253919/taivideo.vn_-_Lobby_Room_tiktok_foryou_htmlcss_xuhuong_hoclaptrinh_s3hxy2.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 29,
    "title": "Toy Card 📚",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/16KjiWZA2f1-xVlAUqm0CiFDW4wrIy13w",
    "driveLink": "https://drive.google.com/file/d/16KjiWZA2f1-xVlAUqm0CiFDW4wrIy13w/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766254122/taivideo.vn_-_Toy_Card_tiktok_htmlcss_hoclaptrinh_foryou_xuhuong_ypppvu.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 30,
    "title": "Card Love 💕",
    "category": "Card",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1cO6OgadfoDLcvd0x6iJBub03fx6_Xylz",
    "driveLink": "https://drive.google.com/file/d/1cO6OgadfoDLcvd0x6iJBub03fx6_Xylz/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766254582/taivideo.vn_-_Card_Love_tiktok_htmlcss_foryou_xuhuong_hoclaptrinh_ahekzi.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 31,
    "title": "Your Review 🌟",
    "category": "HOATHINH",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1k-hY8As1sGdaqGJXLgsW8ODBqpqa_B1F",
    "driveLink": "https://drive.google.com/file/d/1k-hY8As1sGdaqGJXLgsW8ODBqpqa_B1F/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766254774/taivideo.vn_-_Your_Review_tiktok_htmlcss_foryou_xuhuong_code_muhlgl.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 32,
    "title": "Round Cards 📍",
    "category": "Card",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1N4n3dZauaiB--okZQ4Fv-4oVxgwtU9LQ",
    "driveLink": "https://drive.google.com/file/d/1N4n3dZauaiB--okZQ4Fv-4oVxgwtU9LQ/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766254931/taivideo.vn_-_Round_Cards_tiktok_htmlcss_onepiece_vairal_cuocsongthuongngay_xzmxr8.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 33,
    "title": "barbar game",
    "category": "Game",
    "lang": "HTML",
    "price": "10k",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/115g30pQImu03q0ORMuFV0qBpL2wZqfXv",
    "driveLink": "https://drive.google.com/file/d/115g30pQImu03q0ORMuFV0qBpL2wZqfXv/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766255072/taivideo.vn_-_Tui_th_th_h_8x_9x_tiktok_htmlcss_barbar_giaitri_tuoithotoi_piigr3.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 34,
    "title": "Máy Gắp Thú",
    "category": "Game",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "4/9/2025",
    "img": "https://lh3.googleusercontent.com/d/1k1cD5HMNqV1kQbAhG5396zBEVjh8RPY0",
    "driveLink": "https://drive.google.com/file/d/1k1cD5HMNqV1kQbAhG5396zBEVjh8RPY0/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766255249/taivideo.vn_-_My_gp_th_tiktok_foryou_code_vairal_vuivemoingay_g71909.mp4",
    "demo": "",
    "download": ""
  },
  {
    "id": 35,
    "title": "Thả Kẹo Đa Vũ trụ 😁",
    "category": "Game",
    "lang": "HTML",
    "price": "30k",
    "date": "8/11/2025",
    "img": "https://lh3.googleusercontent.com/d/1_7uZMNFAdY4wtAvStjiWuNHoYHdaxkc-",
    "driveLink": "https://drive.google.com/file/d/1_7uZMNFAdY4wtAvStjiWuNHoYHdaxkc-/view?usp=sharing",
    "video": "https://res.cloudinary.com/dm6fqzwhs/video/upload/v1766255494/taivideo.vn_-_Th_Ko_a_V_tr_foryou_giaitri_game_xuhuong_giangho_gkdjl7.mp4",
    "demo": "https://suikagame-multiverse.netlify.app/",
    "download": ""
  },
  {
    "id": 38,
    "title": "UI_GreenHouse",
    "category": "IOT",
    "lang": "HTML",
    "price": "FREE(follow)",
    "date": "7/11/2025",
    "img": "https://lh3.googleusercontent.com/d/1JlTDyrIXeCcFQ3xVeplhY2Sawm6WtAUT",
    "driveLink": "https://drive.google.com/file/d/1JlTDyrIXeCcFQ3xVeplhY2Sawm6WtAUT/view?usp=sharing",
    "video": "",
    "demo": "https://greenhouseg3td.netlify.app/",
    "download": "NULL"
  }
];

// Danh sách logo ảnh thật các công nghệ / ngôn ngữ chuẩn Devicon SVG (59 công nghệ đa dạng)
const techLogoSources = [
  // Frontend & Web UI
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'NextJS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'VueJS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Angular', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Svelte', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'TailwindCSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Sass', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Redux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'ThreeJS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Vite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Webpack', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
  { name: 'Electron', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg' },

  // Backend & Platforms
  { name: 'NodeJS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'NestJS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'FastAPI', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'CSharp', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'DotNet', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'Go', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'Rust', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
  { name: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Ruby', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
  { name: 'Rails', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg' },
  { name: 'CPlusPlus', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },

  // Mobile & Cross-platform
  { name: 'Flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Dart', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Kotlin', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Swift', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Unity', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
  { name: 'Unreal', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },

  // Databases & Cloud
  { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'SQLite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'GraphQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },

  // DevOps & Tools
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Linux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Nginx', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'GitLab', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
  { name: 'VSCode', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Postman', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'Bash', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' }
];

export default function Home() {
  const [time, setTime] = useState('');
  const canvasRef = useRef(null);

  // Bộ lọc, tìm kiếm và phân trang mã nguồn đồng bộ URL (?page=2, ?category=3D)
  const categories = ['ALL', '3D', 'HOATHINH', 'To Tinh', 'Card', 'Game', 'IOT'];

  const getInitialSourcePage = () => {
    if (typeof window === 'undefined') return 1;
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page') || params.get('p'));
    if (!isNaN(p) && p >= 1) return p;

    // Hỗ trợ cả định dạng hash #page-2 hoặc #page=2
    const hash = window.location.hash;
    const match = hash.match(/page[=-](d+)/);
    if (match) return parseInt(match[1]);

    return 1;
  };

  const getInitialCategory = () => {
    if (typeof window === 'undefined') return 'ALL';
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') || params.get('cat');
    if (cat && categories.map(c => c.toLowerCase()).includes(cat.toLowerCase())) {
      return categories.find(c => c.toLowerCase() === cat.toLowerCase()) || 'ALL';
    }
    return 'ALL';
  };

  const getInitialSearch = () => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || params.get('search') || '';
  };

  const [sourceSearch, setSourceSearch] = useState(getInitialSearch);
  const [sourceCategory, setSourceCategory] = useState(getInitialCategory);
  const [sourcePage, setSourcePage] = useState(getInitialSourcePage);
  const itemsPerPage = 9;

  // Lắng nghe sự kiện Back/Forward của trình duyệt để đồng bộ trang và bộ lọc
  useEffect(() => {
    const handlePopState = () => {
      setSourcePage(getInitialSourcePage());
      setSourceCategory(getInitialCategory());
      setSourceSearch(getInitialSearch());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateSourceUrl = (newPage, newCat, newSearch) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (newPage && newPage > 1) {
      url.searchParams.set('page', newPage);
    } else {
      url.searchParams.delete('page');
      url.searchParams.delete('p');
    }

    if (newCat && newCat !== 'ALL') {
      url.searchParams.set('category', newCat);
    } else {
      url.searchParams.delete('category');
      url.searchParams.delete('cat');
    }

    if (newSearch && newSearch.trim()) {
      url.searchParams.set('q', newSearch.trim());
    } else {
      url.searchParams.delete('q');
      url.searchParams.delete('search');
    }

    const newPath = url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
    window.history.pushState({ page: newPage, category: newCat, q: newSearch }, '', newPath);
  };

  const handlePageChange = (newPage) => {
    setSourcePage(newPage);
    updateSourceUrl(newPage, sourceCategory, sourceSearch);
  };

  const handleCategoryChange = (newCat) => {
    setSourceCategory(newCat);
    setSourcePage(1);
    updateSourceUrl(1, newCat, sourceSearch);
  };

  const handleSearchChange = (newSearch) => {
    setSourceSearch(newSearch);
    setSourcePage(1);
    updateSourceUrl(1, sourceCategory, newSearch);
  };

  const buildPageUrl = (targetPage) => {
    if (typeof window === 'undefined') return '#';
    const url = new URL(window.location.href);
    if (targetPage > 1) {
      url.searchParams.set('page', targetPage);
    } else {
      url.searchParams.delete('page');
      url.searchParams.delete('p');
    }
    return url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
  };

  const buildCategoryUrl = (cat) => {
    if (typeof window === 'undefined') return '#';
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    url.searchParams.delete('p');
    if (cat !== 'ALL') {
      url.searchParams.set('category', cat);
    } else {
      url.searchParams.delete('category');
      url.searchParams.delete('cat');
    }
    return url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
  };

  const filteredSources = sourceCodes.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      item.lang.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(sourceSearch.toLowerCase()));
    const matchesCategory = sourceCategory === 'ALL' || item.category.toLowerCase() === sourceCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredSources.length / itemsPerPage));
  const currentSources = filteredSources.slice((sourcePage - 1) * itemsPerPage, sourcePage * itemsPerPage);

  // Trạng thái điều khiển Nhân vật 3D Hologram
  const [modelAngle, setModelAngle] = useState(0);
  const [modelTiltX, setModelTiltX] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const isDraggingModel = useRef(false);
  const startDragX = useRef(0);
  const startDragY = useRef(0);
  const startAngle = useRef(0);
  const startTilt = useRef(0);

  const handleStagePointerDown = (e) => {
    isDraggingModel.current = true;
    setIsAutoSpin(false);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    startDragX.current = clientX;
    startDragY.current = clientY;
    startAngle.current = modelAngle;
    startTilt.current = modelTiltX;
  };

  const handleStagePointerMove = (e) => {
    if (!isDraggingModel.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - startDragX.current;
    const deltaY = clientY - startDragY.current;
    const newAngle = Math.max(-45, Math.min(45, startAngle.current + deltaX * 0.5));
    const newTilt = Math.max(-12, Math.min(12, startTilt.current - deltaY * 0.25));
    setModelAngle(newAngle);
    setModelTiltX(newTilt);
  };

  const handleStagePointerUp = () => {
    isDraggingModel.current = false;
  };

  // Đồng hồ kỹ thuật số
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mô phỏng bể nước vật lý thực thể thời gian thực
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initSprings();
    };
    window.addEventListener('resize', handleResize);

    // 1. CÁC ĐIỂM LÒ XO MẶT NƯỚC (SPRING MESH WATER)
    const springCount = 70;
    let springs = [];
    const tension = 0.025;
    const dampening = 0.025;
    const spread = 0.25;

    function initSprings() {
      springs = [];
      const baseHeight = height * 0.35; // Mực nước ở 35% chiều cao bể
      for (let i = 0; i < springCount; i++) {
        springs.push({
          x: (i / (springCount - 1)) * width,
          y: baseHeight,
          targetY: baseHeight,
          speed: 0
        });
      }
    }
    initSprings();

    function splash(index, speed) {
      if (index >= 0 && index < springs.length) {
        springs[index].speed = speed;
      }
    }

    // 2. TẢI ẢNH LOGO THẬT VÀ KHỞI TẠO CÁC THỰC THỂ LOGO BƠI LỘI TRONG BỂ
    const loadedLogos = techLogoSources.map(item => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.url;
      return { ...item, img, loaded: false };
    });

    loadedLogos.forEach(item => {
      item.img.onload = () => { item.loaded = true; };
    });

    // Đàn 59 logo công nghệ & ngôn ngữ bơi lội đa tầng độ sâu 3D (Foreground, Midground, Background)
    const techEntities = techLogoSources.map((_, index) => {
      const speedDirection = index % 2 === 0 ? 1 : -1;
      // 3 tầng độ sâu thị giác
      const depthLayer = index % 3; // 0: tiền cảnh, 1: trung cảnh, 2: hậu cảnh
      const size = depthLayer === 0 ? 28 + (index % 4) * 2 : depthLayer === 1 ? 23 + (index % 3) * 2 : 18 + (index % 3) * 2;
      const baseSpeed = depthLayer === 0 ? 0.72 + (index % 5) * 0.09 : depthLayer === 1 ? 0.52 + (index % 4) * 0.07 : 0.36 + (index % 3) * 0.05;
      const alpha = depthLayer === 0 ? 0.95 : depthLayer === 1 ? 0.8 : 0.6;
      return {
        logoIndex: index,
        depthLayer,
        alpha,
        x: ((index * 42 + 20) % ((width || 700) + 80)) - 40,
        y: height * (0.38 + ((index * 9) % 50) * 0.01),
        vx: speedDirection * baseSpeed,
        size,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (index % 2 === 0 ? 1 : -1) * (0.006 + (index % 4) * 0.002)
      };
    });

    // 3. KHỞI TẠO BỌT NƯỚC (BUBBLES)
    const bubbles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 80,
      r: Math.random() * 3.5 + 1.5,
      speedY: Math.random() * 0.9 + 0.6,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleAmp: Math.random() * 1.4 + 0.6,
      seed: Math.random() * 100
    }));

    // 4. KHỞI TẠO RONG BIỂN ĐÁY BỂ (SEAWEEDS)
    const seaweeds = Array.from({ length: 8 }, (_, i) => ({
      baseX: 25 + i * (width / 9) + (Math.random() * 15 - 7),
      height: 60 + Math.random() * 35,
      swayOffset: Math.random() * Math.PI * 2,
      segments: 5
    }));

    let timeStep = 0;

    // VÒNG LẶP RENDER VẬT LÝ NƯỚC
    const render = () => {
      timeStep += 0.03;
      ctx.clearRect(0, 0, width, height);

      // A. Cập nhật lò xo mặt nước
      for (let i = 0; i < springs.length; i++) {
        const sp = springs[i];
        const delta = sp.targetY - sp.y;
        sp.speed += tension * delta - sp.speed * dampening;
        sp.y += sp.speed;
      }

      // Sóng tự tạo nhịp nhàng ngẫu nhiên
      if (Math.random() < 0.05) {
        const randIndex = Math.floor(Math.random() * springs.length);
        splash(randIndex, (Math.random() * 2.5 - 1.25));
      }

      // Lan truyền lực sóng sang hai bên
      const leftDeltas = new Array(springs.length).fill(0);
      const rightDeltas = new Array(springs.length).fill(0);
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < springs.length; i++) {
          if (i > 0) {
            leftDeltas[i] = spread * (springs[i].y - springs[i - 1].y);
            springs[i - 1].speed += leftDeltas[i];
          }
          if (i < springs.length - 1) {
            rightDeltas[i] = spread * (springs[i].y - springs[i + 1].y);
            springs[i + 1].speed += rightDeltas[i];
          }
        }
      }

      // B. Vẽ Khối nước chính & Độ dốc nước sâu (Deep Ocean Gradient)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(springs[0].x, springs[0].y);
      for (let i = 1; i < springs.length; i++) {
        const prev = springs[i - 1];
        const curr = springs[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.lineTo(springs[springs.length - 1].x, springs[springs.length - 1].y);
      ctx.lineTo(width, height);
      ctx.closePath();

      const waterGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
      waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.45)');
      waterGrad.addColorStop(0.3, 'rgba(2, 132, 199, 0.65)');
      waterGrad.addColorStop(1, 'rgba(3, 30, 60, 0.88)');
      ctx.fillStyle = waterGrad;
      ctx.fill();

      // C. Tia sáng mặt trời tán xạ qua nước (Sun Rays / Caustic Shafts)
      for (let r = 0; r < 4; r++) {
        const rayX = width * (0.2 + r * 0.22) + Math.sin(timeStep + r) * 25;
        const rayGrad = ctx.createLinearGradient(rayX, 0, rayX + 40, height);
        rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
        rayGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.04)');
        rayGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(rayX - 10, springs[0].targetY);
        ctx.lineTo(rayX + 35, springs[0].targetY);
        ctx.lineTo(rayX + 85, height);
        ctx.lineTo(rayX - 55, height);
        ctx.closePath();
        ctx.fill();
      }

      // D. Vẽ Rong biển đung đưa đáy bể
      seaweeds.forEach(sw => {
        ctx.save();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sw.baseX, height);

        let currX = sw.baseX;
        let currY = height;
        const segLen = sw.height / sw.segments;

        for (let s = 1; s <= sw.segments; s++) {
          const sway = Math.sin(timeStep * 1.5 + sw.swayOffset + s * 0.4) * (s * 4);
          const nextX = sw.baseX + sway;
          const nextY = height - s * segLen;
          ctx.quadraticCurveTo(currX, currY, nextX, nextY);
          currX = nextX;
          currY = nextY;
        }
        ctx.stroke();
        ctx.restore();
      });

      // E. CẬP NHẬT VÀ VẼ ĐÀN 59 LOGO CÔNG NGHỆ BƠI LỘI ĐA TẦNG DƯỚI NƯỚC
      techEntities.forEach(tech => {
        tech.x += tech.vx;
        tech.rot += tech.rotSpeed;
        const waveY = Math.sin(timeStep * (2.0 + tech.depthLayer * 0.3) + tech.x * 0.025 + tech.logoIndex) * 5;
        const curY = tech.y + waveY;

        // Tự tuần hoàn bơi qua lại khi bơi ra ngoài mép bể
        if (tech.vx > 0 && tech.x > width + 45) {
          tech.x = -45;
          tech.y = height * (0.38 + Math.random() * 0.48);
        } else if (tech.vx < 0 && tech.x < -45) {
          tech.x = width + 45;
          tech.y = height * (0.38 + Math.random() * 0.48);
        }

        const logoData = loadedLogos[tech.logoIndex];
        ctx.save();
        ctx.globalAlpha = tech.alpha;
        ctx.translate(tech.x, curY);
        ctx.rotate(tech.rot);

        // Vòng cầu bong bóng nước thủy tinh bao quanh logo
        ctx.beginPath();
        ctx.arc(0, 0, tech.size * 0.68, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Điểm phản chiếu ánh sáng bong bóng
        ctx.beginPath();
        ctx.arc(-tech.size * 0.22, -tech.size * 0.22, tech.size * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.fill();

        // Bóng mờ phản xạ chiều sâu nước
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        if (logoData && logoData.loaded) {
          // Vẽ logo ảnh thật
          ctx.drawImage(
            logoData.img,
            -tech.size / 2,
            -tech.size / 2,
            tech.size,
            tech.size
          );
        } else if (logoData) {
          // Fallback bong bóng công nghệ phát sáng trong lúc chờ tải
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(8, Math.round(tech.size * 0.34))}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(logoData.name.slice(0, 3).toUpperCase(), 0, 0);
        }

        ctx.restore();
      });

      // F. Cập nhật và vẽ bọt nước sủi tăm
      bubbles.forEach(b => {
        b.y -= b.speedY;
        b.x += Math.sin(timeStep * 2 + b.seed) * b.wobbleAmp * 0.35;

        // Vẽ bong bóng phản quang
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Đốm sáng trên bong bóng
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.restore();

        // Nổi lên tới mặt nước thì vỡ và tái sinh ở đáy
        const waterSurfaceY = springs[Math.floor((b.x / width) * (springs.length - 1))]?.y || height * 0.35;
        if (b.y <= waterSurfaceY) {
          b.y = height + Math.random() * 40;
          b.x = Math.random() * width;
        }
      });

      // G. Vẽ đường viền sáng óng ánh trên đỉnh mặt nước (Water Surface Foam)
      ctx.beginPath();
      ctx.moveTo(springs[0].x, springs[0].y);
      for (let i = 1; i < springs.length; i++) {
        const prev = springs[i - 1];
        const curr = springs[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Tương tác chạm hoặc rê chuột tạo sóng nước cuộn trào
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const pointerX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const index = Math.floor((pointerX / width) * springs.length);
      splash(index, 7);
      if (index > 0) splash(index - 1, 4);
      if (index < springs.length - 1) splash(index + 1, 4);
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="layout-2col">
        {/* CỘT TRÁI */}
        <div className="col-main">
          <div className="hero-grid">
            {/* PROFILE CARD */}
            <div className="box profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
              <div className="circle-overlay"></div>
              <div className="profile-content">
                <div className="box avatar-box" style={{ '--w': '80px', '--h': '80px', '--r': '9999px', '--tr': '35%' }}>
                  <div className="circle-overlay"></div>
                  <img 
                    src="/teo.jpeg" 
                    alt="Avatar" 
                    className="avatar-img" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }} 
                  />
                </div>
                <div>
                  <h2 className="name">Võ Duy Toàn</h2>
                  <p className="role">Software Engineer</p>
                </div>
                <div className="tag-row">
                  <span className="tag-badge">Designer</span>
                  <span className="tag-badge">Writer</span>
                  <span className="tag-badge">Developer</span>
                  <span className="tag-badge">Backend</span>
                </div>
                <div className="social-row">
                  <a href="https://github.com/Joinney" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* BỂ THỦY CUNG VẬT LÝ NƯỚC: LOGO CÔNG NGHỆ THẬT BƠI LỘI */}
            <div className="box live-aquarium-box" style={{ '--w': '100%', '--h': '100%', '--r': '24px', '--tr': '18%' }}>
              <div className="circle-overlay"></div>

              {/* Canvas hiển thị dòng nước lò xo, logo bơi và ánh sáng mặt trời */}
              <canvas ref={canvasRef} className="water-canvas"></canvas>

              {/* Lớp kính phản chiếu ánh sáng vát chéo */}
              <div className="glass-reflection-glare"></div>


            </div>
          </div>

          <div className="controls-row">
            <div className="pills-group">
              <div className="box pill-btn active" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
                <span>Nổi bật</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <span>Mới nhất</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <i className="fas fa-layer-group"></i>
                <span>Danh mục</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <span>&lt;/&gt; Ngôn ngữ</span>
              </div>
            </div>

            <div className="box clock-box" style={{ '--w': '160px', '--h': '38px', '--r': '9999px' }}>
              <div className="circle-overlay"></div>
              <span className="clock-text">{time}</span>
            </div>
          </div>

          <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            
            <div className="source-header">
              <div className="source-title-group" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', zIndex: 10 }}>
                <div className="source-title">MÃ NGUỒN</div>
                <span className="source-count-badge" style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, background: 'rgba(56, 189, 248, 0.12)', padding: '2px 8px', borderRadius: '9999px' }}>
                  {filteredSources.length} sản phẩm
                </span>
              </div>
              <div className="box search-mini-box" style={{ '--w': '220px', '--h': '32px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <input 
                  type="text" 
                  placeholder="Tìm kiếm source code..." 
                  value={sourceSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <i className="fas fa-search" style={{ zIndex: 10, color: '#64748b', fontSize: '11px' }}></i>
              </div>
            </div>

            {/* Bộ lọc danh mục */}
            <div className="category-filter-row" style={{ display: 'flex', gap: '0.45rem', marginBottom: '1rem', zIndex: 10, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <a
                  key={cat}
                  href={buildCategoryUrl(cat)}
                  className={`box cat-filter-btn ${sourceCategory === cat ? 'active' : ''}`}
                  style={{
                    '--w': 'auto',
                    '--h': '28px',
                    '--r': '9999px',
                    '--tr': '15%',
                    border: 'none',
                    padding: '0 12px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryChange(cat);
                  }}
                >
                  <div className="circle-overlay"></div>
                  <span style={{ zIndex: 10 }}>{cat === 'ALL' ? 'Tất cả' : cat}</span>
                </a>
              ))}
            </div>

            <div className="grid-3x3">
              {currentSources.map((item, index) => (
                <div key={item.id || index} className="box code-card-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', '--tr': '15%' }}>
                  <div className="circle-overlay"></div>
                  <div className="card-thumb" style={{ zIndex: 10 }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80';
                      }}
                    />
                    <span className="thumb-badge">
                      <i className="fas fa-tag" style={{ fontSize: '7px' }}></i> {item.price || 'FREE'}
                    </span>
                    <span 
                      className="thumb-tech-icon"
                      style={{
                        background: item.lang.includes('PYTHON') ? '#3b82f6' : '#e34f26'
                      }}
                    >
                      {item.lang.includes('PYTHON') ? 'Py' : '5'}
                    </span>
                  </div>
                  <div className="card-title-text" style={{ zIndex: 10 }} title={item.title}>{item.title}</div>
                  <div className="card-meta" style={{ zIndex: 10 }}>
                    <span>{item.lang} • {item.date}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {item.video && (
                        <a 
                          href={item.video} 
                          target="_blank" 
                          rel="noreferrer" 
                          title="Xem video demo"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <i className="fas fa-play" style={{ fontSize: '0.75rem' }}></i>
                        </a>
                      )}
                      {item.demo && (
                        <a 
                          href={item.demo} 
                          target="_blank" 
                          rel="noreferrer" 
                          title="Xem demo"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <i className="fas fa-eye"></i>
                        </a>
                      )}
                      {(item.download || item.driveLink) && (
                        <a 
                          href={item.download || item.driveLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          title="Tải mã nguồn"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <i className="fas fa-download"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Phân trang động */}
            {totalPages > 1 && (
              <div className="pagination-row">
                <a
                  href={buildPageUrl(Math.max(1, sourcePage - 1))}
                  className="box page-btn"
                  style={{
                    '--w': '28px',
                    '--h': '28px',
                    '--r': '9999px',
                    border: 'none',
                    cursor: sourcePage === 1 ? 'not-allowed' : 'pointer',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: sourcePage === 1 ? 0.35 : 1
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (sourcePage > 1) handlePageChange(sourcePage - 1);
                  }}
                  aria-label="Trang trước"
                >
                  <div className="circle-overlay"></div>
                  <span style={{ zIndex: 10 }}>&lt;</span>
                </a>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <a
                    key={pageNum}
                    href={buildPageUrl(pageNum)}
                    className={`box page-btn ${sourcePage === pageNum ? 'active' : ''}`} 
                    style={{
                      '--w': '28px',
                      '--h': '28px',
                      '--r': '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNum);
                    }}
                  >
                    <div className="circle-overlay"></div>
                    <span style={{ zIndex: 10 }}>{pageNum}</span>
                  </a>
                ))}

                <a
                  href={buildPageUrl(Math.min(totalPages, sourcePage + 1))}
                  className="box page-btn"
                  style={{
                    '--w': '28px',
                    '--h': '28px',
                    '--r': '9999px',
                    border: 'none',
                    cursor: sourcePage === totalPages ? 'not-allowed' : 'pointer',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: sourcePage === totalPages ? 0.35 : 1
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (sourcePage < totalPages) handlePageChange(sourcePage + 1);
                  }}
                  aria-label="Trang sau"
                >
                  <div className="circle-overlay"></div>
                  <span style={{ zIndex: 10 }}>&gt;</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="col-side">
          {/* KHUNG NHÂN VẬT 3D CYBER HUD CHAMBER (Đúng chuẩn thiết kế) */}
          <div className="box character-3d-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            
            {/* Header thẻ 3D */}
            <div className="character-3d-header">
              <div className="character-title-wrap">
                <i className="fas fa-cube"></i>
                <span>NHÂN VẬT 3D</span>
              </div>
              <div className="character-status-badge">
                <span className="live-dot-pulse"></span>
                <span>XOAY 360°</span>
              </div>
            </div>

            {/* Sân khấu Hologram Cyber Chamber 3D */}
            <div 
              className="character-3d-stage cyber-chamber"
              onMouseDown={handleStagePointerDown}
              onMouseMove={handleStagePointerMove}
              onMouseUp={handleStagePointerUp}
              onMouseLeave={handleStagePointerUp}
              onTouchStart={handleStagePointerDown}
              onTouchMove={handleStagePointerMove}
              onTouchEnd={handleStagePointerUp}
              title="Kéo hoặc rê chuột để chỉnh góc phối cảnh 3D"
            >
              {/* 4 Góc Khung HUD Corner Brackets */}
              <div className="hud-corner-bracket hud-cb-tl"></div>
              <div className="hud-corner-bracket hud-cb-tr"></div>
              <div className="hud-corner-bracket hud-cb-bl"></div>
              <div className="hud-corner-bracket hud-cb-br"></div>

              {/* Sàn Lưới Không Gian 3D (Perspective Cyber Grid Floor) */}
              <div className="cyber-grid-floor"></div>

              {/* Cột Ống Kính Hologram Phát Sáng (Hologram Capsule Cylinder) */}
              <div className="hologram-capsule-tube">
                <div className="capsule-tube-glow"></div>
                <div className="capsule-scan-ring"></div>
              </div>

              {/* Bục Vòng Tròn Hologram Phát Sáng Dưới Chân */}
              <div className="pedestal-rings-concentric">
                <div className="pedestal-ring-out"></div>
                <div className="pedestal-ring-glow"></div>
                <div className="pedestal-ring-in"></div>
              </div>

              {/* HUD BÊN TRÁI: Wireframe Body, 3D Cube, Tech Specs, Waveform */}
              <div className="hud-left-panel">
                <div className="hud-wireframe-row">
                  {/* Wireframe Human Mesh Avatar */}
                  <div className="hud-wireframe-human">
                    <svg viewBox="0 0 100 135" className="wireframe-svg" stroke="currentColor" fill="none">
                      <circle cx="50" cy="18" r="11" strokeWidth="1.2" strokeDasharray="3 2" />
                      <ellipse cx="50" cy="18" rx="7" ry="11" strokeWidth="0.8" opacity="0.6" />
                      <line x1="50" y1="29" x2="50" y2="76" strokeWidth="1" opacity="0.7" />
                      <line x1="36" y1="38" x2="64" y2="38" strokeWidth="1" opacity="0.7" />
                      <line x1="30" y1="76" x2="70" y2="76" strokeWidth="1" opacity="0.7" />
                      <polyline points="36,38 22,72" strokeWidth="1.2" />
                      <polyline points="64,38 78,72" strokeWidth="1.2" />
                      <polyline points="38,76 34,122" strokeWidth="1.2" />
                      <polyline points="62,76 66,122" strokeWidth="1.2" />
                      <circle cx="22" cy="72" r="2.5" fill="currentColor" />
                      <circle cx="78" cy="72" r="2.5" fill="currentColor" />
                      <circle cx="34" cy="122" r="2.5" fill="currentColor" />
                      <circle cx="66" cy="122" r="2.5" fill="currentColor" />
                      <line x1="16" y1="46" x2="34" y2="46" strokeWidth="0.8" opacity="0.5" />
                      <line x1="66" y1="46" x2="84" y2="46" strokeWidth="0.8" opacity="0.5" />
                      <line x1="18" y1="90" x2="32" y2="90" strokeWidth="0.8" opacity="0.5" />
                      <line x1="68" y1="90" x2="82" y2="90" strokeWidth="0.8" opacity="0.5" />
                    </svg>
                  </div>

                  {/* Wireframe 3D Cube */}
                  <div className="hud-wireframe-cube">
                    <svg viewBox="0 0 36 36" className="cube-svg" stroke="currentColor" fill="none">
                      <polygon points="18,4 32,12 18,20 4,12" strokeWidth="1.2" />
                      <polygon points="4,12 18,20 18,32 4,24" strokeWidth="1.2" opacity="0.7" />
                      <polygon points="32,12 18,20 18,32 32,24" strokeWidth="1.2" opacity="0.85" />
                    </svg>
                  </div>
                </div>

                {/* Cyber Stepped Line Divider */}
                <div className="hud-stepped-line">
                  <div className="stepped-bar-accent"></div>
                </div>

                {/* Tech Specs List (Đồng bộ chuẩn 1 màu) */}
                <div className="hud-specs-block">
                  <div className="spec-item"><span className="spec-k">AXIS YAW:</span> <span className="spec-v">{modelAngle ? Math.round(modelAngle) + '°' : '-25°'}</span></div>
                  <div className="spec-item"><span className="spec-k">POLYGON:</span> <span className="spec-v">1.2M</span></div>
                  <div className="spec-item"><span className="spec-k">RENDER:</span> <span className="spec-v">0.04ms</span></div>
                  <div className="spec-item"><span className="spec-k">CPU TEMP:</span> <span className="spec-v">45°C</span></div>
                  <div className="spec-item"><span className="spec-k">POWER:</span> <span className="spec-v">120W</span></div>
                  <div className="spec-item"><span className="spec-k">SYNC:</span> <span className="spec-v">ACTIVE</span></div>
                </div>

                {/* Dual Waveform Graph (Oscilloscope) */}
                <div className="hud-waveform-panel">
                  <svg viewBox="0 0 120 45" className="waveform-svg" stroke="currentColor" fill="none">
                    <polyline
                      points="0,35 15,35 24,16 34,40 44,22 56,36 70,10 84,38 96,28 108,35 120,35"
                      strokeWidth="1.5"
                    />
                    <polyline
                      points="0,28 18,28 28,38 38,14 50,32 62,20 74,35 86,12 98,30 110,28 120,28"
                      strokeWidth="1.2"
                      opacity="0.5"
                      strokeDasharray="3 2"
                    />
                  </svg>
                </div>
              </div>

              {/* HUD BÊN PHẢI: ASSET LOAD, Matrix Hex Dump, Level Indicators */}
              <div className="hud-right-panel">
                <div className="hud-panel-title">ASSET LOAD</div>
                <div className="hud-hex-code-stream">
                  <div>HEX 63X: G05 8F</div>
                  <div>HEX 8CB: 0660AC</div>
                  <div>HEX 0GB: 08459A</div>
                  <div>HEX 408: 0818FC</div>
                  <div>HEX 689: 006420</div>
                  <div>HEX 64X: 00613A</div>
                  <div>HEX 02X: 064951</div>
                  <div>HEX 484: 084600</div>
                  <div>HEX 48A: 06140F</div>
                  <div>HEX 68X: 001700</div>
                  <div>HEX 88X: 68763E</div>
                  <div>HEX D18: 062804</div>
                  <div>HEX B88: 675490</div>
                  <div>HEX P84: 624806</div>
                </div>

                <div className="hud-panel-title" style={{ marginTop: '8px' }}>ASSET LOAD</div>
                <div className="hud-progress-track"><div className="hud-progress-fill" style={{ width: '84%' }}></div></div>
                <div className="hud-progress-track" style={{ marginTop: '4px' }}><div className="hud-progress-fill" style={{ width: '55%' }}></div></div>

                <div className="hud-thermal-meter">
                  <span className="thermal-deg">25°C</span>
                  <div className="thermal-bars-group">
                    <div className="t-bar t-bar-1"></div>
                    <div className="t-bar t-bar-2"></div>
                    <div className="t-bar t-bar-3"></div>
                  </div>
                </div>
              </div>

              {/* Nhân vật 3D Đứng Ở Giữa Trong Suốt (Avatar 3D Không Nền) */}
              <div 
                className="character-model-wrapper"
                style={{
                  transform: (modelAngle || modelTiltX)
                    ? `perspective(600px) rotateY(${modelAngle}deg) rotateX(${modelTiltX}deg)`
                    : 'none'
                }}
              >
                <img 
                  src="/teo_hd_clean.gif?v=20261030_soft_glow" 
                  alt="Võ Duy Toàn 3D Avatar" 
                  className="character-model-img"
                  onError={(e) => { e.target.src = '/teo3d.gif'; }} 
                />
              </div>

              {/* Capsule Tag Bo Tròn Ở Góc Dưới Trái */}
              <div className="hud-capsule-tag">
                <span className="hud-tag-icon">&gt;_</span>
                <span className="hud-tag-text">Võ Duy Toàn</span>
              </div>
            </div>

            {/* Thanh điều khiển góc nhìn */}
            <div className="character-controls-bar">
              <button 
                className="box character-ctrl-btn"
                style={{ '--w': 'auto', '--h': '32px', '--r': '9999px' }}
                onClick={() => setIsAutoSpin(prev => !prev)}
                title={isAutoSpin ? 'Tạm dừng tự xoay' : 'Bật tự xoay'}
              >
                <div className="circle-overlay"></div>
                <i className={`fas ${isAutoSpin ? 'fa-pause' : 'fa-play'}`}></i>
                <span>{isAutoSpin ? 'Dừng' : 'Tự xoay'}</span>
              </button>

              <button 
                className="box character-ctrl-btn"
                style={{ '--w': 'auto', '--h': '32px', '--r': '9999px' }}
                onClick={() => { setModelAngle(0); setModelTiltX(0); setIsAutoSpin(false); }}
                title="Khôi phục góc nhìn chính diện"
              >
                <div className="circle-overlay"></div>
                <i className="fas fa-rotate-left"></i>
                <span>Chính diện</span>
              </button>

              <span className="character-angle-hint">
                <i className="fas fa-arrows-left-right"></i> {Math.round(modelAngle)}°
              </span>
            </div>
          </div>

          <div className="box uptime-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '15%' }}>
            <div className="circle-overlay"></div>
            <div className="uptime-title">THỜI GIAN VẬN HÀNH</div>
            <div className="uptime-value">365 <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>Ngày</span></div>
          </div>
        </div>
      </div>

      <style>{`
        /* ========================================================= */
        /* HỆ THỐNG KÍNH THỰC THỂ (GLASS SURFACE PRIMITIVE)          */
        /* ========================================================= */
        .box {
          --w: 100%;
          --h: auto;
          --r: 28px;
          --tr: 25%;
          z-index: 10;
          position: relative;
          width: var(--w);
          height: var(--h);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: var(--r);
          border: 1px double rgba(255, 255, 255, 0.16);

          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.5),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.5),
              inset 6px -6px 2px -6px rgba(255, 255, 255, 0.3),
              inset -6px 6px 2px -6px rgba(255, 255, 255, 0.3),
              inset 0 0 3px rgba(0, 0, 0, 0.95),
              0 12px 35px rgba(0, 0, 0, 0.7);

          background: rgba(10, 16, 30, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
        }

        .box svg {
          filter: drop-shadow(0 20px 3px rgba(0, 0, 0, 0.3));
        }

        .box:before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 35%;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          border-radius: var(--r);
          border: 1px solid rgba(255, 255, 255, 0.18);
          filter: blur(8px);
          pointer-events: none;
        }

        .box:after {
          z-index: 1;
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: var(--r);
          filter: blur(2px);
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.22) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.15) 100%
          );
          pointer-events: none;
        }

        .box .circle-overlay {
          position: absolute;
          z-index: 1;
          inset: 4px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--r);
          filter: blur(1px);
          pointer-events: none;
        }

        .pill-btn:hover,
        .code-card-glass:hover,
        .icon-btn:hover,
        .page-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          cursor: pointer;
        }

        /* BỐ CỤC 2 CỘT RỘNG RÃI */
        .layout-2col {
          display: grid;
          grid-template-columns: 2.3fr 1fr;
          gap: 1.5rem;
          width: 100%;
        }

        .col-main, .col-side {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        /* Hero Grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          width: 100%;
        }

        .profile-card {
          width: 100% !important;
          cursor: default;
          padding: 1.8rem 1.4rem;
          display: block;
        }

        .profile-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          text-align: center;
        }

        .avatar-box {
          cursor: default;
          overflow: hidden;
        }

        .avatar-img {
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
          background-color: #1e293b;
        }

        .name {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
        }

        .role {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          color: #38bdf8;
        }

        .tag-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag-badge {
          font-size: 0.68rem;
          padding: 3px 10px;
          border-radius: 9999px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }

        .social-row {
          display: flex;
          justify-content: center;
          gap: 0.9rem;
          margin-top: 0.2rem;
        }

        .icon-btn i {
          z-index: 10;
          color: #94a3b8;
          font-size: 15px;
        }

        /* BỂ NƯỚC THỦY CUNG VẬT LÝ THỰC */
        .live-aquarium-box {
          width: 100% !important;
          min-height: 250px;
          position: relative;
          overflow: hidden;
          cursor: crosshair;
          background: #021226 !important;
        }

        .water-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
        }

        .glass-reflection-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.14) 0%,
            transparent 35%,
            transparent 70%,
            rgba(255, 255, 255, 0.05) 100%
          );
          pointer-events: none;
          z-index: 8;
        }

        

        

        /* Controls & Clock */
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .pills-group {
          display: flex;
          gap: 0.6rem;
        }

        .pill-btn {
          padding: 0 1.2rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #cbd5e1;
          gap: 0.45rem;
        }
        .pill-btn span, .pill-btn i { z-index: 10; }
        .pill-btn.active {
          color: #fff;
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .clock-box {
          cursor: default;
        }

        .clock-text {
          z-index: 10;
          font-family: 'DSEG7_Classic', monospace, sans-serif;
          font-size: 1.25rem;
          font-style: italic;
          font-weight: 700;
          color: #fff;
          letter-spacing: 2px;
        }

        /* Khối Mã Nguồn */
        .source-section {
          width: 100% !important;
          padding: 2rem !important;
          display: flex;
          flex-direction: column;
          gap: 1.5rem !important;
          cursor: default;
        }

        .source-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
          width: 100%;
        }

        .source-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          letter-spacing: 0.5px;
        }

        .source-title:before {
          content: '';
          width: 4px;
          height: 22px;
          background: #38bdf8;
          border-radius: 2px;
        }

        .search-mini-box {
          width: 250px !important;
          height: 38px !important;
          padding: 0 1rem;
          display: flex;
          align-items: center;
        }

        .search-mini-box input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.85rem;
          width: 100%;
          color: #fff;
          z-index: 10;
        }

        /* Lưới 3x3 Cards */
        .grid-3x3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
          z-index: 10;
          width: 100%;
        }

        .code-card-glass {
          width: 100% !important;
          padding: 0.85rem !important;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-radius: 20px !important;
        }

        .card-thumb {
          width: 100%;
          height: 140px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          background: #0f172a;
        }

        .card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.7);
          font-size: 0.65rem;
          color: #fff;
          padding: 2px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          backdrop-filter: blur(4px);
        }

        .thumb-tech-icon {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 22px;
          height: 22px;
          background: #e34f26;
          color: #fff;
          font-weight: 900;
          font-size: 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-title-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 2px;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
          padding: 0 2px;
        }

        .card-meta i {
          cursor: pointer;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }

        .card-meta i:hover { color: #38bdf8; }

        /* Phân trang */
        .pagination-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          z-index: 10;
          margin-top: 0.8rem;
        }

        .page-btn {
          font-size: 0.8rem;
          font-weight: 800;
          color: #94a3b8;
        }

        .page-btn.active {
          background: #0284c7 !important;
          color: #fff !important;
        }

        /* Cột Phải: Khung Nhân Vật 3D Cyber HUD Chamber */
        .character-3d-glass {
          width: 100% !important;
          padding: 1.25rem !important;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          cursor: default;
          overflow: hidden;
        }

        .character-3d-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          z-index: 10;
        }

        .character-title-wrap {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.5px;
        }
        .character-title-wrap i {
          color: var(--accent-color);
          font-size: 1rem;
        }

        .character-status-badge {
          font-size: 0.68rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 3px 9px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .live-dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulseLive 1.8s infinite;
        }

        @keyframes pulseLive {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }

        /* Sân khấu Cyber Chamber */
        .character-3d-stage.cyber-chamber {
          position: relative;
          width: 100%;
          height: 470px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          cursor: grab;
          user-select: none;
          touch-action: none;
          background: radial-gradient(circle at 50% 50%, rgba(10, 25, 45, 0.6) 0%, rgba(3, 7, 18, 0.96) 100%);
          border: 1px solid rgba(56, 189, 248, 0.15);
        }

        .character-3d-stage.cyber-chamber:active {
          cursor: grabbing;
        }

        /* 4 Góc Khung HUD Brackets */
        .hud-corner-bracket {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: #38bdf8;
          border-style: solid;
          pointer-events: none;
          z-index: 15;
          opacity: 0.8;
        }
        .hud-cb-tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
        .hud-cb-tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
        .hud-cb-bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
        .hud-cb-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }

        /* Sàn Lưới Phối Cảnh Không Gian 3D */
        .cyber-grid-floor {
          position: absolute;
          bottom: 0;
          left: -15%;
          width: 130%;
          height: 220px;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.25) 1px, transparent 1px);
          background-size: 28px 28px;
          transform: perspective(300px) rotateX(68deg);
          transform-origin: bottom center;
          mask-image: radial-gradient(ellipse at 50% 85%, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 85%, black 40%, transparent 85%);
          pointer-events: none;
          z-index: 2;
        }

        /* Cột Ống Kính Hologram Phát Sáng */
        .hologram-capsule-tube {
          position: absolute;
          top: 35px;
          bottom: 40px;
          width: 220px;
          pointer-events: none;
          z-index: 4;
          display: flex;
          justify-content: center;
        }

        .capsule-tube-glow {
          position: absolute;
          inset: 0;
          border-left: 2px solid rgba(56, 189, 248, 0.55);
          border-right: 2px solid rgba(56, 189, 248, 0.55);
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.12) 0%, transparent 25%, transparent 75%, rgba(56, 189, 248, 0.12) 100%);
          box-shadow: inset 10px 0 20px -10px rgba(56, 189, 248, 0.4), inset -10px 0 20px -10px rgba(56, 189, 248, 0.4);
        }

        .capsule-scan-ring {
          position: absolute;
          width: 100%;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(56, 189, 248, 0.7);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
          animation: scanCapsuleRing 5s ease-in-out infinite;
        }

        @keyframes scanCapsuleRing {
          0%, 100% { top: 5%; opacity: 0.3; }
          50% { top: 85%; opacity: 0.85; }
        }

        /* Bục Vòng Tròn Hologram Phát Sáng */
        .pedestal-rings-concentric {
          position: absolute;
          bottom: 30px;
          width: 210px;
          height: 80px;
          transform: rotateX(66deg);
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          z-index: 3;
        }

        .pedestal-ring-out {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 2px dashed rgba(56, 189, 248, 0.6);
          animation: spinOuterRing 16s linear infinite;
        }

        .pedestal-ring-glow {
          position: absolute;
          width: 165px;
          height: 165px;
          border-radius: 50%;
          border: 2.5px solid #38bdf8;
          box-shadow: 0 0 16px #38bdf8, inset 0 0 12px #38bdf8;
        }

        .pedestal-ring-in {
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 1px solid rgba(56, 189, 248, 0.5);
          animation: spinOuterRing 10s linear infinite reverse;
        }

        @keyframes spinOuterRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* HUD PANEL TRÁI */
        .hud-left-panel {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 12;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: 105px;
        }

        .hud-wireframe-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hud-wireframe-human {
          width: 50px;
          height: 68px;
          color: #38bdf8;
          filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));
        }
        .wireframe-svg { width: 100%; height: 100%; }

        .hud-wireframe-cube {
          width: 32px;
          height: 32px;
          color: #38bdf8;
          filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));
          animation: cubeFloat 3s ease-in-out infinite alternate;
        }
        .cube-svg { width: 100%; height: 100%; }

        @keyframes cubeFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }

        .hud-stepped-line {
          width: 100%;
          height: 4px;
          border-bottom: 1.5px solid rgba(56, 189, 248, 0.4);
          position: relative;
        }
        .stepped-bar-accent {
          position: absolute;
          left: 0;
          bottom: -1.5px;
          width: 25px;
          height: 3px;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
        }

        .hud-specs-block {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-family: monospace, sans-serif;
          font-size: 0.62rem;
          line-height: 1.25;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .spec-k {
          color: rgba(56, 189, 248, 0.7);
          font-weight: 700;
        }
        .spec-v {
          color: #38bdf8;
          font-weight: 800;
          text-shadow: 0 0 6px rgba(56, 189, 248, 0.6);
        }

        .hud-waveform-panel {
          width: 100px;
          height: 36px;
          color: #38bdf8;
          margin-top: 4px;
        }
        .waveform-svg { width: 100%; height: 100%; }

        /* HUD PANEL PHẢI */
        .hud-right-panel {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 12;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 95px;
          font-family: monospace, sans-serif;
        }

        .hud-panel-title {
          font-size: 0.65rem;
          font-weight: 800;
          color: #38bdf8;
          letter-spacing: 0.8px;
          text-shadow: 0 0 6px rgba(56, 189, 248, 0.6);
        }

        .hud-hex-code-stream {
          font-size: 0.54rem;
          line-height: 1.25;
          color: rgba(56, 189, 248, 0.8);
          display: flex;
          flex-direction: column;
          gap: 1.5px;
        }

        .hud-progress-track {
          width: 100%;
          height: 4px;
          background: rgba(56, 189, 248, 0.15);
          border-radius: 2px;
          overflow: hidden;
        }
        .hud-progress-fill {
          height: 100%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        .hud-thermal-meter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 5px;
        }
        .thermal-deg {
          font-size: 0.62rem;
          font-weight: 800;
          color: #38bdf8;
        }
        .thermal-bars-group {
          display: flex;
          gap: 3px;
          align-items: flex-end;
          height: 20px;
        }
        .t-bar {
          width: 5px;
          border-radius: 1px;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
        }
        .t-bar-1 { height: 18px; }
        .t-bar-2 { height: 14px; opacity: 0.75; }
        .t-bar-3 { height: 9px; opacity: 0.45; }

        /* Nhân vật 3D ở giữa */
        .character-model-wrapper {
          position: relative;
          z-index: 10;
          height: 360px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          pointer-events: none;
          animation: floatModel 3.5s ease-in-out infinite alternate;
        }

        @keyframes floatModel {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-7px); }
        }

        .character-model-wrapper {
          position: relative;
          z-index: 10;
          height: 360px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          pointer-events: none;
          background: transparent !important;
          animation: floatModel 3.5s ease-in-out infinite alternate;
        }

        .character-model-img {
          height: 100%;
          max-height: 355px;
          object-fit: contain;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          /* Vien mo mo mem mai bao quanh nhan vat (Soft Contour Glow) */
          filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.45)) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.35));
          image-rendering: auto;
        }

        /* Theme Toi: Vien mo Cyan cong nghe huyen ao */
        [data-theme="dark"] .character-model-img {
          filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.55)) drop-shadow(0 14px 24px rgba(0, 0, 0, 0.7));
        }

        /* Theme Sang: Vien mo Cam am ap, khong co vien den */
        [data-theme="light"] .character-model-img {
          filter: drop-shadow(0 0 10px rgba(234, 88, 12, 0.4)) drop-shadow(0 12px 20px rgba(0, 0, 0, 0.18));
        }

        /* Capsule Tag Bo Tròn Ở Góc Dưới Trái */
        .hud-capsule-tag {
          position: absolute;
          bottom: 14px;
          left: 14px;
          z-index: 20;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          padding: 5px 14px;
          display: flex;
          align-items: center;
          gap: 7px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
          pointer-events: none;
        }
        .hud-tag-icon {
          color: #38bdf8;
          font-weight: 900;
          font-family: monospace;
          font-size: 0.85rem;
        }
        .hud-tag-text {
          color: #0f172a;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.3px;
        }

        /* Thanh điều khiển */
        .character-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          width: 100%;
          z-index: 10;
        }

        .character-ctrl-btn {
          padding: 0 0.85rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          gap: 0.4rem;
          cursor: pointer;
        }
        .character-ctrl-btn i, .character-ctrl-btn span { z-index: 10; }
        .character-ctrl-btn:hover {
          color: #ffffff;
          filter: brightness(1.08);
        }

        .character-angle-hint {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .uptime-glass {
          width: 100% !important;
          padding: 1.2rem !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          cursor: default;
        }

        .uptime-title {
          font-size: 0.7rem;
          letter-spacing: 1px;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          z-index: 10;
        }

        .uptime-value {
          font-size: 1.6rem;
          font-weight: 900;
          color: #fff;
          z-index: 10;
        }

        /* LIGHT MODE */
        body.light-mode .box {
          border: 1px double rgba(51, 51, 51, 0.08) !important;
          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
              inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
              inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
              inset 0 0 2px rgba(0, 0, 0, 0.8),
              0 4px 8px rgba(0, 0, 0, 0.2) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          backdrop-filter: blur(2px) !important;
          -webkit-backdrop-filter: blur(2px) !important;
        }

        body.light-mode .box:before {
          border: 1px solid rgba(0, 0, 0, 0.9) !important;
          filter: blur(8px) !important;
        }

        body.light-mode .box:after {
          filter: blur(3px) !important;
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.8) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.8) 100%
          ) !important;
        }

        body.light-mode .box .circle-overlay {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        body.light-mode .name,
        body.light-mode .source-title,
        body.light-mode .uptime-value,
        body.light-mode .card-title-text,
        body.light-mode .character-title-wrap,
        body.light-mode .clock-text,
        body.light-mode .search-mini-box input {
          color: #0f172a !important;
          filter: drop-shadow(0 20px 3px rgba(102, 102, 102, 0.15));
        }

        body.light-mode .source-title:before {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .role {
          color: #ea580c !important;
        }

        body.light-mode .uptime-title,
        body.light-mode .card-meta,
        body.light-mode .pill-btn,
        body.light-mode .page-btn {
          color: #64748b !important;
        }

        body.light-mode .card-title-text:hover {
          color: #ea580c !important;
        }

        body.light-mode .card-meta i,
        body.light-mode .character-title-wrap i,
        body.light-mode .uptime-title i {
          color: #ea580c !important;
        }

        body.light-mode .avatar-img {
          filter: grayscale(20%);
        }

        body.light-mode .tag-badge {
          background: rgba(234, 88, 12, 0.12) !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
          color: #ea580c !important;
        }

        body.light-mode .social-row .icon-btn i {
          color: #475569 !important;
        }
        body.light-mode .social-row .icon-btn:hover i {
          color: #ea580c !important;
        }

        body.light-mode .pill-btn:hover {
          color: #0f172a !important;
        }

        body.light-mode .pill-btn.active {
          color: #ea580c !important;
          border-color: rgba(234, 88, 12, 0.5) !important;
          background: rgba(234, 88, 12, 0.12) !important;
        }

        body.light-mode .pill-btn.active span,
        body.light-mode .pill-btn.active i {
          color: #ea580c !important;
        }

        body.light-mode .page-btn:hover {
          color: #0f172a !important;
        }

        body.light-mode .page-btn.active {
          background: #ea580c !important;
          border-color: #ea580c !important;
          color: #ffffff !important;
          box-shadow: 0 0 12px rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .search-mini-box input::placeholder {
          color: #94a3b8 !important;
        }


        /* LIGHT MODE CHO CYBER CHAMBER: ĐỒNG BỘ 100% SẮC CAM RỰC RỠ */
        body.light-mode .character-3d-stage.cyber-chamber {
          background: radial-gradient(circle at 50% 50%, rgba(254, 242, 242, 0.6) 0%, rgba(241, 245, 249, 0.96) 100%) !important;
          border-color: rgba(234, 88, 12, 0.25) !important;
        }

        body.light-mode .hud-corner-bracket {
          border-color: #ea580c !important;
        }

        body.light-mode .cyber-grid-floor {
          background-image: 
            linear-gradient(rgba(234, 88, 12, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234, 88, 12, 0.25) 1px, transparent 1px) !important;
        }

        body.light-mode .capsule-tube-glow {
          border-left: 2px solid rgba(234, 88, 12, 0.6) !important;
          border-right: 2px solid rgba(234, 88, 12, 0.6) !important;
          background: linear-gradient(90deg, rgba(234, 88, 12, 0.12) 0%, transparent 25%, transparent 75%, rgba(234, 88, 12, 0.12) 100%) !important;
          box-shadow: inset 10px 0 20px -10px rgba(234, 88, 12, 0.35), inset -10px 0 20px -10px rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .capsule-scan-ring {
          border-color: rgba(234, 88, 12, 0.7) !important;
          box-shadow: 0 0 12px rgba(234, 88, 12, 0.6) !important;
        }

        body.light-mode .pedestal-ring-out {
          border-color: rgba(234, 88, 12, 0.6) !important;
        }

        body.light-mode .pedestal-ring-glow {
          border-color: #ea580c !important;
          box-shadow: 0 0 16px #ea580c, inset 0 0 12px #ea580c !important;
        }

        body.light-mode .pedestal-ring-in {
          border-color: rgba(234, 88, 12, 0.5) !important;
        }

        body.light-mode .hud-wireframe-human,
        body.light-mode .hud-wireframe-cube {
          color: #ea580c !important;
          filter: drop-shadow(0 0 4px rgba(234, 88, 12, 0.6)) !important;
        }

        body.light-mode .hud-stepped-line {
          border-bottom-color: rgba(234, 88, 12, 0.4) !important;
        }
        body.light-mode .stepped-bar-accent {
          background: #ea580c !important;
          box-shadow: 0 0 6px #ea580c !important;
        }

        body.light-mode .spec-k {
          color: rgba(234, 88, 12, 0.8) !important;
        }
        body.light-mode .spec-v {
          color: #ea580c !important;
          text-shadow: 0 0 6px rgba(234, 88, 12, 0.5) !important;
        }

        body.light-mode .hud-waveform-panel {
          color: #ea580c !important;
        }

        body.light-mode .hud-panel-title {
          color: #ea580c !important;
          text-shadow: 0 0 6px rgba(234, 88, 12, 0.5) !important;
        }

        body.light-mode .hud-hex-code-stream {
          color: rgba(234, 88, 12, 0.85) !important;
        }

        body.light-mode .hud-progress-track {
          background: rgba(234, 88, 12, 0.15) !important;
        }
        body.light-mode .hud-progress-fill {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .thermal-deg {
          color: #ea580c !important;
        }
        body.light-mode .t-bar {
          background: #ea580c !important;
          box-shadow: 0 0 6px #ea580c !important;
        }

        body.light-mode .hud-capsule-tag {
          background: #ffffff !important;
          border-color: rgba(0, 0, 0, 0.15) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode .hud-tag-icon {
          color: #ea580c !important;
        }
        body.light-mode .hud-tag-text {
          color: #0f172a !important;
        }

        body.light-mode .character-status-badge {
          color: #ea580c !important;
          background: rgba(234, 88, 12, 0.12) !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .live-dot-pulse {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .character-ctrl-btn {
          color: #64748b !important;
        }
        body.light-mode .character-ctrl-btn:hover {
          color: #0f172a !important;
        }

        /* Responsive Tablet */
        @media (max-width: 1150px) {
          .layout-2col { grid-template-columns: 1fr; }
          .hero-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .grid-3x3 { grid-template-columns: 1fr; }
        }

        /* Responsive Mobile */
        @media (max-width: 640px) {
          .box {
            --r: 18px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .live-aquarium-box {
            min-height: 200px;
            max-height: 240px;
          }

          .profile-card {
            padding: 1.25rem 1rem !important;
          }

          .name {
            font-size: 1.15rem;
          }

          .controls-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .pills-group {
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .pills-group::-webkit-scrollbar {
            display: none;
          }

          .pill-btn {
            flex-shrink: 0;
            height: 36px !important;
            padding: 0 0.9rem;
          }

          .clock-box {
            width: 100% !important;
            height: 40px !important;
          }

          .clock-text {
            font-size: 1.05rem;
          }

          .source-section {
            padding: 1.1rem !important;
            gap: 1rem !important;
          }

          .source-header {
            flex-direction: column;
            align-items: stretch;
            gap: 0.8rem;
          }

          .source-title {
            font-size: 1.1rem;
          }

          .search-mini-box {
            width: 100% !important;
          }

          .grid-3x3 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .card-thumb {
            height: 160px;
          }

          .character-3d-glass {
            padding: 1rem !important;
          }

          .character-3d-stage.cyber-chamber {
            height: 380px;
          }

          .uptime-value {
            font-size: 1.35rem;
          }
        }

        @media (max-width: 380px) {
          .box {
            --r: 14px;
          }

          .pagination-row {
            gap: 0.3rem;
            flex-wrap: wrap;
          }
          .page-btn {
            width: 30px !important;
            height: 30px !important;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}