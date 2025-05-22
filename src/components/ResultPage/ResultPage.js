import { useState } from "react";
import './ResultPage.css';
import { MdDownload } from "react-icons/md";
import { AiOutlineRollback } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { ImEnlarge2 } from "react-icons/im";

const ResultPage = ({ imageUrl, onBack }) => {
  const [showBefore, setShowBefore] = useState(false);
  const beforeImageUrl = localStorage.getItem('bodyImage'); // 전신 업로드 이미지

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'result-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
    }
  };

  return (
    <div className="result-page-container">
      <div className="result-image-wrapper">
        <img
          src={showBefore ? beforeImageUrl : imageUrl}
          alt={showBefore ? "before" : "after"}
          className="result-image"
        />

        <div className="image-icons">
          <div className="icon-circle">
            <IoShareSocial size={14} />
          </div>
          <div className="icon-circle">
            <ImEnlarge2 size={13} />
          </div>
        </div>

        {beforeImageUrl && (
          <button
            className="toggle-button"
            onClick={() => setShowBefore(!showBefore)}
          >
            {showBefore ? "After" : "Before"}
          </button>
        )}
      </div>

      <div className="result-buttons">
        <button className="download-button" onClick={handleDownload}>
          <MdDownload size={20} /> 다운로드
        </button>
        <button className="back-button" onClick={onBack}>
          <AiOutlineRollback size={20} /> 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
