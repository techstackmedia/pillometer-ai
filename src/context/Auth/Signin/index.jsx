import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_AUTH_URL } from '../../../constants';
import { defaultSigninValues } from '../defaultValues';

const AuthSigninContext = createContext(defaultSigninValues);

const AuthSigninProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signinError, setSigninError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        navigate('/', {
          state: {
            token: data.token,
            status: data.status,
            message: 'Login Successful',
          },
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        setSigninError(data.details);
        setTimeout(() => {
          setSigninError(null)
        }, 3000)
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <AuthSigninContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthSigninContext.Provider>
  );
};

export { AuthSigninProvider, AuthSigninContext };
