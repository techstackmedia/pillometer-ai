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
            type={valueLength > 0 ? 'textarea' : 'text'}
            placeholder='Ask anything relating to your health'
            sx={{
              width: '100%',
              textIndent: valueLength > 0 ? 0 : 48,
              paddingInline: valueLength > 0 ? 10 : null,
              height: valueLength > 0 ? 'auto' : 32,
              resize: 'none',
              overflowY: 'hidden',
              maxHeight: 360.532,
            }}
            name='chatbox'
            value={value}
            onChange={handleChange}
            autofocus
          />
          {valueLength > 0 ? null : (
            <label>
              <img
                src={searchIcon}
                style={{ position: 'absolute', top: 31, left: 13 }}
                alt='search icon'
              />
            </label>
          )}
          {valueLength > 0 ? null : (
            <img
              style={{
                position: 'absolute',
                top: 31,
                right: 13,
                cursor: 'pointer',
              }}
              title='Click for voice note option'
              src={micIcon}
              alt='mic icon'
            />
          )}
        </div>
        <button
          type='submit'
          style={{
            backgroundColor: value.length > 0 ? '#4C70D6' : '#C5C4D4',
            height: valueLength > 0 ? 45 : 63.3,
            width: '72px',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: valueLength > 0 ? 'absolute' : 'initial',
            right: valueLength > 0 ? 235 : null,
            bottom: valueLength > 0 ? 82 : null,
            cursor: valueLength > 0 ? 'pointer' : 'default',
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
