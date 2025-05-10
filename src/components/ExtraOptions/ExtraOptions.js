import './ExtraOptions.css';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FaRegSquareCheck } from "react-icons/fa6";
import { Slider } from '@mui/material';

const ExtraOptions = ({ mode, open, setOpen }) => {
  const [length, setLength] = useState(0);
  const shouldShowSlider = mode === 'topBottom' || mode === 'onePiece';

  return (
    <div className="extra-options">
      <div 
        className="extra-line cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="extra-label flex items-center gap-2 text-sm font-medium text-gray-800">
          <FaRegSquareCheck size={18} className="text-rose-500" />
          추가 설정
        </div>
        {open ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
      </div>

      {open && shouldShowSlider && (
        <div className="mt-2 px-4">
          <div className="text-sm mb-2 text-gray-700">기장 조절값 : {length}</div>
          <Slider
            value={length}
            onChange={(e, val) => setLength(val)}
            min={-200}
            max={200}
            step={1}
            marks={[
              { value: -200, label: '-200' },
              { value: 0, label: '0' },
              { value: 200, label: '200' },
            ]}
            valueLabelDisplay="off"
            sx={{
              color: '#f43f5e',
              '& .MuiSlider-thumb': { width: 18, height: 18 },
              '& .MuiSlider-track': { backgroundColor: 'transparent', borderRadius: 0 },
              '& .MuiSlider-rail': { opacity: 1, backgroundColor: '#f43f5e', borderRadius: 0 },
              '& .MuiSlider-mark': { display: 'none' },
              '& .MuiSlider-markLabel': { fontSize: '0.875rem', color: '#374151' },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExtraOptions;
