import { useContext, useEffect, useState } from 'react';
import UsageInfo from '../UsageInfo';
import ProfileInfo from '../ProfileInfo';
import { AuthProfileContext } from '../../context/Auth/Profile';
import Alert from '../../components/shared/Alert';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const { handleProfileSubmit, isCurrentPage, firstMessage } =
    useContext(AuthProfileContext);
  const { state } = useLocation();
  const [successMessage, setSuccessMessage] = useState('');
  const message = state?.message;

  useEffect(() => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }, [message]);

  return (
    <>
      {firstMessage && (
        <div className='pageAlert topZIndex'>
          <Alert>{firstMessage}</Alert>
        </div>
      )}

      {successMessage && (
        <div className='pageAlert'>
          <Alert>{successMessage}</Alert>
        </div>
      )}

      <form onSubmit={handleProfileSubmit}>
        {isCurrentPage ? <UsageInfo /> : <ProfileInfo />}
      </form>
    </>
  );
};

export default Profile;
