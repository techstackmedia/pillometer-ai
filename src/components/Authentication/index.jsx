import { useState } from 'react';
import Button from '../shared/Button';
import Content from '../shared/Content';
import Logo from '../../logo.svg';
import './index.css';
import Login from './Login';
import Register from './Register';

const Authentication = ({ isCurrentPage, navigateToNextPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepUpWithCommunity, setKeepUpWithCommunity] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discover, setDiscover] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginCheckboxChange = (e) => {
    setKeepSignedIn(e.target.checked);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleDiscoverChange = (e) => {
    setDiscover(e.target.value);
  };

  const handleCommunityCheckboxChange = (e) => {
    setKeepUpWithCommunity(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    if (showPassword === false) {
      setShowPassword(!showPassword);
    } else {
      setShowPassword(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Keep me signed in:', keepSignedIn);
  };

  return (
    <>
      <img src={Logo} alt='logo' className='logo' />
      <Content cn='heading'>
        {isCurrentPage ? 'Help us know you better' : "Let's Get You Started"}
      </Content>
      <Content cn='paragraph' sx={{ marginTop: -13 }}>
        {isCurrentPage
          ? 'This information will help us curate a personalized experience'
          : null}
      </Content>
      <form onSubmit={handleSubmit} autoComplete='off'>
        {isCurrentPage ? (
          <Register
            discover={discover}
            lastName={lastName}
            firstName={firstName}
            profession={profession}
            phoneNumber={phoneNumber}
            keepUpWithCommunity={keepUpWithCommunity}
            handleDiscoverChange={handleDiscoverChange}
            handleLastNameChange={handleLastNameChange}
            handleFirstNameChange={handleFirstNameChange}
            handleProfessionChange={handleProfessionChange}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleCommunityCheckboxChange={handleCommunityCheckboxChange}
          />
        ) : (
          <Login
            email={email}
            password={password}
            showPassword={showPassword}
            keepSignedIn={keepSignedIn}
            handleEmailChange={handleEmailChange}
            handleLoginCheckboxChange={handleLoginCheckboxChange}
            handlePasswordChange={handlePasswordChange}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        )}
        <Button
          type='submit'
          sx={{ marginTop: 30 }}
          navigateToNextPage={navigateToNextPage}
          isCurrentPage={isCurrentPage}
        >
          {isCurrentPage ? 'Proceed' : 'Create Account'}
        </Button>
      </form>
    </>
  );
};

export default Authentication;
