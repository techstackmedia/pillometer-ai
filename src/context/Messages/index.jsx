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
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (uniqueArray && pathname === '/' && referenceNo) {
      navigate(`/details/${referenceNo}`);
      handleChatQAResponses(referenceNo);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessageToServer, messageSent]);

  const smoothScrollToLastDiv = () => {
    const divs = document.querySelectorAll('div[id]');

    const lastDiv = divs[divs.length - 1];

    lastDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = async () => {
    smoothScrollToLastDiv();
    try {
      if (!token) {
        setIsLoginModal(true);
        return;
      }

      if (pathname === '/' && isHome) {
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
          top: document.body.scrollHeight,
          behavior: 'smooth',
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
