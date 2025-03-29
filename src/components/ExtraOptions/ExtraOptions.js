import './ExtraOptions.css';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { FaRegSquareCheck } from "react-icons/fa6";

const ExtraOptions = () => (
    <div className="extra-options">
    <div className="extra-line">
      <div className="extra-label flex items-center gap-2 text-sm font-medium text-gray-800">
        <FaRegSquareCheck size={18} className="text-rose-500" />
        추가 설정
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  </div>  
);

export default ExtraOptions;