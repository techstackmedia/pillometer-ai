import { createContext, useState } from 'react';
import { BASE_AUTH_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { defaultResetPasswordValues } from '../defaultValues';

const AuthResetPasswordContext = createContext(defaultResetPasswordValues);
const AuthResetPasswordProvider = ({ children }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] =
    useState(null);
  const [resetPasswordErrorAltMessage, setResetPasswordErrorAltMessage] =
    useState(null);
  const [resetPasswordSuccessMessage, setResetPasswordSuccessMessage] =
    useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_AUTH_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = response.json();
      if (response.ok) {
        navigate('/auth/login', {
          state: { details: data.details },
        });
        setResetPasswordSuccessMessage(data.details);
        setTimeout(() => {
          setResetPasswordSuccessMessage(null);
        }, 3000);
      } else {
        setResetPasswordErrorMessage(data.details);
        setResetPasswordErrorAltMessage(data.message);
        setTimeout(() => {
          setResetPasswordErrorMessage(null);
          setResetPasswordErrorAltMessage(null);
        }, 3000);
      }
    } catch (error) {
      setResetPasswordErrorMessage(error.message);
    }
  };
  const values = {
    password,
    resetPasswordErrorMessage,
    resetPasswordErrorAltMessage,
    resetPasswordSuccessMessage,
    handleResetPasswordSubmit,
    handlePasswordChange,
  };
  return (
    <AuthResetPasswordContext.Provider value={values}>
      {children}
    </AuthResetPasswordContext.Provider>
  );
};

export { AuthResetPasswordProvider, AuthResetPasswordContext };
