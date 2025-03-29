// UploadSection.js
import './UploadSection.css';
import { FaTshirt } from 'react-icons/fa';
import { PiPants, PiUploadSimpleBold } from 'react-icons/pi';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const UploadSection = () => (
  <>
    <div className="upload-row">
      <div className="upload-box">
        <div className="upload-icon"><FaTshirt size={24} /></div>
        <p className="upload-label flex items-center gap-1">
          <PiUploadSimpleBold size={16} className="text-rose-500" />사진 선택
        </p>
        <p className="upload-subtext mt-1">상의 사진을 선택하세요</p>
      </div>
      <div className="upload-slider-wrapper">
        <RecentPreviewSlider title="최근 사진" />
      </div>
    </div>

    <div className="upload-row">
      <div className="upload-box">
        <div className="upload-icon"><PiPants size={24} /></div>
        <p className="upload-label flex items-center gap-1">
          <PiUploadSimpleBold size={16} className="text-rose-500" />사진 선택
        </p>
        <p className="upload-subtext mt-1">하의 사진을 선택하세요</p>
      </div>
      <div className="upload-slider-wrapper">
        <RecentPreviewSlider title="최근 의류" />
      </div>
    </div>
  </>
);

export default UploadSection;
