import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';
import { NewPostContext } from '../Chat/NewPost';

const ChatDetailContext = createContext();

const ChatDetailProvider = ({ children }) => {
  const { newPostData } = useContext(WebSocketContext);
  const { Ref } = useContext(NewPostContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname, state } = useLocation();
  const referenceNo = newPostData?.reference_no;
  const { reference_no } = useParams();
  const [serverError, setServerError] = useState(null);
  const [chat, setChat] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const chatId = chat?.results[0]?.reference_no;
  const idx = Ref ?? referenceNo ?? state?.data?.reference_no ?? reference_no;
  const path = pathname.split('/');
  const navigate = useNavigate();
  const [isSendingMessage, setIsSendingMessage] = useState(false);


  useEffect(() => {
    if (token) {
      handleChatList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleChatList = async () => {
    try {
      if (path.includes('details')) {
        const response = await fetch(BASE_CHAT_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setChat(data);
          if (data?.count === 0 && !redirectToDetails) {
            setRedirectToDetails(true);
            handleChatList();
            return;
          }
        }
      }
    } catch (e) {
      setServerError(e.message);
      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };

  const handleChatQAResponses = async () => {
    setIsSendingMessage(true);
    let endpoint = '';
    if (idx) {
      endpoint = `${BASE_CHAT_URL}/${idx}/messages`;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setChats(data);
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
    } finally {
      setIsSendingMessage(false)
    }
  };

  useEffect(() => {
      handleChatQAResponses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const values = {
    handleChatQAResponses,
    chats,
    error,
    err,
    serverError,
    handleChatList,
    redirectToDetails,
    chat,
    chatId,
    isSendingMessage,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
