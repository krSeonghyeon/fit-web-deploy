import './LoadingScreen.css';

const LoadingScreen = ({ bodyImage, onCancel }) => {
  return (
    <div className="loading-photo-wrapper">
      <div className="loading-photo-inner">
        <img src={bodyImage} alt="업로드된 전신 사진" className="loading-photo" />
        <div className="scan-bar" />
      </div>
      <p className="loading-message">의상을 분석 중입니다...</p>
      <p className="loading-subtext">예상 소요 시간: 20~35초</p>
      <button className="cancel-button" onClick={onCancel}>취소</button>
    </div>
  );
};

export default LoadingScreen;
