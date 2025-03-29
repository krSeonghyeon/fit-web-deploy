import './LayeredSection.css';
import { FaTshirt} from 'react-icons/fa';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { TbJacket } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const LayeredSection = () => (
  <div className="upload-row">
    {/* 왼쪽 박스들 (세로 정렬) */}
    <div className="upload-left-col">
      {/* 아우터 */}
      <div className="upload-box">
        <div className="upload-icon"><TbJacket size={24} /></div>
        <p className="upload-label flex items-center gap-1 mb-2">
          <PiUploadSimpleBold size={16} className="text-rose-500" />사진 선택
        </p>
        <p className="upload-subtext mt-1">아우터 사진을 선택하세요</p>
      </div>

      {/* 순서 변경 버튼 */}
      <div className="upload-box-swap-button">
        <TiArrowUnsorted size={20} />
      </div>

      {/* 이너 */}
      <div className="upload-box">
        <div className="upload-icon"><FaTshirt size={24} /></div>
        <p className="upload-label flex items-center gap-1 mb-2">
          <PiUploadSimpleBold size={16} className="text-rose-500" />사진 선택
        </p>
        <p className="upload-subtext mt-1">이너 사진을 선택하세요</p>
      </div>
    </div>

    {/* 오른쪽 슬라이더 영역 */}
    <div className="upload-slider-wrapper">
      <RecentPreviewSlider title="추천 사진" />
      <RecentPreviewSlider title="추천 의류" />
    </div>
  </div>
);

export default LayeredSection;
