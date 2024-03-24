import { createContext, useContext } from 'react';
import { WebSocketContext } from '../Chat/Service';
import { useLocation, useParams } from 'react-router-dom';
import { ChatDetailContext } from '../ChatDetail';
import { NewPostContext } from '../Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';

const MessagesContext = createContext();
const MessagesProvider = ({ children }) => {
  const {
    sendMessageToServer,
    value,
    handleNewPostCreation,
    isWebSocketConnected,
    connectWebSocket,
    isSent,
  } = useContext(WebSocketContext);
  const { pathname, state } = useLocation();
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { sendNewPost, createNewPost } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const referenceNo = reference_no ?? state?.data?.reference_no;
  const handleMessageSend = async () => {
    if (isWebSocketConnected && referenceNo) {
      connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
      sendMessageToServer(value);
    }
    handleChatQAResponses(referenceNo);
  };

  const handleClick = () => {
    if (!isWebSocketConnected && pathname !== '/') {
      sendNewPost(value);
    } else {
      if (pathname === '/') {
        createNewPost();
      }
      if (!isWebSocketConnected) {
        connectWebSocket(`${WSS_CHAT_URL}${referenceNo}`, token);
      }
      isWebSocketConnected ? handleNewPostCreation() : sendNewPost(value);
      handleMessageSend();
      isSent &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
          bottom: 0,
        });
      handleChatQAResponses(referenceNo);
    }
  };
  const values = { handleClick };
  return (
    <MessagesContext.Provider value={values}>
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesProvider, MessagesContext };
