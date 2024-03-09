import Input from '../shared/Input';
import searchIcon from '../../images/search.png';
import micIcon from '../../images/mic.png';
import sendIcon from '../../images/send.png';
import { useEffect, useState } from 'react';
import Content from '../shared/Content';
import styles from './index.module.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const Chat = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(32);
  const { transcript, listening, browserSupportsContinuousListening } =
    useSpeechRecognition();

  const valueLength = value.length;

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    setValue(transcript);
    setHeight(351);
  }, [transcript, listening]);

  const startListening = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: true });
      console.log('hello');
    } else {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  };

  const stopListening = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.abortListening();
    } else {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  };

  return (
    <div className={styles.input}>
      <div className={styles.inputContainer}>
        <div className={styles.inputPosition}>
          {transcript.length > 0 ? (
            <Input
              type={valueLength > 0 ? 'textarea' : 'text'}
              placeholder='Ask anything relating to your health'
              sx={{
                width: '100%',
                textIndent: valueLength > 0 ? 0 : 48,
                paddingInline: valueLength > 0 ? 10 : null,
                height: valueLength > 0 ? height : 32,
                resize: 'none',
                overflowY: 'hidden',
                maxHeight: 351,
              }}
              name='chatbox-text-only'
              value={value}
              listening={listening}
              stopListening={stopListening}
              startListening={startListening}
              onChange={handleChange}
              autoFocus
            />
          ) : (
            <Input
              type={valueLength > 0 ? 'textarea' : 'text'}
              placeholder='Ask anything relating to your health'
              sx={{
                width: '100%',
                textIndent: valueLength > 0 ? 0 : 48,
                paddingInline: valueLength > 0 ? 10 : null,
                height: valueLength > 0 ? 'auto' : 32,
                resize: 'none',
                overflowY: 'hidden',
                maxHeight: 351,
                // opacity: 0.5,
              }}
              name='chatbox-text-to-speech'
              value={value}
              onChange={handleChange}
              autoFocus
            />
          )}
          {valueLength > 0 ? null : (
            <label>
              <img
                className={`${styles.icon} ${styles.searchIcon}`}
                src={searchIcon}
                alt='search icon'
              />
            </label>
          )}
          {valueLength > 0 ? null : (
            <img
              className={`${styles.icon} ${styles.micIcon}`}
              title='Click for voice note option'
              src={micIcon}
              alt='mic icon'
              onClick={startListening}
            />
          )}
        </div>
        <button
          type='submit'
          className={
            valueLength > 0 ? styles.inputValueNoneZero : styles.inputValueZero
          }
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
