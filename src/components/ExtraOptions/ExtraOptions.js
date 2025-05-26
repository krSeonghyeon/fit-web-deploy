import './ExtraOptions.css';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FaRegSquareCheck } from "react-icons/fa6";
import { Slider } from '@mui/material';

const ExtraOptions = ({
  mode,
  open,
  setOpen,
  upperLength,
  setUpperLength,
  lowerLength,
  setLowerLength,
  dressLength,
  setDressLength
}) => {
  const isTopBottom = mode === 'topBottom';
  const isOnePiece = mode === 'onePiece';

  const formatValue = (val) => {
    // 원피스용 값 매핑
    if (isOnePiece) {
      switch (val) {
        case 0: return '더짧게';
        case 50: return '짧게';
        case 100: return '보통';
        case 150: return '길게';
        case 200: return '더길게';
        default: return `${val}`;
      }
    }

    // 상하의용 값 매핑
    switch (val) {
      case -200: return '더짧게';
      case -100: return '짧게';
      case 0: return '보통';
      case 100: return '길게';
      case 200: return '더길게';
      default: return `${val}`;
    }
  };

  const defaultSliderProps = {
    step: null,
    min: -200,
    max: 200,
    marks: [
      { value: -200 },
      { value: -100 },
      { value: 0 },
      { value: 100 },
      { value: 200 },
    ],
    valueLabelDisplay: "off",
  };

  const dressSliderProps = {
    step: null,
    min: 0,
    max: 200,
    marks: [
      { value: 0 },
      { value: 50 },
      { value: 100 },
      { value: 150 },
      { value: 200 },
    ],
    valueLabelDisplay: "off",
  };

  return (
    <div className="extra-options">
      {/* 토글 헤더 */}
      <div className="extra-line cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="extra-label flex items-center gap-2 text-sm font-medium text-gray-800">
          <FaRegSquareCheck size={18} className="text-rose-500" />
          기장 조절
        </div>
        {open ? (
          <ChevronDown size={18} className="text-gray-400" />
        ) : (
          <ChevronRight size={18} className="text-gray-400" />
        )}
      </div>

      {/* 슬라이더 섹션 */}
      {open && (isTopBottom || isOnePiece) && (
        <div className="mt-2 px-4">
          {isTopBottom && (
            <>
              {/* 상의 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-700 w-10 pl-3">상의</span>
                <span className="text-xs text-gray-500 w-10 text-center">{formatValue(upperLength)}</span>
                <div className="flex-1 relative top-[3px]">
                  <Slider
                    value={upperLength}
                    onChange={(e, val) => setUpperLength(val)}
                    {...defaultSliderProps}
                  />
                </div>
              </div>

              {/* 하의 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-700 w-10 pl-3">하의</span>
                <span className="text-xs text-gray-500 w-10 text-center">{formatValue(lowerLength)}</span>
                <div className="flex-1 relative top-[3px]">
                  <Slider
                    value={lowerLength}
                    onChange={(e, val) => setLowerLength(val)}
                    {...defaultSliderProps}
                  />
                </div>
              </div>
            </>
          )}

          {isOnePiece && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-700 w-fit pl-2 whitespace-nowrap">원피스</span>
              <span className="text-xs text-gray-500 w-10 text-right">{formatValue(dressLength)}</span>
              <div className="flex-1 relative top-[3px]">
                <Slider
                  value={dressLength}
                  onChange={(e, val) => setDressLength(val)}
                  {...dressSliderProps}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExtraOptions;
