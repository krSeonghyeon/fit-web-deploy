import './CommonSection.css';
import { useRef } from 'react';
import axios from 'axios';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from 'react-icons/io5';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const CommonUploadSection = ({ onUpload, imageUrl }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = response.data.url;
      if (onUpload) onUpload(uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/5f2d00db-7660-47ba-a765-0cc1c4817a69.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/4d97c180-d716-413d-a213-59906df1a650.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/2f6810e0-6307-49bf-a7b5-a47e828bf9d8.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/288b558d-374a-4208-8f8d-7f3428880c41.webp',
  ];

  const handleRecommendedSelect = (url) => {
    if (onUpload) onUpload(url);
  };

  return (
    <div className="common-upload-container">
      <div
        className="common-upload-box relative"
        onClick={() => fileInputRef.current.click()}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
          <>
            <div className="common-upload-icon">
              <IoBody size={40} />
            </div>
            <p className="common-upload-label">
              <PiUploadSimpleBold size={18} className="text-rose-500" /> 내 사진 선택
            </p>
            <p className="common-upload-subtext">전신 사진을<br /> 선택하세요</p>
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
      <div className="common-slider-wrapper">
        <RecentPreviewSlider
          title="추천 모델"
          images={recommendedImages}
          onSelect={handleRecommendedSelect}
        />
      </div>
    </div>
  );
};

export default CommonUploadSection;
