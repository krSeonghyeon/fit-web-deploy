import './ActionButton.css';
import { PiCoatHangerBold } from "react-icons/pi";

const ActionButton = () => (
  <button className="action-button">
    <PiCoatHangerBold size={24} className="mr-2" /> {/* 아이콘 */}
    <span>마법을 지켜보세요!</span> {/* 텍스트 */}
  </button>
);

export default ActionButton;
