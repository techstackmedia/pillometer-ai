import { createContext, useContext, useState } from 'react';
import { BASE_CHAT_URL } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { token } from '../../../constants';
import { ChatDetailContext } from '../../ChatDetail';
import { AuthProfileContext } from '../../Auth/Profile';

const NewPostContext = createContext();

const NewPostProvider = ({ children }) => {
  const [refresh] = useState(false);
  const handleChatQAResponses = useContext(ChatDetailContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAltMessage, setAltErrorMessage] = useState(null);
  const [Ref, setRef] = useState(null);
  const [res, setRes] = useState(null);
  const { pathname, state } = useLocation();
  const [err, setErr] = useState();
  const [errDetail, setErrDetail] = useState(null);
  const path = pathname?.split('/');
  const reference_no = Ref ?? state?.data?.reference_no ?? path[2]
  const endpoint = `${BASE_CHAT_URL}/${reference_no}/predict`;
  const {profileResponse} = useContext(AuthProfileContext)
  const userType = profileResponse?.user_type
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
        navigate(`/details/${Ref}`, {
          state: { data: responseData },
        });
        handleChatQAResponses(Ref);
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
        if (refresh) {
          handleChatQAResponses(state?.data?.reference_no);
        }
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
