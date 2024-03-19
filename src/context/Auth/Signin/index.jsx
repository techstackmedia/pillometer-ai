import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_AUTH_URL } from '../../../constants';
import { defaultSigninValues } from '../defaultValues';
// import { AuthProfileContext } from '../Profile';

const AuthSigninContext = createContext(defaultSigninValues);

const AuthSigninProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signinError, setSigninError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // const { profileResponse } = useContext(AuthProfileContext);

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
  const handleLoginCheckboxChange = (e) => {
    setKeepSignedIn(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      const response = await fetch(`${BASE_AUTH_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // if (checkProfileUpdate) {
        navigate('/', { state: { token: data.token, status: data.status } });
        // } else {
        //   // window.location.href = '/auth/profile';
        //   navigate('/auth/profile', { state: { profile: data.details } });
        // }

        setSuccessMessage('Login Successful');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        window.location.href = '/';
      } else {
        setSigninError(data.details);
        setTimeout(() => {
          setSigninError(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } finally {
      setIsSigningIn(false);
    }
  };

  const contextValues = {
    email,
    password,
    keepSignedIn,
    signinError,
    errorMessage,
    isSigningIn,
    handleEmailChange,
    handlePasswordChange,
    handleLoginCheckboxChange,
    handleSigninSubmit: handleSubmit,
    togglePasswordVisibility,
    showPassword,
    successMessage,
  };

  return (
    <AuthSigninContext.Provider value={contextValues}>
      {children}
    </AuthSigninContext.Provider>
  );
};

export { AuthSigninProvider, AuthSigninContext };
