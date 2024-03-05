import Input from '../../shared/Input';
import Agreement from '../../Agreement';

const Login = ({
  email,
  password,
  showPassword,
  keepSignedIn,
  handleEmailChange,
  handlePasswordChange,
  handleCheckboxChange,
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
      <div style={{ position: 'relative' }}>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Create password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <span className='showPassword' onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      <label className='paragraph' style={{ display: 'flex' }}>
        <input
          type='checkbox'
          checked={keepSignedIn}
          onChange={handleCheckboxChange}
        />
        <span style={{ marginLeft: 5 }}>Keep me signed in</span>
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
