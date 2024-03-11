import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_AUTH_URL } from '../../../constants';
import { defaultSignupValues } from '../defaultValues';

const AuthSignupContext = createContext(defaultSignupValues);

const AuthSignupProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedup, setKeepSignedup] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    setKeepSignedup(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSignup(true);

    try {
      const response = await fetch(`${BASE_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // navigate('/auth/email-verification', { state: { email: data.email } });
        navigate('/auth/login', { state: { email: data.email } });
        // setSuccessMessage('Check Your Email to Verify');
        setSuccessMessage('Email Verification Successful');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setSignupError(data.details);
        setTimeout(() => {
          setSignupError(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } finally {
      setIsSignup(false);
    }
  };

  const contextValues = {
    emailReg: email,
    passwordReg: password,
    keepSignedup,
    signupError,
    errorMessageReg: errorMessage,
    isSignup,
    handleEmailChangeReg: handleEmailChange,
    handlePasswordChangeReg: handlePasswordChange,
    handleCheckboxChangeReg: handleCheckboxChange,
    handleSignupSubmit: handleSubmit,
    togglePasswordVisibilityReg: togglePasswordVisibility,
    showPasswordReg: showPassword,
    successMessageReg: successMessage,
  };

  return (
    <AuthSignupContext.Provider value={contextValues}>
      {children}
    </AuthSignupContext.Provider>
  );
};

export { AuthSignupProvider, AuthSignupContext };
