// src/components/CommonSection/CommonUploadSection.js
import './CommonSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from 'react-icons/io5';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const CommonUploadSection = ({ onUpload, imageUrl, onRequestModelModal }) => {
  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/4d97c180-d716-413d-a213-59906df1a650.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/03e4751b-4979-4fe8-a760-a8a1f0261100.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/e4071372-7513-4c3f-b6be-92002e559cbb.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/d86a6ee0-49c0-4995-8334-816cd1f1b8d4.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-25/6e9f725b-656e-4761-9c60-b47ed5a8e7df.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-24/af6af41f-a831-4fdc-8008-e41b67c6a8e5.jpg',
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
