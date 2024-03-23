import { createContext, useState } from 'react';
import { BASE_CHAT_URL } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { token } from '../../../constants';

const NewPostContext = createContext();

const NewPostProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAltMessage, setAltErrorMessage] = useState(null);
  const [Ref, setRef] = useState(null);
  const [res, setRes] = useState(null);
  const { pathname } = useLocation();
  const [err, setErr] = useState();
  const [errDetail, setErrDetail] = useState(null);
  const path = pathname?.split('/');
  // const route = path[path.length - 1];
  // const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();

  const createNewPost = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({}),
      };

      const response = await fetch(BASE_CHAT_URL, requestOptions);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error('Failed to create new post');
      }

      const reference = responseData?.reference_no;
      setRef(reference);
      if (responseData) {
        navigate(`/details/${reference ?? path[2]}`, {
          state: { data: responseData },
        });
      } else {
        setAltErrorMessage('Failed to create new post');
        setTimeout(() => {
          setAltErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const sendNewPost = async (value) => {
    const postData = {
      reference_no: Ref,
      message: value,
      message_type: '',
      user_type: '',
      rating: true,
      comment: '',
      isUser: true,
      chat: 0,
      symptoms: [0],
      conditions: [0],
    };

    try {
      const response = await fetch(`${BASE_CHAT_URL}/${path[2]}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (response.ok) {
        setRes(data);
      } else {
        setErrDetail(data.details);
      }
    } catch (error) {
      setErr(error.message);
      setTimeout(() => {
        setErr(null);
      }, 3000);
    }
  };

  const values = {
    createNewPost,
    errorMessage,
    errorAltMessage,
    sendNewPost,
    res,
    err,
    Ref,
    errDetail,
  };

  return (
    <NewPostContext.Provider value={values}>{children}</NewPostContext.Provider>
  );
};

export { NewPostProvider, NewPostContext };
