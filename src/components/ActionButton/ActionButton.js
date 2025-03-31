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
  setCancelRequested // ✅ 이름 통일
}) => {
  const handleClick = async () => {
    console.log('🪄 버튼 클릭됨');

    if (!bodyImage) {
      alert('전신 사진을 업로드해주세요!');
      return;
    }

    setCancelRequested(false); // ✅ 취소 초기화
    setLoading(true);

    try {
      let response;

      if (mode === 'onePiece') {
        if (!onePieceImage) {
          alert('원피스 사진을 업로드해주세요!');
          setLoading(false);
          return;
        }

        response = await fetch('http://localhost:8000/dress', {
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

        response = await fetch('http://localhost:8000/sum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }

      const result = await response.json();
      setResultImage(result.url); // ❗ App.js에서 cancel 상태 확인 후 반영
    } catch (error) {
      console.error('❌ 피팅 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="action-button" onClick={handleClick}>
      <PiCoatHangerBold size={24} className="mr-2" />
      <span>마법을 지켜보세요!</span>
    </button>
  );
};

export default ActionButton;