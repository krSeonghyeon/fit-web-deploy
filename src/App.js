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
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [mode, setMode] = useState('common');
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
    if (!bodyImage && newMode !== 'common') {
      alert('전신 사진을 먼저 업로드해주세요!');
      return;
    }
    setMode(newMode);
    setTopImage(null);
    setBottomImage(null);
    setOnePieceImage(null);
    setOuterImage(null);
    setInnerImage(null);
    setResultImage(null);
  };

  const renderSection = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        className="section-wrapper"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {(() => {
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
        })()}
      </motion.div>
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <Header />
          <div className="scrollable-content main-padding">
            <LoadingScreen
              bodyImage={bodyImage}
              onCancel={() => {
                setCancelRequested(true);
                setLoading(false);
              }}
            />
          </div>
          <BottomNav setMode={setMode} />
        </div>
      </div>
    );
  }

  if (resultImage && !cancelRequested) {
    return (
      <ResultPage
        imageUrl={resultImage}
        onBack={() => setResultImage(null)}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <Header />
        <div className="scrollable-content main-padding">
          {renderSection()}
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
        <BottomNav setMode={setMode} />
      </div>
    </div>
  );
}

export default App;
