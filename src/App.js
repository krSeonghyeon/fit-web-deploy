import { useState } from 'react';
import './components/AppWrapper/AppWrapper.css';
import Header from './components/Header/Header';
import CommonSection from './components/CommonSection/CommonSection';
import OnePieceSection from './components/OnePieceSection/OnePieceSection';
import UploadSection from './components/UploadSection/UploadSection';
import LayeredSection from './components/LayeredSection/LayeredSection';
import CategorySelector from './components/CategorySelector/CategorySelector';
import ExtraOptions from './components/ExtraOptions/ExtraOptions';
import ActionButton from './components/ActionButton/ActionButton';
import BottomNav from './components/BottomNav/BottomNav';
import ResultPage from './components/ResultPage/ResultPage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HistorySection from './components/HistorySection/HistorySection';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [mode, setMode] = useState('common');
  const [prevMode, setPrevMode] = useState(null);
  const [bodyImage, setBodyImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);
  const [onePieceImage, setOnePieceImage] = useState(null);
  const [outerImage, setOuterImage] = useState(null);
  const [innerImage, setInnerImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);

  const handleModeChange = (newMode) => {
    if (!bodyImage && newMode !== 'common' && newMode !== 'history') {
      alert('전신 사진을 먼저 업로드해주세요!');
      return;
    }
    setPrevMode(mode);
    setMode(newMode);
    setTopImage(null);
    setBottomImage(null);
    setOnePieceImage(null);
    setOuterImage(null);
    setInnerImage(null);
    setResultImage(null);
  };

  const renderSectionContent = () => {
    switch (mode) {
      case 'topBottom':
        return (
          <UploadSection
            topImage={topImage}
            setTopImage={setTopImage}
            bottomImage={bottomImage}
            setBottomImage={setBottomImage}
          />
        );
      case 'onePiece':
        return (
          <OnePieceSection
            onePieceImage={onePieceImage}
            setOnePieceImage={setOnePieceImage}
          />
        );
      case 'layered':
        return (
          <LayeredSection
            outerImage={outerImage}
            setOuterImage={setOuterImage}
            innerImage={innerImage}
            setInnerImage={setInnerImage}
          />
        );
      default:
        return (
          <CommonSection
            imageUrl={bodyImage}
            onUpload={setBodyImage}
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
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
          {mode === 'history' ? <HistorySection /> : renderSectionContent()}
        </div>

        {mode !== 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CategorySelector mode={mode} setMode={handleModeChange} />
            <ExtraOptions />
            <ActionButton
              mode={mode}
              bodyImage={bodyImage}
              topImage={topImage}
              bottomImage={bottomImage}
              onePieceImage={onePieceImage}
              outerImage={outerImage}
              innerImage={innerImage}
              setLoading={setLoading}
              setResultImage={setResultImage}
              cancelRequested={cancelRequested}
              setCancelRequested={setCancelRequested}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="app-container">
      <div className="card">
        <Header
          showBackButton={mode !== 'common'}
          onBack={() => {
            setMode('common');
          }}
        />
        <div className="scrollable-content main-padding">
          {loading ? (
            <LoadingScreen
              bodyImage={bodyImage}
              onCancel={() => {
                setCancelRequested(true);
                setLoading(false);
              }}
            />
          ) : resultImage && !cancelRequested ? (
            <ResultPage
              imageUrl={resultImage}
              onBack={() => {
                setResultImage(null);
                handleModeChange('common');
              }}
            />
          ) : (
            renderAnimatedContent()
          )}
        </div>
        <BottomNav setMode={handleModeChange} />
      </div>
    </div>
  );
}

export default App;
