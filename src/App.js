import { useRef, useState } from 'react';
import './components/AppWrapper/AppWrapper.css';
import Header from './components/Header/Header';
import CommonUploadSection from './components/CommonSection/CommonSection';
import OnePieceSection from './components/OnePieceSection/OnePieceSection';
import UploadSection from './components/UploadSection/UploadSection';
import LayeredSection from './components/LayeredSection/LayeredSection';
import LongOuterSection from './components/LongOuterSection/LongOuterSection';
import CategorySelector from './components/CategorySelector/CategorySelector';
import ExtraOptions from './components/ExtraOptions/ExtraOptions';
import ActionButton from './components/ActionButton/ActionButton';
import BottomNav from './components/BottomNav/BottomNav';
import ResultPage from './components/ResultPage/ResultPage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HistorySection from './components/HistorySection/HistorySection';
import GuideModal from './components/GuideModal';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const controllerRef = useRef(null); // ✅ AbortController 참조 저장용

  const [mode, setMode] = useState('common');
  const [prevMode, setPrevMode] = useState(null);
  const [bodyImage, setBodyImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);
  const [onePieceImage, setOnePieceImage] = useState(null);
  const [outerImage, setOuterImage] = useState(null);
  const [innerImage, setInnerImage] = useState(null);
  const [longOuterImage, setLongOuterImage] = useState(null);
  const [innerwearImage, setInnerwearImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [fromHistory, setFromHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [extraOptionsOpen, setExtraOptionsOpen] = useState(false);
  const [upperLength, setUpperLength] = useState(0);
  const [lowerLength, setLowerLength] = useState(0);
  const [dressLength, setDressLength] = useState(0);
  const [uploadModalType, setUploadModalType] = useState(null);

  const getInitialGuideShownMap = () => {
    try {
      const stored = localStorage.getItem('guideShownMap');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const [guideShownMap, setGuideShownMap] = useState(() => ({
    model: false,
    top: false,
    bottom: false,
    onePiece: false,
    outer: false,
    inner: false,
    longOuter: false,
    innerwear: false,
    ...getInitialGuideShownMap(),
  }));

  const markGuideAsSeen = (key) => {
    setGuideShownMap((prev) => {
      const updated = { ...prev, [key]: true };
      localStorage.setItem('guideShownMap', JSON.stringify(updated));
      return updated;
    });
  };

  const handleModeChange = (newMode) => {
    if (!bodyImage && newMode !== 'common' && newMode !== 'history') {
      alert('전신 사진을 먼저 업로드해주세요!');
      return;
    }

    setPrevMode(mode);
    setMode(newMode);
    setExtraOptionsOpen(false);
    setTopImage(null);
    setBottomImage(null);
    setOnePieceImage(null);
    setOuterImage(null);
    setInnerImage(null);
    setLongOuterImage(null);
    setInnerwearImage(null);
    setResultImage(null);
    setFromHistory(false);
  };

  const renderSectionContent = () => {
    switch (mode) {
      case 'topBottom':
        return (
          <UploadSection
            topImage={topImage}
            setTopImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'top' });
              setTopImage(url);
            }}
            bottomImage={bottomImage}
            setBottomImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'bottom' });
              setBottomImage(url);
            }}
          />
        );
      case 'onePiece':
        return (
          <OnePieceSection
            onePieceImage={onePieceImage}
            setOnePieceImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'onePiece' });
              setOnePieceImage(url);
            }}
          />
        );
      case 'layered':
        return (
          <LayeredSection
            outerImage={outerImage}
            setOuterImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'outer' });
              setOuterImage(url);
            }}
            innerImage={innerImage}
            setInnerImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'inner' });
              setInnerImage(url);
            }}
          />
        );
      case 'longOuter':
        return (
          <LongOuterSection
            longOuterImage={longOuterImage}
            setLongOuterImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'longOuter' });
              setLongOuterImage(url);
            }}
            innerwearImage={innerwearImage}
            setInnerwearImage={(url) => {
              if (url === 'modal') return setUploadModalType({ type: 'cloth', clothType: 'innerwear' });
              setInnerwearImage(url);
            }}
          />
        );
      case 'history':
        return (
          <HistorySection
            onSelect={(entry) => {
              setResultImage(entry.result);
              localStorage.setItem('bodyImage', entry.before);
              setFromHistory(true);
              setMode('result');
            }}
          />
        );
      default:
        return (
          <CommonUploadSection
            imageUrl={bodyImage}
            onUpload={(url) => {
              setBodyImage(url);
              localStorage.setItem('bodyImage', url);
            }}
            onRequestModelModal={() => setUploadModalType({ type: 'model' })}
          />
        );
    }
  };

  const renderAnimatedContent = () => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          width: '100%',
          height: '100%',
          padding: '0 1rem',
        }}
      >
        <div className={`section-wrapper ${mode === 'history' ? 'history-wrapper' : ''}`}>
          {renderSectionContent()}
        </div>

        {mode !== 'history' && mode !== 'result' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CategorySelector mode={mode} setMode={handleModeChange} />
            <ExtraOptions
              mode={mode}
              open={extraOptionsOpen}
              setOpen={setExtraOptionsOpen}
              upperLength={upperLength}
              setUpperLength={setUpperLength}
              lowerLength={lowerLength}
              setLowerLength={setLowerLength}
              dressLength={dressLength}
              setDressLength={setDressLength}
            />
            <ActionButton
              mode={mode}
              bodyImage={bodyImage}
              topImage={topImage}
              bottomImage={bottomImage}
              onePieceImage={onePieceImage}
              outerImage={outerImage}
              innerImage={innerImage}
              longOuterImage={longOuterImage}
              innerwearImage={innerwearImage}
              setLoading={setLoading}
              setResultImage={setResultImage}
              cancelRequested={cancelRequested}
              setCancelRequested={setCancelRequested}
              extraOptionsOpen={extraOptionsOpen}
              upperLength={upperLength}
              lowerLength={lowerLength}
              dressLength={dressLength}
              setMode={setMode}
              controllerRef={controllerRef} // ✅ 요청 취소용
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const renderResultPageWithHistorySave = () => {
    const history = JSON.parse(localStorage.getItem('historyImages') || '[]');
    const bodyImageUrl = localStorage.getItem('bodyImage');
    const newEntry = { result: resultImage, before: bodyImageUrl };
    const isAlreadyInHistory = history.some(entry => entry.result === resultImage);

    if (resultImage && !isAlreadyInHistory) {
      history.unshift(newEntry);
      localStorage.setItem('historyImages', JSON.stringify(history.slice(0, 30)));
    }

    return (
      <ResultPage
        imageUrl={resultImage}
        onBack={() => {
          if (fromHistory) {
            setResultImage(null);
            setFromHistory(false);
            setMode('history');
          } else {
            setResultImage(null);
            setMode('common');
          }
        }}
      />
    );
  };

  return (
    <div className="app-container">
      <div className="card">
        <Header
          showBackButton={!loading && mode !== 'common'}
          onBack={() => {
            if (mode === 'result' && fromHistory) {
              setResultImage(null);
              setFromHistory(false);
              setMode('history');
            } else {
              setResultImage(null);
              setFromHistory(false);
              setMode('common');
            }
          }}
        />
        <div className="scrollable-content main-padding">
          {loading ? (
            <LoadingScreen
              bodyImage={bodyImage}
              onCancel={() => {
                setCancelRequested(true);
                setLoading(false);
                controllerRef.current?.abort(); // ✅ 요청 취소
              }}
            />
          ) : mode === 'result' && resultImage ? (
            renderResultPageWithHistorySave()
          ) : (
            renderAnimatedContent()
          )}
        </div>
        <BottomNav setMode={handleModeChange} />
      </div>

      <GuideModal
        type={uploadModalType?.type}
        clothType={uploadModalType?.clothType}
        isOpen={!!uploadModalType}
        guideShownMap={guideShownMap}
        onClose={() => setUploadModalType(null)}
        onSuccess={(clothTypeOrUrl, url) => {
          if (uploadModalType?.type === 'model') {
            setBodyImage(clothTypeOrUrl);
            localStorage.setItem('bodyImage', clothTypeOrUrl);
            markGuideAsSeen('model');
          } else {
            const setStateMap = {
              top: setTopImage,
              bottom: setBottomImage,
              onePiece: setOnePieceImage,
              outer: setOuterImage,
              inner: setInnerImage,
              longOuter: setLongOuterImage,
              innerwear: setInnerwearImage,
            };
            const setter = setStateMap[clothTypeOrUrl];
            if (setter) setter(url);
            markGuideAsSeen(clothTypeOrUrl);
          }
          setUploadModalType(null);
        }}
      />
    </div>
  );
}

export default App;
