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
    isWebSocketConnected,
    connectWebSocket,
    isSent,
    newPostData,
  } = useContext(WebSocketContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { createNewPost, Ref } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const referenceNo =
    newPostData?.reference_no ?? Ref ?? reference_no ?? paths[2];
  const navigate = useNavigate();
  const handleMessageSend = async () => {
    if (isWebSocketConnected && referenceNo) {
      await sendMessageToServer(value);
    }
    await handleChatQAResponses(referenceNo);
  };

  useEffect(() => {
    if (referenceNo) {
      // sendNewPost(value)
      connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
      handleMessageSend();
      navigate(`/details/${referenceNo}`);
      handleChatQAResponses(referenceNo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    try {
      if (!token) {
        setIsLoginModal(true);
        return;
      }

      if (referenceNo === undefined || pathname === '/') {
        await createNewPost();
      }

      if (referenceNo) {
        connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
      }

      if (!isWebSocketConnected) {
        // if (value.trim()) {
        //   await sendNewPost(value);
        // }
      } else {
        await connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
        if (value.trim()) {
          await handleMessageSend();
        }
        isSent &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
            bottom: 0,
          });
        await handleChatQAResponses(referenceNo);
      }
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
