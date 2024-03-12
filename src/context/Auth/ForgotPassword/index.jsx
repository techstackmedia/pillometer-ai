import { createContext, useState } from 'react';
import { BASE_AUTH_URL } from '../../../constants';

const AuthForgotPasswordResetContext = createContext();

const AuthForgotPasswordProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [forgotPasswordErrorMessage, setForgotPasswordErrorMessage] =
    useState(null);
  const [forgotPasswordErrorAltMessage, setForgotPasswordErrorAltMessage] =
    useState(null);
  const [forgotPasswordSuccessMessage, setForgotPasswordSuccessMessage] =
    useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_AUTH_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = response.json();
      if (response.ok) {
        setForgotPasswordSuccessMessage(data.details);
        setTimeout(() => {
          setForgotPasswordSuccessMessage(null);
        }, 3000);
      } else {
        setForgotPasswordErrorMessage(data.details);
        setForgotPasswordErrorAltMessage(data.message);
        setTimeout(() => {
          setForgotPasswordErrorMessage(null);
          setForgotPasswordErrorAltMessage(null);
        }, 3000);
      }
    } catch (error) {
      setForgotPasswordErrorMessage(error.message);
    }
  };

  const values = {
    handleForgotPasswordSubmit,
    handleEmailChange,
    forgotPasswordErrorMessage,
    forgotPasswordSuccessMessage,
    forgotPasswordErrorAltMessage,
  };

  return (
    <AuthForgotPasswordResetContext.Provider value={values}>
      {children}
    </AuthForgotPasswordResetContext.Provider>
  );
};

export { AuthForgotPasswordProvider, AuthForgotPasswordResetContext };
