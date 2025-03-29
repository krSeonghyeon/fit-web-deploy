import './BottomNav.css';
import { Camera, History, Settings } from 'lucide-react';
import { FaTshirt } from 'react-icons/fa';

const BottomNav = () => (
  <div className="bottom-nav">
    <div className="nav-container">
      <div className="nav-item">
        <History size={20} className="text-gray-400" />
        <span className="nav-label">기록</span>
      </div>
      <div className="nav-center">
  <div className="nav-icon-circle flex-col">
    <FaTshirt size={24} className="text-white mb-1" />
    <span className="nav-label-inside">가상 피팅</span>
  </div>
</div>

      <div className="nav-item">
        <Settings size={20} className="text-gray-400" />
        <span className="nav-label">설정</span>
      </div>
    </div>
  </div>
);

export default BottomNav;