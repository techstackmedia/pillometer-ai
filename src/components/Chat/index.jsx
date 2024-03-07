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

  return (
    <div className={styles.input} style={{ marginBottom: 30, width: '68%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <Input
            type='text'
            placeholder='Ask anything relating to your health'
            sx={{ width: '100%', textIndent: 48, height: 32 }}
            name='chatbox'
            value={value}
            onChange={handleChange}
          />
          <label>
            <img
              src={searchIcon}
              style={{ position: 'absolute', top: 31, left: 13 }}
              alt='search icon'
            />
          </label>
          <img
            src={micIcon}
            style={{ position: 'absolute', top: 31, right: 13 }}
            alt='mic icon'
          />
        </div>
        <button
          type='submit'
          style={{
            backgroundColor: value.length > 0 ? '#4C70D6' : '#C5C4D4',
            height: 65,
            width: '15%',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={sendIcon} alt='send icon' />
        </button>
      </div>
      <Content
        sx={{
          opacity: 0.5,
          textAlign: 'center',
          width: '68%',
          marginInline: 'auto',
        }}
      >
        Information may be inaccurate. It is important you see a medical doctor
        to get prescription and advice.
      </Content>
    </div>
  );
};

export default Chat;
