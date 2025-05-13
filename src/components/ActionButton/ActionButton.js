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
  longOuterImage,
  innerwearImage,
  setLoading,
  setResultImage,
  cancelRequested,
  setCancelRequested,
  extraOptionsOpen,
  upperLength,
  lowerLength,
  dressLength, // ✅ 추가됨
  setMode
}) => {
  const shouldHide = (mode === 'topBottom' || mode === 'onePiece') && extraOptionsOpen;
  if (shouldHide) return null;

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

      if (mode === 'topBottom') {
        if (!topImage && !bottomImage) {
          alert('최소한 하나의 의류(상의 또는 하의)를 업로드해주세요!');
          setLoading(false);
          return;
        }

        // Step 1: /presum 요청
        const presumResponse = await fetch(`${apiUrl}/presum`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model_url: bodyImage,
            upper_url: topImage || null,
            lower_url: bottomImage || null,
            upper_offset_bottom: upperLength,
            lower_offset_bottom: lowerLength
          })
        });

        const presumResult = await presumResponse.json();

        if (!presumResult.url) {
          throw new Error('presum 요청 실패: model_url 누락');
        }

        // Step 2: /sum 요청
        const payload = {
          model_url: presumResult.url,
          upper_url: topImage || null,
          lower_url: bottomImage || null,
          upper_offset_bottom: upperLength,
          lower_offset_bottom: lowerLength
        };

        response = await fetch(`${apiUrl}/sum`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

      } else if (mode === 'onePiece') {
        if (!onePieceImage) {
          alert('원피스 사진을 업로드해주세요!');
          setLoading(false);
          return;
        }

        // ✅ dressLength 사용
        response = await fetch(`${apiUrl}/dress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model_url: bodyImage,
            dress_url: onePieceImage,
            offset_bottom: dressLength // ✅ upperLength → dressLength
          })
        });

      } else if (mode === 'longOuter') {
        if (!longOuterImage) {
          alert('롱아우터 사진을 업로드해주세요!');
          setLoading(false);
          return;
        }

        const payload = {
          model_url: bodyImage,
          coat_url: longOuterImage
        };

        if (innerwearImage) {
          payload.inner_url = innerwearImage;
        }

        response = await fetch(`${apiUrl}/coat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

      } else if (mode === 'layered') {
        if (!outerImage) {
          alert('아우터 사진을 업로드해주세요!');
          setLoading(false);
          return;
        }

        const payload = {
          model_url: bodyImage,
          outer_url: outerImage,
          offset: 0
        };

        if (innerImage) {
          payload.inner_url = innerImage;
        }

        response = await fetch(`${apiUrl}/layered`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const result = await response.json();
      setResultImage(result.url);
      setMode('result');
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
