import './ResultPage.css';
import { MdDownload } from "react-icons/md";
import { AiOutlineRollback } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { ImEnlarge2 } from "react-icons/im";

const ResultPage = ({ imageUrl, onBack }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'result-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="result-page-container">
      <div className="result-image-wrapper">
        <img src={imageUrl} alt="result" className="result-image" />
        <div className="image-icons">
          <div className="icon-circle">
            <IoShareSocial size={14} />
          </div>
          <div className="icon-circle">
            <ImEnlarge2 size={13} />
          </div>
        </div>
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
