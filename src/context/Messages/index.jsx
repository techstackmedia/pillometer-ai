import { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../Chat/Service';
import { useLocation, useParams } from 'react-router-dom';
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
  } = useContext(WebSocketContext);
  const { handleChatQAResponses, chats } = useContext(ChatDetailContext);
  const { sendNewPost, createNewPost, Ref } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const {pathname} = useLocation()
  const paths = pathname.split('/');
  const referenceNo = Ref ?? reference_no ?? paths[2];
  const handleMessageSend = async () => {
    if (isWebSocketConnected && referenceNo) {
      sendMessageToServer(value);
    }
    handleChatQAResponses(referenceNo);
  };

  useEffect(() => {
    if (chats?.count === 0) {
      sendNewPost(value)
      handleChatQAResponses(referenceNo);
    }
  }, [chats?.count, value, referenceNo, sendNewPost, handleChatQAResponses])

  const handleClick = async () => {
    try {
      if (!token) {
        setIsLoginModal(true);
        return;
      }
      
      if (referenceNo === undefined || pathname === '/') {
        await createNewPost();
      }

      if (!isWebSocketConnected) {
        if (value.trim()) {
          await sendNewPost(value);
        }
      } else {
        await connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
        if (value.trim()) {
          await handleMessageSend();
        }
        isSent && window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
          bottom: 0,
        });
        await handleChatQAResponses(referenceNo);
      }
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  }
  const values = { handleClick, isloginModal, setIsLoginModal };
  return (
    <MessagesContext.Provider value={values}>
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesProvider, MessagesContext };
