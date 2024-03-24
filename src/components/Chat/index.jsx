import { useContext, useEffect } from 'react';
import Input from '../shared/Input';
import micIcon from '../../images/mic.png';
import sendIcon from '../../images/send.png';
import { WebSocketContext } from '../../context/Chat/Service';
import styles from './index.module.css';
import Content from '../shared/Content';
import unmuteMic from '../../images/unmutemic.png';
import { NewPostContext } from '../../context/Chat/NewPost';
import { useParams } from 'react-router-dom';
import { ChatDetailContext } from '../../context/ChatDetail';
import Button from '../shared/Button';
import { MessagesContext } from '../../context/Messages';

const Chat = () => {
  const {
    startListening,
    stopListening,
    listening,
    handleChange,
    value,
    transcript,
    setValue,
    transcription,
    mySymptoms,
    isSent,
    height,
    newPostData,
  } = useContext(WebSocketContext);
  const { handleClick } = useContext(MessagesContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { Ref } = useContext(NewPostContext);
  const { reference_no } = useParams();

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
    if (Ref !== null && Ref === reference_no) {
      handleChatQAResponses(reference_no);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSent, newPostData]);

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
              maxHeight: height ? height : '',
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
