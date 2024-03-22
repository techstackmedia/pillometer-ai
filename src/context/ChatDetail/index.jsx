import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';
import { NewPostContext } from '../Chat/NewPost';

const ChatDetailContext = createContext();

const ChatDetailProvider = ({ children }) => {
  const { newPostData } = useContext(WebSocketContext);
  const { res, Ref } = useContext(NewPostContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const [refreshKey, setRefreshKey] = useState(0);
  const referenceNo = newPostData?.reference_no;
  const navigate = useNavigate();
  console.log(path[2], referenceNo, Ref);

  const handleChatQAResponses = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_CHAT_URL}/${path[2] ?? Ref ?? referenceNo}/messages`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate(`/details/${path[2]}/`);
        setChats(data);
        if (res && data?.results?.length === 0) {
          window.location.href = `/details/${path[2]}/`;
        }
        // if (data?.results.length === 0) {
        //   setTimeout(() => {
        //     window.location.href = `/details/${path[2]}/`;
        //   // }, 2000);
        // }
        // if (data?.results.length === 0) {
        //   setInterval(() => {
        //     handleChatQAResponses();
        //   }, 2000);
        // }
      } else {
        setErr(data?.details);
        setTimeout(() => {
          setErr(null);
        }, 3000);
      }
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, path, referenceNo]);

  useEffect(() => {
    if (newPostData) {
      handleChatQAResponses();
    }
  }, [handleChatQAResponses, newPostData]);
  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const chatResponses = chats?.results;

  const values = {
    handleChatQAResponses,
    chats,
    chatResponses,
    error,
    err,
    refreshComponent,
    refreshKey,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
