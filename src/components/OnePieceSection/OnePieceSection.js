import React, { useRef, useState, useEffect } from 'react';
import './OnePieceSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { GiDress } from 'react-icons/gi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';
import axios from 'axios';

const OnePieceSection = ({ setOnePieceImage }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = response.data.url;
      setImageUrl(uploadedUrl);
      if (setOnePieceImage) setOnePieceImage(uploadedUrl);
    } catch (err) {
      console.error('업로드 실패:', err);
    }
  };

  return (
    <div className="onepiece-container">
      <div
        className="onepiece-upload-box"
        onClick={() => fileInputRef.current.click()}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
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
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="onepiece-slider-wrapper">
        <RecentPreviewSlider title="추천 의상" />
      </div>
    </div>
  );
};

export default OnePieceSection;
