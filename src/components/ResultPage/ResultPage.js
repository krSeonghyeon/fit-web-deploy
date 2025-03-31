
import './ResultPage.css';

const ResultPage = ({ imageUrl, onBack }) => {
  return (
    <div className="result-page">
      <button className="result-back" onClick={onBack}>
        돌아가기
      </button>
      <div className="result-image-wrapper">
        <img src={imageUrl} alt="피팅 결과" className="result-image" />
      </div>
    </div>
  );
};

export default ResultPage;