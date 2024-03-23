import { useContext, useEffect } from 'react';
import Input from '../shared/Input';
import micIcon from '../../images/mic.png';
import sendIcon from '../../images/send.png';
import { WebSocketContext } from '../../context/Chat/Service';
import styles from './index.module.css';
import Content from '../shared/Content';
import unmuteMic from '../../images/unmutemic.png';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChatDetailContext } from '../../context/ChatDetail';
import Button from '../shared/Button';

const Chat = () => {
  const {
    sendMessageToServer,
    startListening,
    stopListening,
    listening,
    handleChange,
    value,
    transcript,
    setValue,
    transcription,
    handleNewPostCreation,
    isWebSocketConnected,
    connectWebSocket,
    mySymptoms,
    isSent,
    height,
    newPostData,
  } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { sendNewPost, createNewPost, Ref } = useContext(NewPostContext);
  const { reference_no } = useParams();
  const navigate = useNavigate();

  const handleMessageSend = async () => {
    if (isWebSocketConnected && reference_no) {
      connectWebSocket(`${WSS_CHAT_URL}${reference_no}`, token);
      sendMessageToServer(value);
    }
    if (pathname !== '/') {
      handleChatQAResponses(reference_no);
    }
  };

  const handleMicClick = (e) => {
    if (listening) {
      stopListening();
      setValue(transcript);
      setValue(e.target.value);
    } else {
      startListening();
    }
  };

  const voice = value ? value : mySymptoms ? mySymptoms : transcription;

  useEffect(() => {
    if (newPostData) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSent]);

  const handleClick = () => {
    if (pathname === '/') {
      if (Ref !== null) {
        navigate(`/details/${Ref}`, {
          state: { data: Ref, mySymptoms },
        });
      }

      createNewPost();
    }
    if (!isWebSocketConnected) {
      connectWebSocket(`${WSS_CHAT_URL}${reference_no}`, token);
    }
    isWebSocketConnected ? handleNewPostCreation() : sendNewPost(value);
    handleMessageSend();

    isSent &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        bottom: 0,
      });
    if (pathname !== '/') {
      handleChatQAResponses(reference_no);
    }
  };

  useEffect(() => {
    if (Ref !== null && Ref === reference_no) {
      if (pathname !== '/') {
        handleChatQAResponses(reference_no);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebSocketConnected, isSent]);

  return (
    <div className={styles.input}>
      <div className={styles.inputContainer}>
        <div className={styles.inputPosition}>
          <Input
            type='textarea'
            placeholder={
              value?.length > 0 ? '' : 'Ask anything relating to your health'
            }
            sx={{
              resize: 'none',
              overflowY: 'hidden',
              height: height ? height : '',
              opacity: 0.5,
            }}
            name='chatbox-text-to-speech'
            value={voice}
            onChange={handleChange}
            autoFocus
          />
          <img
            className={`${styles.icon} ${styles.micIcon}`}
            title={
              listening ? 'Click to stop voice input' : 'Click for voice input'
            }
            src={listening ? unmuteMic : micIcon}
            alt={listening ? 'search icon' : 'mic icon'}
            onClick={handleMicClick}
          />
        </div>
        <Button
          disabled={voice ? false : true}
          type='submit'
          navigateToNextPage={handleClick}
          cn={styles.inputValueZero}
        >
          <img src={sendIcon} alt='send icon' />
        </Button>
      </div>
      <Content cn={styles.adviceNote}>
        Information may be inaccurate. It is important you see a medical doctor
        to get prescription and advice.
      </Content>
    </div>
  );
};

export default Chat;
