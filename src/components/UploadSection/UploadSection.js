import './UploadSection.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { FaTshirt } from 'react-icons/fa';
import { PiPants, PiUploadSimpleBold } from 'react-icons/pi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const UploadSection = ({ setTopImage, setBottomImage, topImage, bottomImage }) => {
  const topInputRef = useRef(null);
  const bottomInputRef = useRef(null);

  const handleUpload = async (event, notifyParent) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notifyParent(response.data.url);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <>
      {/* 상의 */}
      <div className="upload-row">
        <div
          className="upload-box"
          onClick={() => topInputRef.current.click()}
          style={{
            backgroundImage: topImage ? `url(${topImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!topImage && (
            <>
              <div className="upload-icon"><FaTshirt size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">상의 사진을 선택하세요</p>
            </>
          )}
        </div>
        <div className="upload-slider-wrapper">
          <RecentPreviewSlider title="최근 사진" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={topInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e, setTopImage)}
        />
      </div>

      {/* 하의 */}
      <div className="upload-row">
        <div
          className="upload-box"
          onClick={() => bottomInputRef.current.click()}
          style={{
            backgroundImage: bottomImage ? `url(${bottomImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!bottomImage && (
            <>
              <div className="upload-icon"><PiPants size={24} /></div>
              <p className="upload-label flex items-center gap-1 mb-2">
                <PiUploadSimpleBold size={16} className="text-rose-500" /> 사진 선택
              </p>
              <p className="upload-subtext mt-1">하의 사진을 선택하세요</p>
            </>
          )}
        </div>
        <div className="upload-slider-wrapper">
          <RecentPreviewSlider title="최근 의류" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={bottomInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e, setBottomImage)}
        />
      </div>
    </>
  );
};


export default UploadSection;
