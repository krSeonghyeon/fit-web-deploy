import React from 'react';
import './OnePieceSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { GiDress } from "react-icons/gi"; // 원피스 아이콘
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const OnePieceSection = () => {
  return (
    <div className="onepiece-container">
      <div className="onepiece-upload-box">
        <div className="onepiece-upload-icon">
          <GiDress size={40} />
        </div>
        <p className="onepiece-upload-label">
          <PiUploadSimpleBold size={18} className="text-rose-500" />원피스 사진 선택
        </p>
        <p className="onepiece-upload-subtext">원피스 사진을 업로드해주세요</p>
      </div>
      <div className="onepiece-slider-wrapper">
        <RecentPreviewSlider title="추천 의상"/>
      </div>
    </div>
  );
};

export default OnePieceSection;
