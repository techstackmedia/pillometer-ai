import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';

const ChatDetailContext = createContext();

const ChatDetailProvider = ({ children }) => {
  const { newPostData } = useContext(WebSocketContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const id = path[path.length - 1];

  const { reference_no } = useParams();

  const handleChatQAResponses = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_CHAT_URL}/${id ?? reference_no}/messages`,
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
        setChats(data);
        if (data.results.length === 0) {
          window.location.reload();
        }
        // refreshComponent();
      } else {
        setErr(data?.details);
        setTimeout(() => {
          setErr(null);
        }, 3000);
      }
    } catch (e) {
      setError(e.message);
    }
  }, [id, reference_no]);

  useEffect(() => {
    if (newPostData) {
      handleChatQAResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChatQAResponses, newPostData]);
  const chatResponses = chats?.results;

  const values = {
    handleChatQAResponses,
    chats,
    chatResponses,
    error,
    err,
    // refreshKey,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
