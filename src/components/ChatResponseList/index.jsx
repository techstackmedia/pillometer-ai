import { useLocation } from 'react-router-dom';
import Chat from '../Chat';
import ChatResponse from '../ChatResponse';
import styles from './index.module.css';

const ChatResponseList = () => {
  const { pathname } = useLocation();
  return (
    <main className={styles.main}>
      <div
        className='Detail'
        style={{ maxHeight: pathname === '/community' ? 'auto' : '75vh' }}
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
      <Chat />
    </main>
  );
};

export default ChatResponseList;
