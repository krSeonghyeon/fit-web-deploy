import './CategorySelector.css';
import { FaTshirt } from 'react-icons/fa';
import { GiDress } from 'react-icons/gi';
import { PiStackSimpleBold } from 'react-icons/pi';


const CategorySelector = () => (
  <div className="category-section">
  <p className="category-label">모드 선택</p>
  <div className="category-buttons">
    <button className="category-button-active flex items-center justify-center gap-1">
      <FaTshirt size={14} />
      상/하의
    </button>
    <button className="category-button flex items-center justify-center gap-1">
      <GiDress size={20} />
      원피스
    </button>
    <button className="category-button flex items-center justify-center gap-1">
      <PiStackSimpleBold size={14} />
      레이어드
    </button>
  </div>
</div>

);

export default CategorySelector;