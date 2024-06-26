import { createContext, useContext, useEffect, useState } from 'react';
import { BASE_CHAT_URL, WSS_CHAT_URL } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { token } from '../../../constants';
import { AuthProfileContext } from '../../Auth/Profile';
import { WebSocketContext } from '../Service';
import { connectWebSocket } from '../Service/websocket';
import { defaultNewPostValues } from '../../defaultValues';

const NewPostContext = createContext(defaultNewPostValues);

const NewPostProvider = ({ children }) => {
  const newPostData = useContext(WebSocketContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAltMessage, setAltErrorMessage] = useState(null);
  const [Ref, setRef] = useState(null);
  const [res, setRes] = useState(null);
  const { pathname, state } = useLocation();
  const [err, setErr] = useState();
  const [errDetail, setErrDetail] = useState(null);
  const path = pathname?.split('/');
  const ref = newPostData?.reference_no;
  const reference_no = ref ?? Ref ?? state?.data?.reference_no ?? path[2];
  const { profileResponse } = useContext(AuthProfileContext);
  const userType = profileResponse?.user_type;
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

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
      if (Ref) {
        connectWebSocket(`${WSS_CHAT_URL}${Ref}`, token);
        navigate(`/details/${Ref}`, {
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

  const handleClick = async () => {
    await createNewPost();
  };

  useEffect(() => {
    if (errorAltMessage) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorAltMessage]);

  const sendNewPost = async (value) => {
    const postData = {
      reference_no,
      message: value,
      message_type: '',
      user_type: userType,
      rating: true,
      comment: '',
      isUser: true,
      chat: 0,
      symptoms: [0],
      conditions: [0],
    };

    let endpoint = '';
    if (reference_no) {
      endpoint = `${BASE_CHAT_URL}/${reference_no}/predict`;
    }

    try {
      const response = await fetch(endpoint, {
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
        setErrDetail('Reference number is undefined. Try again!');
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
    handleMenuToggle,
    isOpen,
    setIsOpen,
  };

  return (
    <NewPostContext.Provider value={values}>{children}</NewPostContext.Provider>
  );
};

export { NewPostProvider, NewPostContext };
