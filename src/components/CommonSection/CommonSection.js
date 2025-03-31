import './CommonSection.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from 'react-icons/io5';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const CommonUploadSection = ({ onUpload, imageUrl }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = response.data.url;
      if (onUpload) onUpload(uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <div className="common-upload-container">
      <div
        className="common-upload-box relative"
        onClick={() => fileInputRef.current.click()}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
          <>
            <div className="common-upload-icon">
              <IoBody size={40} />
            </div>
            <p className="common-upload-label">
              <PiUploadSimpleBold size={18} className="text-rose-500" /> 내 사진 선택
            </p>
            <p className="common-upload-subtext">전신 사진을<br /> 선택하세요</p>
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
      <div className="common-slider-wrapper">
        <RecentPreviewSlider title="추천 의상" />
      </div>
    </div>
  );
};

export default CommonUploadSection;