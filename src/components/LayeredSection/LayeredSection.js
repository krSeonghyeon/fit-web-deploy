import './LayeredSection.css';
import { useRef } from 'react';
import { FaTshirt } from 'react-icons/fa';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { TbJacket } from 'react-icons/tb';
import { TiArrowUnsorted } from 'react-icons/ti';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';
import axios from 'axios';

const LayeredSection = ({ outerImage, setOuterImage, innerImage, setInnerImage }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const handleUpload = async (event, setImage) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage(res.data.url);
    } catch (err) {
      console.error('업로드 실패:', err);
    }
  };

  const handleSwap = () => {
    const temp = outerImage;
    setOuterImage(innerImage);
    setInnerImage(temp);
  };

  const outerRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/ce24422f-2e83-4393-bd5f-efd2300f883f.png',
  ];

  const innerRecommended = [
    'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/427ca040-f318-4a9b-9258-7a7820b32f3f.png'
  ];

  return (
    <div className="upload-row">
      <div className="upload-left-col">
        {/* 아우터 */}
        <div
          className="upload-box"
          onClick={() => outerRef.current.click()}
          style={{
            backgroundImage: outerImage ? `url(${outerImage})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {!outerImage && (
            <>
              <div className="upload-icon"><TbJacket size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">아우터 사진을<br /> 선택하세요</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={outerRef}
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e, setOuterImage)}
        />

        {/* ⬇️ 순서 교체 버튼 */}
        <div className="upload-box-swap-button" onClick={handleSwap}>
          <TiArrowUnsorted size={20} />
        </div>

        {/* 이너 */}
        <div
          className="upload-box"
          onClick={() => innerRef.current.click()}
          style={{
            backgroundImage: innerImage ? `url(${innerImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!innerImage && (
            <>
              <div className="upload-icon"><FaTshirt size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">이너 사진을<br /> 선택하세요</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={innerRef}
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e, setInnerImage)}
        />
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
