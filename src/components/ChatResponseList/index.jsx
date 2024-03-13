import { useLocation } from 'react-router-dom';
import Chat from '../Chat';
import ChatResponse from '../ChatResponse';
import styles from './index.module.css';

const ChatResponseList = ({ setViewMore }) => {
  const { pathname } = useLocation();
  return (
    <main className={styles.main}>
      <div
        className={`Detail ${
          pathname === '/community'
            ? styles.responseDetailCommunity
            : styles.responseDetailNonCommunity
        }`}
      >
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
        <ChatResponse />
      </div>
      {/* {pathname === '/community' ? null : <Chat />} */}
      <Chat setViewMore={setViewMore} />
    </main>
  );
};

export default ChatResponseList;
