import { useContext } from 'react';
import UserQuestion from './UserQuestion';
import Response from './Response';
import { WebSocketContext } from '../../context/Chat/Service';
import Alert from '../shared/Alert';
import styles from './index.module.css';
import { ChatDetailContext } from '../../context/ChatDetail';

const ChatResponse = ({ item }) => {
  const { connectionErrorMessage, connectionMessage, connectionWarnMessage } =
    useContext(WebSocketContext);
  const { err } = useContext(ChatDetailContext);

  return (
    <>
      {connectionErrorMessage && (
        <div className={styles.homeAlert}>
          <Alert>{connectionErrorMessage}</Alert>
        </div>
      )}

      {connectionMessage && (
        <div className={styles.homeAlert}>
          <Alert>{connectionMessage}</Alert>
        </div>
      )}

      {connectionWarnMessage && (
        <div className={styles.homeAlert}>
          <Alert>{connectionWarnMessage}</Alert>
        </div>
      )}

      {err && (
        <div className={styles.homeAlert}>
          <Alert>
            Server Error! Please{' '}
            <a href={window.location.href}>try again later.</a>
          </Alert>
        </div>
      )}

      {item.isUser ? (
        <UserQuestion message={item.message} />
      ) : (
        <Response message={item.message} />
      )}
    </>
  );
};

export default ChatResponse;
