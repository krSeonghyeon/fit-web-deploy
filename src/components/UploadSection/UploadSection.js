import './UploadSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { FaTshirt } from 'react-icons/fa';
import { PiPants } from 'react-icons/pi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const UploadSection = ({ topImage, setTopImage, bottomImage, setBottomImage }) => {
  const topRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/33345137-efc3-42a1-b5cb-7d16918b4673.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/60b5b477-fb92-4716-8d9b-2933d2a8e0bb.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/86785a16-ca46-4204-a96d-76b229f50495.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/3f746121-3f4e-47e1-9494-3025a955aeb7.png'
  ];

  const bottomRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/9f45694a-05c8-466c-b9f7-1e6ef80bd8d0.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/a5724a9f-5e9a-481d-8967-9406dcc36787.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/c045e102-5c84-40c7-925e-1d66f8978b3c.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/9f4785a2-d6b9-4be1-9837-b19473a447d8.webp'
  ];

  return (
    <>
      {/* 상의 */}
      <div className="upload-row">
        <div
          className="upload-box"
          onClick={() => setTopImage('modal')} // ✅ 모달 트리거
          style={{
            backgroundImage: topImage && topImage !== 'modal' ? `url(${topImage})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {!topImage || topImage === 'modal' ? (
            <>
              <div className="upload-icon"><FaTshirt size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">상의 사진을 <br />선택하세요</p>
            </>
          ) : null}
        </div>
        <div className="upload-slider-wrapper">
          <RecentPreviewSlider
            title="추천 상의"
            images={topRecommended}
            onSelect={setTopImage}
          />
        </div>
      </div>

      {/* 하의 */}
      <div className="upload-row">
        <div
          className="upload-box"
          onClick={() => setBottomImage('modal')} // ✅ 모달 트리거
          style={{
            backgroundImage: bottomImage && bottomImage !== 'modal' ? `url(${bottomImage})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {!bottomImage || bottomImage === 'modal' ? (
            <>
              <div className="upload-icon"><PiPants size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">하의 사진을<br /> 선택하세요</p>
            </>
          ) : null}
        </div>
        <div className="upload-slider-wrapper">
          <RecentPreviewSlider
            title="추천 하의"
            images={bottomRecommended}
            onSelect={setBottomImage}
          />
        </div>
      </div>
    </>
  );
};

export default UploadSection;
