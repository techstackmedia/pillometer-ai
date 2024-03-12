import { createContext, useState } from 'react';
import { BASE_AUTH_URL } from '../../../constants';
import resetToken from '../../../utils/URLResetToken';
import { useNavigate } from 'react-router-dom';

const AuthResetPasswordContext = createContext();
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
  let token;
  if (token === 'undefined') {
    token = null;
  } else if (token) {
    token = resetToken();
  }
  console.log('token', token);

  const handleResetPasswordSubmit = async (e) => {
    resetToken();
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_AUTH_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = response.json();
      if (response.ok) {
        setResetPasswordSuccessMessage(data.details);
        navigate('/', { state: { details: data.details } });
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
    resetToken,
  };
  return (
    <AuthResetPasswordContext.Provider value={values}>
      {children}
    </AuthResetPasswordContext.Provider>
  );
};

export { AuthResetPasswordProvider, AuthResetPasswordContext };
