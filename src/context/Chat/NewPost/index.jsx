import { createContext, useState } from 'react';
import { BASE_CHAT_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const NewPostContext = createContext();

const NewPostProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAltMessage, setAltErrorMessage] = useState(null);
  const navigate = useNavigate();

  const createNewPost = async (token) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({}),
    };

    try {
      const response = await fetch(BASE_CHAT_URL, requestOptions);
      const responseData = await response.json();
      navigate(`/${responseData?.reference_no}`, {
        state: { data: responseData },
      });
      if (!response.ok) {
        setAltErrorMessage('Failed to create new post');
        setTimeout(() => {
          setAltErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const values = {
    createNewPost,
    errorMessage,
    errorAltMessage,
  };

  return (
    <NewPostContext.Provider value={values}>{children}</NewPostContext.Provider>
  );
};

export { NewPostProvider, NewPostContext };
