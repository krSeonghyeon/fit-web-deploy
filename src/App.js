// ✅ App.js
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

function App() {
  const [mode, setMode] = useState('common');

  const [bodyImage, setBodyImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);
  const [onePieceImage, setOnePieceImage] = useState(null);
  const [outerImage, setOuterImage] = useState(null);
  const [innerImage, setInnerImage] = useState(null);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTopImage(null);
    setBottomImage(null);
    setOnePieceImage(null);
    setOuterImage(null);
    setInnerImage(null);
  };

  const renderSection = () => {
    switch (mode) {
      case 'topBottom':
        return <UploadSection topImage={topImage} setTopImage={setTopImage} bottomImage={bottomImage} setBottomImage={setBottomImage} />;
      case 'onePiece':
        return <OnePieceSection onePieceImage={onePieceImage} setOnePieceImage={setOnePieceImage} />;
      case 'layered':
        return <LayeredSection outerImage={outerImage} setOuterImage={setOuterImage} innerImage={innerImage} setInnerImage={setInnerImage} />;
      default:
        return <CommonSection imageUrl={bodyImage} onUpload={setBodyImage} />;
    }
  };

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
          />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;