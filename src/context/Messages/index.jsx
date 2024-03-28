import { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../Chat/Service';
import { useLocation, useParams } from 'react-router-dom';
import { ChatDetailContext } from '../ChatDetail';
import { NewPostContext } from '../Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const {
    sendMessageToServer,
    isWebSocketConnected,
    connectWebSocket,
    value,
    isSent
  } = useContext(WebSocketContext);
  const { handleChatQAResponses, chats } = useContext(ChatDetailContext);
  const { sendNewPost, createNewPost, Ref } = useContext(NewPostContext);
  const { pathname } = useLocation();
  const { reference_no } = useParams();
  const referenceNo = Ref || reference_no || (pathname.split('/')[2]);

  useEffect(() => {
    if (chats?.count === 0 && referenceNo) {
      sendNewPost(value);
      handleChatQAResponses(referenceNo);
    }
  }, [referenceNo, value, chats?.count, sendNewPost, handleChatQAResponses]);

  const handleClick = async () => {
    try {
      if (!token) {
        setIsLoginModalOpen(true);
        return;
      }

      if (pathname === '/') {
        await createNewPost();
      }

      if (!isWebSocketConnected) {
        if (value.trim()) {
          await sendNewPost(value);
        }
      } else {
        await connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
        if (value.trim()) {
          await sendMessageToServer(value);
        }
        isSent && window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        await handleChatQAResponses(referenceNo);
      }
    } catch (error) {
      console.error('Error in handleClick:', error);
      // Handle error or show user-friendly message
    }
  };

  const contextValues = { handleClick, isLoginModalOpen, setIsLoginModalOpen };

  return (
    <MessagesContext.Provider value={contextValues}>
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesProvider, MessagesContext };
