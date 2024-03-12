import Input from '../../shared/Input';
import styles from './index.module.css';
import { useContext } from 'react';
import { AuthSigninContext } from '../../../context/Auth/Signin';
import { useLocation } from 'react-router-dom';
import Alert from '../../shared/Alert';
import Content from '../../shared/Content';
import { AuthSignupContext } from '../../../context/Auth/Register';
import Logo from '../../../logo.svg';
import { AuthResetPasswordContext } from '../../../context/Auth/ResetPassword';

const Login = () => {
  const {
    email,
    password,
    keepSignedIn,
    signinError,
    // isSigningIn,
    handleEmailChange,
    handlePasswordChange,
    handleLoginCheckboxChange,
    togglePasswordVisibility,
    showPassword,
  } = useContext(AuthSigninContext);
  const { resetMessage } = useContext(AuthResetPasswordContext);
  const { successMessageReg } = useContext(AuthSignupContext);
  const location = useLocation();
  const verifiedEmail = location.state?.email;
  const details = location.state?.details;

  return (
    <>
      {resetMessage && (
        <div className={styles.alert}>
          <Alert>
            <Content cn={`heading ${styles.heading}`}>{details}</Content>
            <Content cn={`paragraph ${styles.paragraph}`}>
              {resetMessage}
            </Content>
          </Alert>
        </div>
      )}
      <div className='authMain'>
        <img src={Logo} alt='logo' className='logo' />
        <Content cn='heading'>Login To Continue</Content>
        <Content cn={`paragraph ${styles.info}`}>
          Login to start using the Pilometer AI
        </Content>
      </div>
      {verifiedEmail && successMessageReg && (
        <div className={styles.alert}>
          <Alert>
            <Content cn={`heading ${styles.heading}`}>
              {successMessageReg}
            </Content>
            <Content cn={`paragraph ${styles.paragraphText}`}>
              Login to continue
            </Content>
          </Alert>
        </div>
      )}
      <style>{`
        input[type='email'] {
          border: ${
            String(signinError).toLowerCase().split(' ').includes('email')
              ? '1px solid red'
              : ''
          };
        }

        input[type='password'] {
          border: ${
            String(signinError).toLowerCase().split(' ').includes('password')
              ? '1px solid red'
              : ''
          };
        }
      `}</style>
      <Input
        type='email'
        placeholder={verifiedEmail ? 'Confirm email' : 'Email address'}
        name='email'
        value={email}
        onChange={handleEmailChange}
      />
      <div className={styles.inputPassword}>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={verifiedEmail ? 'Confirm password' : 'Create password'}
          name='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <span
          className={styles.showPassword}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      <label className={`paragraph ${styles.paragraph}`}>
        <input
          type='checkbox'
          checked={keepSignedIn}
          onChange={handleLoginCheckboxChange}
        />
        <span>Keep me signed in</span>
      </label>
    </>
  );
};

export default Login;
