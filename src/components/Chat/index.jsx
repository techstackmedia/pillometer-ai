import React, { useContext } from 'react';
import Input from '../shared/Input';
import micIcon from '../../images/mic.png';
import sendIcon from '../../images/send.png';
import { WebSocketContext } from '../../context/Chat/Service';
import styles from './index.module.css';
import Content from '../shared/Content';
import unmuteMic from '../../images/unmutemic.png';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WSS_CHAT_URL, token } from '../../constants';
import { useLocation, useParams } from 'react-router-dom';
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
  } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { sendNewPost, createNewPost, Ref } = useContext(NewPostContext);
  const { reference_no } = useParams();

  const handleMessageSend = () => {
    if (isWebSocketConnected) {
      sendMessageToServer(value);
    } else {
      connectWebSocket(`${WSS_CHAT_URL}${reference_no}`, token);
      setTimeout(() => {
        sendMessageToServer(value);
      }, 1000);
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

  const voice = value
    ? value
    : mySymptoms
    ? `Provide remedy to symptoms: ${mySymptoms}`
    : transcription;
  console.log(Ref);

  const handleClick = () => {
    handleMessageSend();
    handleNewPostCreation();
    if (pathname === '/') {
      createNewPost();
      if (Ref) {
        window.location.href = `/details/${Ref}`;
      }
    }
    sendNewPost(value);
  };

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
              maxHeight: 351,
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
