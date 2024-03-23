import { useParams } from 'react-router-dom';
import ChatResponseList from '../../components/ChatResponseList';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useContext } from 'react';
import { NewPostContext } from '../../context/Chat/NewPost';
import styles from './index.module.css';
import Alert from '../../components/shared/Alert';

const ChatQADetail = () => {
  const { reference_no } = useParams();
  const { err, errorAltMessage } = useContext(NewPostContext);

  return (
    <>
      {errorAltMessage && (
        <div className={styles.homeAlert}>
          <Alert>{errorAltMessage}</Alert>
        </div>
      )}
      {err && (
        <div className={styles.pageAlert}>
          <Alert>
            Websocket closed. Please{' '}
            <a href={window.location.href}>try again</a>
          </Alert>
        </div>
      )}
      <Navbar />
      <div className='Main'>
        <Sidebar id={reference_no} />
        <div>
          <ChatResponseList id={reference_no} />
        </div>
      </div>
    </>
  );
};

export default ChatQADetail;
