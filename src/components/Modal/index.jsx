import Content from '../shared/Content';
import { Link } from 'react-router-dom';
import styles from './LoginModal/index.module.css';
import Modal from '../shared/Modal';
import googleIcon from '../../images/googleLogo.png';
import facebookIcon from '../../images/facebookLogo.png';
import appleIcon from '../../images/appleLogo.png';
import { AuthSigninContext } from '../../context/Auth/Signin';
import { useContext } from 'react';

const ModalLogin = () => {
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
  const error = signinError?.toLowerCase().split(' ');

  return (
    <Modal cn={styles.modalContainer}>
      <Content cn={`heading ${styles.login}`}>
        Log In to Unlock Your Conversations
      </Content>
      <Content cn={`paragraph ${styles.text}`}>
        To begin your conversations with <strong>Pillometer AI</strong>, please{' '}
        <Link to='/auth/login'>log in</Link> using your credentials.
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
        <button type='submit'>Log in</button>
      </form>
      <Content sx={{ marginBlock: 20 }}>
        <small>
          By signing up for Pillometer AI, you agree to Pillometer AI's{' '}
          <Link to='#'>Terms of Service</Link> &{' '}
          <Link to='#'>Privacy Policy</Link>.
        </small>
      </Content>
      <hr style={{ marginTop: 20 }} />
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            transform: 'translate(-50%)',
            left: '50%',
            top: -20,
            backgroundColor: '#fff',
            paddingInline: 10,
          }}
        >
          OR
        </span>
      </div>
      <div className={styles.socials}>
        <img src={googleIcon} alt='google icon' width={24} height={24} />
        <img src={facebookIcon} alt='facebook icon' width={24} height={24} />
        <img src={appleIcon} alt='apple icon' width={24} height={24} />
      </div>
      <div className={styles.registerLink}>
        Not a member yet? <Link to='/auth/register'>Register for free</Link>
      </div>
    </Modal>
  );
};

export default ModalLogin;
