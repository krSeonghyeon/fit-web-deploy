import './LongOuterSection.css';
import { GiLabCoat } from 'react-icons/gi';
import { FaTshirt } from 'react-icons/fa';
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
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/f4b14637-5249-44f6-ad00-37def209f500.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/05475906-bb7f-4a70-a4e4-646a2a3ebd4e.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/f1ac5d8d-535f-444c-9523-7d6c0ef2f999.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/d55af87e-3fee-47a2-bf79-a133eace59f6.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/8a04cfa2-1ff1-44ce-9724-1cb8ce193512.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/93ad2708-5d28-45fb-8542-7f269cf115e8.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/3eddbd6e-08a3-4a89-bd57-5f039d2418e7.jpg',
  ];

  const innerwearRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/427ca040-f318-4a9b-9258-7a7820b32f3f.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-06/c0b14a83-795b-4e0a-93b5-f0cc14a18075.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/372cd746-78b6-4b01-bf46-01dbcdbe2d4c.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/cda7c3cf-7e70-4975-b4cd-9bdabbc92c39.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/90e4f467-7b99-4a84-a622-17de85f64bb7.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/e42a3e3d-c93a-4ce4-97e6-051444865b35.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/51a04201-dbe2-494d-9da0-5cabb28a1866.jpg',
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
                <FaTshirt size={24} />
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
