import './LayeredSection.css';
import { FaTshirt } from 'react-icons/fa';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { TbJacket } from 'react-icons/tb';
import { TiArrowUnsorted } from 'react-icons/ti';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const LayeredSection = ({
  outerImage,
  setOuterImage,
  innerImage,
  setInnerImage,
}) => {
  const handleSwap = () => {
    const temp = outerImage;
    setOuterImage(innerImage);
    setInnerImage(temp);
  };

  const outerRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/ce24422f-2e83-4393-bd5f-efd2300f883f.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/8d111fcb-40c7-4a70-8768-de4451479087.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/f5d90dda-4197-4174-9724-5a0b61ab2a6f.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/eb00e87b-f3e7-4241-8538-def419f2afc9.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/9dcb3ba2-965b-4e3c-92a4-b7c665303f46.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/3e041900-d467-4ca4-82b9-7ad957000a44.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/16c682f3-556e-4056-ada3-3a3b47b4821c.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/c8f37af8-52f8-47d6-ac50-c213998c3046.jpg',
  ];

  const innerRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/427ca040-f318-4a9b-9258-7a7820b32f3f.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-06/c0b14a83-795b-4e0a-93b5-f0cc14a18075.png',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/372cd746-78b6-4b01-bf46-01dbcdbe2d4c.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/cda7c3cf-7e70-4975-b4cd-9bdabbc92c39.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/90e4f467-7b99-4a84-a622-17de85f64bb7.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/e42a3e3d-c93a-4ce4-97e6-051444865b35.jpg',
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-23/51a04201-dbe2-494d-9da0-5cabb28a1866.jpg',
  ];

  return (
    <div className="upload-row">
      <div className="upload-left-col">
        {/* 아우터 */}
        <div
          className="upload-box"
          onClick={() => setOuterImage('modal')}
          style={{
            backgroundImage:
              outerImage && outerImage !== 'modal' ? `url(${outerImage})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {!outerImage || outerImage === 'modal' ? (
            <>
              <div className="upload-icon"><TbJacket size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">아우터 사진을<br /> 선택하세요</p>
            </>
          ) : null}
        </div>

        {/* ⬇️ 순서 교체 버튼 */}
        <div className="upload-box-swap-button" onClick={handleSwap}>
          <TiArrowUnsorted size={20} />
        </div>

        {/* 이너 */}
        <div
          className="upload-box"
          onClick={() => setInnerImage('modal')}
          style={{
            backgroundImage:
              innerImage && innerImage !== 'modal' ? `url(${innerImage})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {!innerImage || innerImage === 'modal' ? (
            <>
              <div className="upload-icon"><FaTshirt size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">이너 사진을<br /> 선택하세요</p>
            </>
          ) : null}
        </div>
      </div>

      {/* 오른쪽: 각각 추천 이미지 연결 */}
      <div className="upload-slider-wrapper">
        <RecentPreviewSlider
          title="추천 아우터"
          images={outerRecommended}
          onSelect={setOuterImage}
        />
        <RecentPreviewSlider
          title="추천 이너"
          images={innerRecommended}
          onSelect={setInnerImage}
        />
      </div>
    </div>
  );
};

export default LayeredSection;
