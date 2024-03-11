import { useContext, useState } from 'react';
import Button from '../shared/Button';
import Content from '../shared/Content';
import Logo from '../../logo.svg';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import { useLocation } from 'react-router-dom';
import styles from './index.module.css';
import { AuthSigninContext } from '../../context/Auth/Signin';
import { AuthSignupContext } from '../../context/Auth/Register';

const Authentication = ({ isCurrentPage /* , navigateToNextPage */ }) => {
  const {
    email,
    password,
    keepSignedIn,
    signinError,
    errorMessage,
    isSigningIn,
    handleEmailChange,
    handlePasswordChange,
    handleLoginCheckboxChange,
    handleSigninSubmit,
    togglePasswordVisibility,
    showPassword,
    successMessage,
  } = useContext(AuthSigninContext);
  const {
    emailReg,
    passwordReg,
    keepSignedup,
    signupError,
    errorMessageReg,
    isSignup,
    handleEmailChangeReg,
    handlePasswordChangeReg,
    handleCheckboxChangeReg,
    handleSignupSubmit,
    togglePasswordVisibilityReg,
    showPasswordReg,
    successMessageReg,
  } = useContext(AuthSignupContext);

  const { pathname } = useLocation();
  const [keepUpWithCommunity, setKeepUpWithCommunity] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discover, setDiscover] = useState('');
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

  return (
    <>
      <img src={Logo} alt='logo' className='logo' />
      <Content cn='heading'>
        {isCurrentPage ? 'Help us know you better' : "Let's Get You Started"}
      </Content>
      <Content cn={`paragraph ${styles.info}`}>
        {isCurrentPage
          ? 'This information will help us curate a personalized experience'
          : null}
      </Content>
      {pathname !== '/auth/register' ? (
        <form
          className={styles.form}
          onSubmit={pathname === '/auth/profile' ? null : handleSigninSubmit}
          autoComplete='off'
        >
          {isCurrentPage ? (
            <Profile
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
              keepSignedIn={keepSignedIn}
              signinError={signinError}
              errorMessage={errorMessage}
              isSigningIn={isSigningIn}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              handleLoginCheckboxChange={handleLoginCheckboxChange}
              handleSubmit={handleSigninSubmit}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
              successMessage={successMessage}
            />
          )}
          <Button
            type='submit'
            // navigateToNextPage={handleAuthNavigation}
            isCurrentPage={isCurrentPage}
          >
            {pathname === '/auth/login' ? 'Sign in' : 'Proceed'}
          </Button>
        </form>
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSignupSubmit}
          autoComplete='off'
        >
          <Register
            emailReg={emailReg}
            passwordReg={passwordReg}
            keepSignedup={keepSignedup}
            signupError={signupError}
            errorMessageReg={errorMessageReg}
            isSignup={isSignup}
            handleEmailChangeReg={handleEmailChangeReg}
            handlePasswordChangeReg={handlePasswordChangeReg}
            handleCheckboxChangeReg={handleCheckboxChangeReg}
            handleSignupSubmit={handleSignupSubmit}
            togglePasswordVisibilityReg={togglePasswordVisibilityReg}
            showPasswordReg={showPasswordReg}
            successMessageReg={successMessageReg}
          />

          <Button
            type='submit'
            // navigateToNextPage={navigateToNextPage}
            isCurrentPage={isCurrentPage}
          >
            Create Account
          </Button>
        </form>
      )}
    </>
  );
};

export default Authentication;
