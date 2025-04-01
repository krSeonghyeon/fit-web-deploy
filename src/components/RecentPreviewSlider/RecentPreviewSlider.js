import './RecentPreviewSlider.css';

const RecentPreviewSlider = ({ title = "추천 사진", images = [], onSelect }) => {
  return (
    <div>
      <p className="recent-preview-title">{title}</p>
      <div className="recent-scroll-container">
        {images.map((url, i) => (
          <div key={i} className="recent-circle" onClick={() => onSelect?.(url)}>
            <img src={url} alt={`추천${i}`} className="recent-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPreviewSlider;
