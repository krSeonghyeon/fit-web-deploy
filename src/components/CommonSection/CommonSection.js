import './CommonSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from "react-icons/io5";

const CommonUploadSection = () => (
  <div className="common-upload-container">
    <div className="common-upload-box">
      <div className="upload-icon"><IoBody size={40} /></div>
      <p className="upload-label flex items-center gap-2 text-lg mb-2">
        <PiUploadSimpleBold size={18} className="text-rose-500" />
        내 사진 선택
      </p>
      <p className="upload-subtext mt-1">전신 사진을 선택하세요</p>
    </div>
  </div>
);

export default CommonUploadSection;
