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
      // } else {
    }
    handleChatQAResponses();
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

  const symptoms = `Provide remedy to symptoms: ${mySymptoms}`;

  const voice = value ? value : mySymptoms ? mySymptoms : transcription;

  const handleClick = () => {
    if (pathname === '/') {
      navigate(`/details/${Ref}`, {
        state: { data: Ref, mySymptoms: symptoms },
      });
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
    setTimeout(() => {
      handleChatQAResponses();
    }, 3000);
  };

  useEffect(() => {
    if (Ref !== null && Ref === reference_no) {
      handleMessageSend();
      handleChatQAResponses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebSocketConnected]);

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
        <button
          disabled={voice ? false : true}
          type='submit'
          onClick={handleClick}
          className={styles.inputValueZero}
        >
          <img src={sendIcon} alt='send icon' />
        </button>
      </div>
      <Content cn={styles.adviceNote}>
        Information may be inaccurate. It is important you see a medical doctor
        to get prescription and advice.
      </Content>
    </div>
  );
};

export default Chat;
