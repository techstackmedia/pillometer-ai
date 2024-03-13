import { createContext, useState } from 'react';
import { BASE_CHAT_URL } from '../../../constants';

const NewPostContext = createContext();

const NewPostProvider = ({ children }) => {
  const [newPostData, setNewPostData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAltMessage, setAltErrorMessage] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

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
      console.log(response);
      setResponseMessage(response);
      if (!response.ok) {
        setAltErrorMessage('Failed to create new post');
        setTimeout(() => {
          setAltErrorMessage(null);
        }, 3000);
      }
      const data = await response.json();
      setNewPostData(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const values = {
    createNewPost,
    newPostData,
    errorMessage,
    errorAltMessage,
    responseMessage,
  };

  return (
    <NewPostContext.Provider value={values}>{children}</NewPostContext.Provider>
  );
};

export { NewPostProvider, NewPostContext };
