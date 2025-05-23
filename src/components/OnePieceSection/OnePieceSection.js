import './OnePieceSection.css';
import { GiDress } from 'react-icons/gi';
import { PiUploadSimpleBold } from 'react-icons/pi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const OnePieceSection = ({ onePieceImage, setOnePieceImage }) => {
  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/21452436-7aa7-4037-9ae5-ccc85c31ab78.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/dc13071d-86e7-4c02-8b61-5094594e3cdf.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/4d5ae1eb-8289-4275-9f57-558e554f7d5c.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/2c363f80-a506-41e1-acf9-f05432e2b87f.jpg'
  ];

  const handleRecommendedSelect = (url) => {
    setOnePieceImage(url);
  };

  return (
    <div className="onepiece-container">
      <div
        className="onepiece-upload-box"
        onClick={() => setOnePieceImage('modal')} // ✅ 모달 트리거
        style={{
          backgroundImage: onePieceImage && onePieceImage !== 'modal' ? `url(${onePieceImage})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {!onePieceImage || onePieceImage === 'modal' ? (
          <>
            <div className="onepiece-upload-icon">
              <GiDress size={40} />
            </div>
            <p className="onepiece-upload-label">
              <PiUploadSimpleBold size={18} className="text-rose-500 mb-2" />
              원피스 사진 선택
            </p>
            <p className="onepiece-upload-subtext">원피스 사진을<br /> 선택하세요</p>
          </>
        ) : null}
      </div>

      <div className="onepiece-slider-wrapper">
        <RecentPreviewSlider
          title="추천 원피스"
          images={recommendedImages}
          onSelect={handleRecommendedSelect}
        />
      </div>
    </div>
  );
};

export default OnePieceSection;
