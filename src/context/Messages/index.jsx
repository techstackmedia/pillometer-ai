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
    isWebSocketConnected
  } = useContext(WebSocketContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { createNewPost, sendNewPost } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDetailPage = pathname.startsWith('/details');
  const referenceNo =
    newPostData?.reference_no ?? reference_no ?? pathname.split('/')[2];
  console.log(referenceNo)

  useEffect(() => {
    if (uniqueArray && pathname === '/' && referenceNo) {
      navigate(`/details/${referenceNo}`);
      handleChatQAResponses(referenceNo);
    }
  }, [handleChatQAResponses, navigate, pathname, referenceNo, uniqueArray]);

  const handleClick = async () => {
    try {
      if (!token) {
        setIsLoginModal(true);
        return;
      }

      if (pathname === '/' && !isWebSocketConnected) {
        await createNewPost();
      }

      // if (!reference_no) {
      //   return;
      // }

      if (!isWebSocketConnected) {
        sendNewPost(value)
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
