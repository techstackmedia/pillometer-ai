import { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../Chat/Service';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ChatDetailContext } from '../ChatDetail';
import { NewPostContext } from '../Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [isloginModal, setIsLoginModal] = useState(false);
  const {
    sendMessageToServer,
    value,
    connectWebSocket,
    isSent,
    newPostData,
    uniqueArray,
    isWebSocketConnected,
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
  }, [
    handleChatQAResponses,
    isSent,
    navigate,
    pathname,
    referenceNo,
    uniqueArray,
  ]);

  useEffect(() => {
    if (pathname.startsWith('/details')) {
      handleChatQAResponses(referenceNo);
      if (uniqueArray?.length >= 0 && uniqueArray?.length <= 0) {
        sendMessageToServer(value)
        handleChatQAResponses(referenceNo);
      }
      isSent &&
        window.scrollTo({
          behavior: 'smooth',
          bottom: 0,
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSent, pathname, referenceNo, uniqueArray?.length, sendMessageToServer]);

  const handleClick = async () => {
    try {
      if (!token) {
        setIsLoginModal(true);
        return;
      }

      if (pathname === '/' && !isWebSocketConnected) {
        await createNewPost();
      }

      if (!isWebSocketConnected) {
        sendNewPost(value);
      }

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
          top: document.documentElement.scrollHeight,
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
