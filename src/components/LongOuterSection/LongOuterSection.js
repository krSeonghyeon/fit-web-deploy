import './LongOuterSection.css';
import { GiLabCoat, GiUnderwearShorts } from 'react-icons/gi';
import { PiUploadSimpleBold } from 'react-icons/pi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const LongOuterUploadSection = ({
  setLongOuterImage,
  setInnerwearImage,
  longOuterImage,
  innerwearImage
}) => {
  const longOuterRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-06/3668fd28-9b01-4de5-9415-933966f6bc00.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-06/8ca847b6-4e9b-42d7-a79a-a91cbc996b0a.png',
  ];

  const innerwearRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/427ca040-f318-4a9b-9258-7a7820b32f3f.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-06/c0b14a83-795b-4e0a-93b5-f0cc14a18075.png',
  ];

  return (
    <>
      {/* 롱아우터 */}
      <div className="upload-row">
        <div
          className="upload-box"
          onClick={() => setLongOuterImage('modal')}
          style={{
            backgroundImage:
              longOuterImage && longOuterImage !== 'modal'
                ? `url(${longOuterImage})`
                : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {!longOuterImage || longOuterImage === 'modal' ? (
            <>
              <div className="upload-icon">
                <GiLabCoat size={24} />
              </div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">롱아우터 사진을<br /> 선택하세요</p>
            </>
          ) : null}
        </div>
        <div className="upload-slider-wrapper">
          <RecentPreviewSlider
            title="추천 롱아우터"
            images={longOuterRecommended}
            onSelect={setLongOuterImage}
          />
        </div>
      </div>

      {/* 내의 */}
      <div className="upload-row">
        <div
          className="upload-box"
          onClick={() => setInnerwearImage('modal')}
          style={{
            backgroundImage:
              innerwearImage && innerwearImage !== 'modal'
                ? `url(${innerwearImage})`
                : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {!innerwearImage || innerwearImage === 'modal' ? (
            <>
              <div className="upload-icon">
                <GiUnderwearShorts size={24} />
              </div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">이너 사진을<br /> 선택하세요</p>
            </>
          ) : null}
        </div>
        <div className="upload-slider-wrapper">
          <RecentPreviewSlider
            title="추천 이너"
            images={innerwearRecommended}
            onSelect={setInnerwearImage}
          />
        </div>
      </div>
    </>
  );
};

export default LongOuterUploadSection;
