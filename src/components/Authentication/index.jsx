import { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Content from '../shared/Content';
import Logo from '../../logo.svg';
import './index.css';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setKeepSignedIn(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Keep me signed in:', keepSignedIn);
  };

  const togglePasswordVisibility = () => {
    if (showPassword === false) {
      setShowPassword(!showPassword);
    } else {
      setShowPassword(false);
    }
  };

  return (
    <>
      <img src={Logo} alt='logo' className='logo' />
      <Content cn='heading'>Let's Get You Started</Content>
      <form onSubmit={handleSubmit}>
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
        <Content cn='paragraph'>
          By continuing, you acknowledge you have read and agreed to our{' '}
          <a href='/#' target='_blank' rel='noopener noreferrer'>
            Teams of Use
          </a>{' '}
          and{' '}
          <a href='/#' target='_blank' rel='noopener noreferrer'>
            Privacy Policy
          </a>
        </Content>
        <Button type='submit' sx={{ marginTop: 30 }}>
          Create Account
        </Button>
      </form>
    </>
  );
};

export default Authentication;
