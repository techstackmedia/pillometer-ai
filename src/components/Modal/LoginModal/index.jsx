import { useContext, useEffect, useState } from 'react';
import { AuthSigninContext } from '../../../context/Auth/Signin';
import { MessagesContext } from '../../../context/Messages';
import { token } from '../../../constants';
import Alert from '../../shared/Alert';
import { AuthProfileContext } from '../../../context/Auth/Profile';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalLogin from '..';

const LoginModal = () => {
  const { profileResponse } = useContext(AuthProfileContext);
  const { signinError } = useContext(AuthSigninContext);
  const { isloginModal } = useContext(MessagesContext);
  const firstName = profileResponse?.first_name;
  const lastName = profileResponse?.last_name;
  const navigate = useNavigate();
  const { state } = useLocation();
  const message = state?.message;
  const [successMessage, setSuccessMessage] = useState('');
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    if (firstName === '' && lastName === '' && token) {
      navigate('/auth/profile', {
        state: { message: 'Profile set up is incomplete' },
      });
    }
  }, [firstName, lastName, navigate]);

  useEffect(() => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }, [message]);

  useEffect(() => {
    if (!firstName && !lastName && token) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [firstName, lastName]);

  return (
    <div style={{ display: message ? 'none' : undefined }}>
      {successMessage && (
        <div className='pageAlert'>
          <Alert>{successMessage}</Alert>
        </div>
      )}
      {isProfile && <ModalLogin />}
      {isloginModal && (
        <div>
          {signinError && (
            <div className='pageAlert' style={{ zIndex: 5 }}>
              <Alert>{signinError}</Alert>
            </div>
          )}
          <ModalLogin />
        </div>
      )}
    </div>
  );
};

export default LoginModal;
