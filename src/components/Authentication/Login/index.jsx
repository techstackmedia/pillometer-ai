import Input from '../../shared/Input';
import Agreement from '../../Agreement';
import styles from './index.module.css';

const Login = ({
  email,
  password,
  showPassword,
  keepSignedIn,
  handleEmailChange,
  handlePasswordChange,
  handleLoginCheckboxChange,
  togglePasswordVisibility,
}) => {
  return (
    <>
      <Input
        type='email'
        placeholder='Email address'
        name='email'
        value={email}
        onChange={handleEmailChange}
      />
      <div className={styles.inputPassword}>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Create password'
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
    </>
  );
};

export default Login;
