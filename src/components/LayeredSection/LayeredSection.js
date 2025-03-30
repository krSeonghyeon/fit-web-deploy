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
      const res = await axios.post('http://localhost:8000/upload', formData, {
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

  return (
    <div className="upload-row">
      <div className="upload-left-col">
        {/* 아우터 */}
        <div
          className="upload-box"
          onClick={() => outerRef.current.click()}
          style={{
            backgroundImage: outerImage ? `url(${outerImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!outerImage && (
            <>
              <div className="upload-icon"><TbJacket size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">아우터 사진을 선택하세요</p>
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
              <p className="upload-subtext mt-1">이너 사진을 선택하세요</p>
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

      {/* 오른쪽 */}
      <div className="upload-slider-wrapper">
        <RecentPreviewSlider title="추천 사진" />
        <RecentPreviewSlider title="추천 의류" />
      </div>
    </div>
  );
};

export default LayeredSection;
