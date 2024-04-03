import { useContext } from 'react';
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
  const { chats, chatResponses } = useContext(ChatDetailContext);
  const { uniqueArray } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <>
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
                <ChatResponse key={chat?.id} item={chat || uniqueArray} />
              ))}
          </div>
          {pathname === '/community' ? null : <Chat />}
        </main>
      )}
    </>
  );
};

export default ChatResponseList;
