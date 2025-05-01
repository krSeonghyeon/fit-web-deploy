import './CategorySelector.css';
import { GiDress, GiClothes, GiLabCoat} from 'react-icons/gi';
import { PiStackSimpleBold } from 'react-icons/pi';

const CategorySelector = ({ mode, setMode }) => {
  const handleModeClick = (selectedMode) => {
    setMode(mode === selectedMode ? 'common' : selectedMode);
  };

  return (
    <div className="category-section">
      <p className="category-label">✨ 모드 선택</p>
      <div className="category-buttons">
        <button
          className={mode === 'topBottom' ? 'category-button-active' : 'category-button'}
          onClick={() => handleModeClick('topBottom')}
        >
          <GiClothes size={16} />
          상/하의
        </button>
        <button
          className={mode === 'onePiece' ? 'category-button-active' : 'category-button'}
          onClick={() => handleModeClick('onePiece')}
        >
          <GiDress size={18} />
          원피스
        </button>
        <button
          className={mode === 'layered' ? 'category-button-active' : 'category-button'}
          onClick={() => handleModeClick('layered')}
        >
          <PiStackSimpleBold size={16} />
          레이어드
        </button>
        <button
          className={mode === 'longOuter' ? 'category-button-active' : 'category-button'}
          onClick={() => handleModeClick('longOuter')}
        >
          <GiLabCoat size={16} />
          롱아우터
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
