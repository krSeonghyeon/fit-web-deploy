// src/components/CommonSection/CommonUploadSection.js
import './CommonSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from 'react-icons/io5';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const CommonUploadSection = ({ onUpload, imageUrl, onRequestModelModal }) => {
  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/4d97c180-d716-413d-a213-59906df1a650.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/03e4751b-4979-4fe8-a760-a8a1f0261100.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/ebe6246b-0f24-41d9-ad50-814cfef2b8ef.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/7c8af62e-c6e0-4afb-b4fc-108f73636b0d.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/dd97291d-bf2a-42b1-ac98-0c26c52e7cc1.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/005003ac-c6a7-45d5-b065-f29568a5e8b4.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/a627d8aa-f375-4ac3-8d7c-0f8aa2ca5039.jpg',
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
