import './ActionButton.css';
import { PiCoatHangerBold } from 'react-icons/pi';

const ActionButton = ({
  mode,
  bodyImage,
  topImage,
  bottomImage,
  onePieceImage,
  outerImage,
  innerImage
}) => {
  const handleClick = async () => {
    console.log('🪄 버튼 클릭됨');

    if (!bodyImage) {
      alert('전신 사진을 업로드해주세요!');
      return;
    }

    try {
      let response;

      if (mode === 'onePiece') {
        if (!onePieceImage) {
          alert('원피스 사진을 업로드해주세요!');
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
        if (!topImage || !bottomImage) {
          alert('상의와 하의 사진을 업로드해주세요!');
          return;
        }

        response = await fetch('http://localhost:8000/sum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model_url: bodyImage,
            upper_url: topImage,
            lower_url: bottomImage
          })
        });
      }

      const result = await response.json();
      console.log('🎉 마법 결과:', result);
    } catch (error) {
      console.error('❌ 피팅 요청 실패:', error);
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
