import { useContext } from 'react';
import Agreement from '../../Agreement';
import Input from '../../shared/Input';
import styles from '../Login/index.module.css';
import { AuthSignupContext } from '../../../context/Auth/Register';
import Alert from '../../shared/Alert';
import Content from '../../shared/Content';

const Register = () => {
  const {
    emailReg,
    passwordReg,
    keepSignedup,
    signupError,
    // isSignup,
    handleEmailChangeReg,
    handlePasswordChangeReg,
    handleCheckboxChangeReg,
    togglePasswordVisibilityReg,
    showPasswordReg,
  } = useContext(AuthSignupContext);
  return (
    <>
      <div className={styles.alert}>
        {signupError && (
          <Alert>
            <Content cn={`heading ${styles.heading}`}>{signupError}</Content>
          </Alert>
        )}
      </div>
      <style>{`
        input[type='email'] {
          border: ${
            String(signupError).toLowerCase().split(' ').includes('email')
              ? '1px solid red'
              : ''
          };
        }

        input[type='password'] {
          border: ${
            String(signupError).toLowerCase().split(' ').includes('password')
              ? '1px solid red'
              : ''
          };
        }
      `}</style>
      <Input
        type='email'
        placeholder='Email address'
        name='email'
        value={emailReg}
        onChange={handleEmailChangeReg}
      />
      <div className={styles.inputPassword}>
        <Input
          type={showPasswordReg ? 'text' : 'password'}
          placeholder='Create password'
          name='password'
          value={passwordReg}
          onChange={handlePasswordChangeReg}
        />
        <span
          className={styles.showPassword}
          onClick={togglePasswordVisibilityReg}
        >
          {showPasswordReg ? 'Hide' : 'Show'}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <input
          type='checkbox'
          checked={keepSignedup}
          onChange={handleCheckboxChangeReg}
        />
        <Agreement>
          By continuing, you acknowledge you have read and agreed to our{' '}
          <a href='/#' target='_blank' rel='noopener noreferrer'>
            Teams of Use
          </a>{' '}
          and{' '}
          <a href='/#' target='_blank' rel='noopener noreferrer'>
            Privacy Policy
          </a>
        </Agreement>
      </div>
    </>
  );
};

export default Register;
