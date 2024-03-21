import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatResponse from '../ChatResponse';
import Chat from '../Chat';
import styles from './index.module.css';
import { ChatDetailContext } from '../../context/ChatDetail';
import { WebSocketContext } from '../../context/Chat/Service';
// import Button from '../shared/Button';
// import Content from '../shared/Content';

const ChatResponseList = () => {
  const { chats, chatResponses, refreshKey } = useContext(ChatDetailContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { isSent } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  // const handleClick = () => {
  //   handleChatQAResponses();
  // };
  console.log(chats);

  useEffect(() => {
    isSent &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        bottom: 0,
      });
  }, [isSent, handleChatQAResponses, refreshKey]);

  return (
    <>
      {/* {!chats ? (
        <div className={styles.refresh}>
          <Content cn='heading'>Start Conversation</Content>
          <Button navigateToNextPage={handleClick}>Open chat</Button>
        </div>
      ) : ( */}
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
      {/* )} */}
    </>
  );
};

export default ChatResponseList;
