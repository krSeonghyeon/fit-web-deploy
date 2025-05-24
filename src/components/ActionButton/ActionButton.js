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
  dressLength,
  setMode,
  controllerRef // ✅ 요청 중단을 위한 참조
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

    const controller = new AbortController(); // ✅ 요청 제어용 컨트롤러 생성
    controllerRef.current = controller;

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      let response;

      if (mode === 'topBottom') {
        if (!topImage && !bottomImage) {
          alert('최소한 하나의 의류(상의 또는 하의)를 업로드해주세요!');
          setLoading(false);
          return;
        }

        const presumResponse = await fetch(`${apiUrl}/presum`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model_url: bodyImage,
            upper_url: topImage || null,
            lower_url: bottomImage || null,
            upper_offset_bottom: upperLength,
            lower_offset_bottom: lowerLength
          }),
          signal: controller.signal // ✅ 요청 취소 연결
        });

        const presumResult = await presumResponse.json();
        if (!presumResult.url) throw new Error('presum 요청 실패: model_url 누락');

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
          body: JSON.stringify(payload),
          signal: controller.signal
        });

      } else if (mode === 'onePiece') {
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
            dress_url: onePieceImage,
            offset_bottom: dressLength
          }),
          signal: controller.signal
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
        if (innerwearImage) payload.inner_url = innerwearImage;

        response = await fetch(`${apiUrl}/coat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
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
        if (innerImage) payload.inner_url = innerImage;

        response = await fetch(`${apiUrl}/layered`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      }

      const result = await response.json();
      setResultImage(result.url);
      setMode('result');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('⛔ 요청이 사용자에 의해 취소되었습니다.');
      } else {
        console.error('❌ 피팅 요청 실패:', error);
      }
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
