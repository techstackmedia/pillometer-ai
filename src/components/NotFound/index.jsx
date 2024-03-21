import { useState } from 'react';
import './index.css';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className='not-found-page'>
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Oops! Page Not Found</h2>
            <p>It seems like the page you're looking for doesn't exist.</p>
            <div className='popup-buttons'>
              <Button navigateToNextPage={handlePopupClose}>Close</Button>
              <Button navigateToNextPage={() => navigate('/')}>Home</Button>
            </div>
          </div>
        </div>
      )}
      <div className='not-found-content'>
        <h1>
          <span className='four'>4</span>
          <span className='zero'>0</span>
          <span className='four'>4</span>
        </h1>
        <p>Page Not Found</p>
        <div className='popup-buttons'>
          <Button navigateToNextPage={() => setShowPopup(true)}>
            Show Popup
          </Button>
          <Button navigateToNextPage={() => navigate('/')}>Home</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
