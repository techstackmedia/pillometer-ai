import { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../Chat/Service';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ChatDetailContext } from '../ChatDetail';
import { NewPostContext } from '../Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [isloginModal, setIsLoginModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const {
    sendMessageToServer,
    value,
    connectWebSocket,
    isSent,
    newPostData,
    uniqueArray,
  } = useContext(WebSocketContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { createNewPost, sendNewPost } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDetailPage = pathname.startsWith('/details');
  const referenceNo =
    newPostData?.reference_no ?? reference_no ?? pathname.split('/')[2];

  useEffect(() => {
    if (uniqueArray && pathname === '/' && referenceNo) {
      navigate(`/details/${referenceNo}`);
      handleChatQAResponses(referenceNo);
      isSent &&
        window.scrollTo({
          behavior: 'smooth',
          bottom: 0,
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/details')) {
      handleChatQAResponses(referenceNo);
      if (uniqueArray?.length > 0 && !messageSent) {
        sendMessageToServer(value);
        setMessageSent(true);
        handleChatQAResponses(referenceNo);
      }
      isSent &&
        window.scrollTo({
          behavior: 'smooth',
          bottom: 0,
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessageToServer, messageSent]);

  // useEffect(() => {
  //   localStorage.setItem('message', value);
  // }, [value]);

  // const message = localStorage.getItem('message');

  // useEffect(() => {
  //   if (chats?.results?.length > 2) {
  //     localStorage.removeItem('message');
  //   }
  // }, [chats?.results?.length]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (chats?.results?.length === 0) {
  //       navigate(`/details/${referenceNo}`);
  //       sendMessageToServer(message);
  //     }
  //   }, 3000);

  //   return () => clearTimeout(timeoutId);
  // }, [chats?.results?.length, navigate, referenceNo, sendMessageToServer, message]);

  const handleClick = async () => {
    try {
      if (!token) {
        setIsLoginModal(true);
        return;
      }

      if (pathname === '/') {
        await createNewPost();
      }

      // if (!isWebSocketConnected) {
      //   connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
        // sendNewPost(value);
      // }

      if (pathname.startsWith('/details')) {
        connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
      }

      if (referenceNo) {
        await sendMessageToServer(value);
        handleChatQAResponses(referenceNo);
      }

      if (isDetailPage && referenceNo) {
        connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
        navigate(`/details/${referenceNo}`);
      }
      handleChatQAResponses(referenceNo);
      isSent &&
        window.scrollTo({
          behavior: 'smooth',
          bottom: 0,
        });
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };

  const values = { handleClick, isloginModal, setIsLoginModal };
  return (
    <MessagesContext.Provider value={values}>
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesProvider, MessagesContext };
