import React, { useRef, useState } from 'react';
import './LongOuterSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { GiLabCoat } from 'react-icons/gi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';
import axios from 'axios';

const LongOuterSection = ({ setLongOuterImage }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = response.data.url;
      setImageUrl(uploadedUrl);
      if (setLongOuterImage) setLongOuterImage(uploadedUrl);
    } catch (err) {
      console.error('업로드 실패:', err);
    }
  };

  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/21452436-7aa7-4037-9ae5-ccc85c31ab78.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/c1796503-64a2-45d0-9c9a-83482d5b6f82.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/dc13071d-86e7-4c02-8b61-5094594e3cdf.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/9978425d-e083-4164-8d2e-9c876c69ca99.png'
  ];

  const handleRecommendedSelect = (url) => {
    setImageUrl(url);
    if (setLongOuterImage) setLongOuterImage(url);
  };

  return (
    <div className="longouter-container">
      <div
        className="longouter-upload-box"
        onClick={() => fileInputRef.current.click()}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
          <>
            <div className="longouter-upload-icon">
              <GiLabCoat size={40} />
            </div>
            <p className="longouter-upload-label">
              <PiUploadSimpleBold size={18} className="text-rose-500 mb-2" />
              롱아우터 사진 선택
            </p>
            <p className="longouter-upload-subtext">롱아우터 사진을<br /> 선택하세요</p>
          </>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="longouter-slider-wrapper">
        <RecentPreviewSlider
          title="추천 롱아우터"
          images={recommendedImages}
          onSelect={handleRecommendedSelect}
        />
      </div>
    </div>
  );
};

export default LongOuterSection;
