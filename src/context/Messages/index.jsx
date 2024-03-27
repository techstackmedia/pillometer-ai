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
  const { state } = useLocation();
  const { handleChatQAResponses, chats } = useContext(ChatDetailContext);
  const { sendNewPost, createNewPost, Ref } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const {pathname} = useLocation()
  const referenceNo = reference_no ?? state?.data?.reference_no ?? Ref;
  const handleMessageSend = async () => {
    if (isWebSocketConnected && referenceNo) {
      sendMessageToServer(value);
    }
    handleChatQAResponses(referenceNo);
  };
  const paths = pathname.split('/');

  useEffect(() => {
    if (chats?.count === 0 && paths.includes('detail')) {
      sendNewPost(value)
      handleChatQAResponses(referenceNo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats?.count, value])

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
