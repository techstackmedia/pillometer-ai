import { useContext } from 'react';
import Button from '../shared/Button';
import Login from './Login';
import Register from './Register';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { AuthSigninContext } from '../../context/Auth/Signin';
import { AuthSignupContext } from '../../context/Auth/Register';

const Authentication = () => {
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

  return (
    <>
      {pathname === '/auth/login' ? (
        <form
          className={styles.form}
          onSubmit={handleSigninSubmit}
          autoComplete='off'
        >
          {
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
          }
          <Link to='/auth/email-verification' className={styles.forgotPassword}>
            Forgot Password
          </Link>
          <Button type='submit'>Sign in</Button>
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

          <Button type='submit'>Create Account</Button>
        </form>
      )}
    </>
  );
};

export default Authentication;
