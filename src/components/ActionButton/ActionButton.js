import './ActionButton.css';
import { PiCoatHangerBold } from 'react-icons/pi';

const ActionButton = ({
  mode,
  bodyImage,
  topImage,
  bottomImage,
  onePieceImage,
  outerImage,
  innerImage,
  setLoading,
  setResultImage,
  setCancelRequested
}) => {
  const handleClick = async () => {
    console.log('🪄 버튼 클릭됨');

    if (!bodyImage) {
      alert('전신 사진을 업로드해주세요!');
      return;
    }

    setCancelRequested(false);
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      let response;

      if (mode === 'onePiece') {
        if (!onePieceImage) {
          alert('원피스 사진을 업로드해주세요!');
          setLoading(false);
          return;
        }

        response = await fetch(`${apiUrl}/dress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model_url: bodyImage,
            dress_url: onePieceImage
          })
        });
      } else {
        if (!topImage && !bottomImage) {
          alert('최소한 하나의 의류(상의 또는 하의)를 업로드해주세요!');
          setLoading(false);
          return;
        }

        const body = {
          model_url: bodyImage,
          upper_url: topImage || null,
          lower_url: bottomImage || null
        };

        response = await fetch(`${apiUrl}/sum`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }

      const result = await response.json();
      setResultImage(result.url);
    } catch (error) {
      console.error('❌ 피팅 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`action-button ${mode === 'common' ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={mode === 'common'}
    >
      <PiCoatHangerBold size={24} className="mr-2" />
      <span>마법을 지켜보세요!</span>
    </button>
  );
};

export default ActionButton;
