import './Header.css';
import { WiStars } from "react-icons/wi";

const Header = () => (
  <div className="header">
    <div className="header-inner">
      <span className="header-text">
        <WiStars size={24} className="mr-0 text-yellow-500" /> {/* 아이콘 추가, 색깔 노란색 */}
        사진을 업로드하고 가상피팅을 경험해보세요!
        <WiStars size={24} className="mr-0 text-yellow-500" /> {/* 아이콘 추가, 색깔 노란색 */}
      </span>
    </div>
  </div>
);

export default Header;
