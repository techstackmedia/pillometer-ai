import Input from '../shared/Input';
import searchIcon from '../../images/search.png';
import micIcon from '../../images/mic.png';
import sendIcon from '../../images/send.png';
import { useState } from 'react';
import Content from '../shared/Content';
import styles from './index.module.css';

const Chat = () => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const valueLength = value.length;

  return (
    <div className={styles.input}>
      <div className={styles.inputContainer}>
        <div className={styles.inputPosition}>
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
            }}
            name='chatbox'
            value={value}
            onChange={handleChange}
            autofocus
          />
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
