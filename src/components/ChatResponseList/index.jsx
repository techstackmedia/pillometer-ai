import { useContext, useEffect } from 'react';
import { useLocation, useNavigate /* , useParams */ } from 'react-router-dom';
import ChatResponse from '../ChatResponse';
import Chat from '../Chat';
import styles from './index.module.css';
import { ChatDetailContext } from '../../context/ChatDetail';
import { WebSocketContext } from '../../context/Chat/Service';
import Content from '../shared/Content';
import Button from '../shared/Button';
import { token } from '../../constants';

const ChatResponseList = () => {
  const { chats, chatResponses, refreshKey } = useContext(ChatDetailContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { isSent } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    isSent &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        bottom: 0,
      });
  }, [isSent, handleChatQAResponses, refreshKey, pathname]);

  const navigateToLogin = () => {
    navigate('/auth/login');
  };
  // console.log(newResponse, chats);

  return (
    <>
      {/* {!newResponse ? (
        <div className={styles.refresh}>
          <Content cn='heading'>
            {!token ? 'Login to commence conversation' : 'Start Conversation'}
          </Content>
          <Button navigatePage={!token ? navigateToLogin : handleClick}>
            {!token ? 'Login' : 'Open chat'}
          </Button>
        </div>
      ) : ( */}
      {!token ? (
        <div className={styles.refresh}>
          <Content cn='heading'>Login to commence conversation</Content>
          <Button navigatePage={navigateToLogin}>Login</Button>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default ChatResponseList;
