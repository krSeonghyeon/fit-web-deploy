import './CategorySelector.css';
import { GiDress, GiClothes } from 'react-icons/gi';
import { PiStackSimpleBold } from 'react-icons/pi';

const CategorySelector = ({ mode, setMode }) => {
  const handleModeClick = (selectedMode) => {
    setMode(mode === selectedMode ? 'common' : selectedMode);
  };

  return (
    <div className="category-section">
      <p className="category-label">모드 선택</p>
      <div className="category-buttons">
        <button
          className={`flex items-center justify-center gap-1 ${mode === 'topBottom' ? 'category-button-active' : 'category-button'}`}
          onClick={() => handleModeClick('topBottom')}
        >
          <GiClothes size={14} />
          상/하의
        </button>
        <button
          className={`flex items-center justify-center gap-1 ${mode === 'onePiece' ? 'category-button-active' : 'category-button'}`}
          onClick={() => handleModeClick('onePiece')}
        >
          <GiDress size={20} />
          원피스
        </button>
        <button
          className={`flex items-center justify-center gap-1 ${mode === 'layered' ? 'category-button-active' : 'category-button'}`}
          onClick={() => handleModeClick('layered')}
        >
          <PiStackSimpleBold size={14} />
          레이어드
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
