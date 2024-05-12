import { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../Chat/Service';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ChatDetailContext } from '../ChatDetail';
import { NewPostContext } from '../Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';
import { defaultMessagesValues } from '../defaultValues';

const MessagesContext = createContext(defaultMessagesValues);

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
  const { handleChatQAResponses, chats } = useContext(ChatDetailContext);
  const { createNewPost, sendNewPost } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDetailPage = pathname.startsWith('/details');
  const referenceNo =
    newPostData?.reference_no ?? reference_no ?? pathname.split('/')[2];
  const [isHome, setIsHome] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/details')) {
      if (uniqueArray?.length > 0 && !messageSent) {
        sendMessageToServer(value);
        setMessageSent(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isButtonClicked && chats?.count === 0 && pathname === '/') {
      handleClick();
    }

    if (
      pathname.startsWith('/details') &&
      chats?.count === 0 &&
      isWebSocketConnected
    ) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats?.count, isWebSocketConnected, referenceNo]);

  const smoothScrollToLastDiv = () => {
    const divs = document.querySelectorAll('div[id]');

    const lastDiv = divs[divs.length - 1];

    lastDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShortcutSendMessage = (event) => {
    if (event.shiftKey && event.key === 'Enter') {
      handleClick();
    }
  };

  const handleShortcutCloseModal = (event) => {
    if (event.key === 'Escape') {
      setIsLoginModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutCloseModal);
    return () => {
      document.removeEventListener('keydown', handleShortcutCloseModal);
    };
  }, []);

  const handleClick = () => {
    setIsButtonClicked(true);
    smoothScrollToLastDiv();
    try {
      if (!token || token === null) {
        setIsLoginModal(true);
        return;
      }

      if (pathname === '/' && isHome) {
        createNewPost();
      }

      if (!isWebSocketConnected) {
        sendNewPost(value);
      }

      if (pathname.startsWith('/details')) {
        connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
      }

      if (referenceNo && value !== '') {
        sendMessageToServer(value);
      }

      if (isDetailPage && referenceNo) {
        connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
        navigate(`/details/${referenceNo}`);
      }
      isSent &&  handleChatQAResponses() &&
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      // setValue('');
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutSendMessage);
    return () => {
      document.removeEventListener('keydown', handleShortcutSendMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = { handleClick, isloginModal, setIsLoginModal };
  return (
    <MessagesContext.Provider value={values}>
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesProvider, MessagesContext };
