import { useContext } from 'react';
import { useLocation, useNavigate /* , useParams */ } from 'react-router-dom';
import ChatResponse from '../ChatResponse';
import Chat from '../Chat';
import styles from './index.module.css';
import { ChatDetailContext } from '../../context/ChatDetail';
import Content from '../shared/Content';
import Button from '../shared/Button';
import { token } from '../../constants';
import LoadingBalls from '../LoadingBalls';

const ChatResponseList = () => {
  const { isSendingMessage, chats } = useContext(ChatDetailContext);
  // const { uniqueArray } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/auth/login');
  };
  // console.log(uniqueArray);

  const data = chats?.results

  return (
    <>
      {!token ? (
        <div className={styles.refresh}>
          <Content cn='heading'>Login to commence conversation</Content>
          <Button navigatePage={navigateToLogin}>Log in</Button>
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
            {data?.map((chat) => {
              return (
                <ChatResponse
                  key={`${chat?.id}${chat?.reference_no}`}
                  item={chat}
                />
              );
            })}
          </div>
          {pathname === '/community' ? null : <Chat />}
        </main>
      )}
      {isSendingMessage && <LoadingBalls />}
    </>
  );
};

export default ChatResponseList;
