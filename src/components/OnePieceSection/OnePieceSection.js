import './OnePieceSection.css';
import { GiDress } from 'react-icons/gi';
import { PiUploadSimpleBold } from 'react-icons/pi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const OnePieceSection = ({ onePieceImage, setOnePieceImage }) => {
  const recommendedImages = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/21452436-7aa7-4037-9ae5-ccc85c31ab78.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/c1796503-64a2-45d0-9c9a-83482d5b6f82.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/dc13071d-86e7-4c02-8b61-5094594e3cdf.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/9978425d-e083-4164-8d2e-9c876c69ca99.png'
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
