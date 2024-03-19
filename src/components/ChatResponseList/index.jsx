import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ChatResponse from '../ChatResponse';
import Chat from '../Chat';
import styles from './index.module.css';
import { ChatDetailContext } from '../../context/ChatDetail';
import { WebSocketContext } from '../../context/Chat/Service';

const ChatResponseList = () => {
  const { chats, chatResponses } = useContext(ChatDetailContext);
  const { isSent } = useContext(WebSocketContext);
  const { pathname } = useLocation();

  isSent &&
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
      bottom: 0,
    });
  return (
    <main className={styles.main}>
      <div
        className={`Detail ${
          pathname === '/community'
            ? styles.responseDetailCommunity
            : styles.responseDetailNonCommunity
        }`}
      >
        {chats &&
          chatResponses?.map((chat) => (
            <ChatResponse key={chat?.id} item={chat} />
          ))}
      </div>
      {pathname === '/community' ? null : <Chat />}
    </main>
  );
};

export default ChatResponseList;
