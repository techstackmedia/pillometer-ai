import Chat from '../Chat';
import ChatResponse from '../ChatResponse';
import styles from './index.module.css';

const ChatResponseList = () => {
  return (
    <main className={styles.main}>
      <div className='Detail'>
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
