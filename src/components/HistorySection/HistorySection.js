import { useEffect, useState } from 'react';
import './HistorySection.css';

const HistorySection = ({ onSelect }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('historyImages') || '[]');
    setImages(saved);
  }, []);

  return (
    <div className="history-scroll-container">
      <div className="history-title-wrapper">
        <div className="history-title">기록</div>
      </div>
      <div className="history-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => onSelect?.(src)} // ✅ 클릭 시 부모에 전달
          >
            <img src={src} alt={`history-${index}`} className="history-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
