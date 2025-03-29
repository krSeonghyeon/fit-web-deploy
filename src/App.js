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
  return (
    <div className="app-container">
      <div className="card">
        <Header />
        <div className="scrollable-content main-padding">
          <LayeredSection />
          <CategorySelector />
          <ExtraOptions />
          <ActionButton />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
