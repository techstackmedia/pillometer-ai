import { useContext, useEffect, useState } from 'react';
import { AuthSigninContext } from '../../../context/Auth/Signin';
import { MessagesContext } from '../../../context/Messages';
import { token } from '../../../constants';
import Alert from '../../shared/Alert';
import Content from '../../shared/Content';
import { Link } from 'react-router-dom';
import { AuthProfileContext } from '../../../context/Auth/Profile';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.css';
import Modal from '../../shared/Modal';
import googleIcon from '../../../images/googleLogo.png';
import facebookIcon from '../../../images/facebookLogo.png';
import appleIcon from '../../../images/appleLogo.png';

const LoginModal = () => {
  const { profileResponse } = useContext(AuthProfileContext);
  const {
    handleSigninSubmit,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    signinError,
    togglePasswordVisibility,
    showPassword,
  } = useContext(AuthSigninContext);
  const { isloginModal } = useContext(MessagesContext);
  const firstName = profileResponse?.first_name;
  const lastName = profileResponse?.last_name;
  const navigate = useNavigate();
  const { state } = useLocation();
  const message = state?.message;
  const [successMessage, setSuccessMessage] = useState('');
  const error = signinError?.toLowerCase().split(' ');

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

  return (
    <div style={{display: message ? 'none' : undefined }}>
      {successMessage && (
        <div className='pageAlert'>
          <Alert>{successMessage}</Alert>
        </div>
      )}
      {isloginModal && (
        <div>
          {signinError && (
            <div className='pageAlert' style={{ zIndex: 5 }}>
              <Alert>{signinError}</Alert>
            </div>
          )}
          <Modal cn={styles.modalContainer}>
            <Content cn={`heading ${styles.login}`}>
              Log In to Unlock Your Conversations
            </Content>
            <Content cn={`paragraph ${styles.text}`}>
              To begin your conversations with <strong>Pillometer AI</strong>,
              please <Link to='/auth/login'>log in</Link> using your credentials.
            </Content>
            <form autoComplete='off' onSubmit={handleSigninSubmit}>
              <input
                placeholder='Enter your email'
                type='email'
                value={email}
                onChange={handleEmailChange}
                className={error?.includes('email') ? styles.error : null}
              />
              <div className={styles.passwordInput}>
                <input
                  placeholder='Enter your password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={error?.includes('password') ? styles.error : null}
                />
                <span
                  className={styles.showPassword}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>

              <div className={styles.forgotPassword}>
                <Link to='/auth/email-verification'>Forgot Password</Link>
              </div>
              <button type='submit'>Login</button>
            </form>
            {/* <Content sx={{ marginBlock: 20 }}>
              <small>
                By signing up for Pillometer AI, you agree to Pillometer AI's{' '}
                <Link to='/#'>Terms of Service</Link> &{' '}
                <Link to='/#'>Privacy Policy</Link>.
              </small>
            </Content> */}
            {/* <Content cn={`paragraph ${styles.paragraph}`}>
              <strong>Or sign in using:</strong>
            </Content> */}
            <hr style={{ marginTop: 20 }} />
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%)',
                  left: '50%',
                  top: -20,
                  backgroundColor: '#fff',
                  paddingInline: 10
                }}
              >
                OR
              </span>
            </div>
            <div className={styles.socials}>
              <img src={googleIcon} alt='google icon' width={24} height={24} />
              <img
                src={facebookIcon}
                alt='facebook icon'
                width={24}
                height={24}
              />
              <img src={appleIcon} alt='apple icon' width={24} height={24} />
            </div>
            <div className={styles.registerLink}>
              Not a member yet?{' '}
              <Link to='/auth/register'>Register for free</Link>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
