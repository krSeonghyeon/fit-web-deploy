// src/components/CommonSection/CommonUploadSection.js
import './CommonSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from 'react-icons/io5';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const CommonUploadSection = ({ onUpload, imageUrl, onRequestModelModal }) => {
  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/4d97c180-d716-413d-a213-59906df1a650.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/50efb808-54c6-445d-bac0-43d5daa0d672.jpg',
  ];

  const handleRecommendedSelect = (url) => {
    if (onUpload) onUpload(url);
  };

  return (
    <div className="common-upload-container">
      <div
        className="common-upload-box relative"
        onClick={() => onRequestModelModal?.()} // ✅ 모달만 띄움
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
