import './RecentPreviewSlider.css';

const RecentPreviewSlider = ({ type }) => {
  return (
    <div>
      <p className="recent-preview-title">추천 사진</p>
      <div className="recent-scroll-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="recent-circle">
            <img src="/default-avatar.png" alt="최근" className="recent-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPreviewSlider;