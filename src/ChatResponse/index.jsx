import Content from '../components/shared/Content';
import userProfileImage from '../images/userProgileImage.png';
import editPenIcon from '../images/editPen.png';
import styles from './index.module.css';
import copyIcon from '../images/copy.png';
import reloadIcon from '../images/reload.png';
import thumbUp from '../images/thumbUp.png';
import thumbDown from '../images/thumbDown.png';
import logo from '../logo.svg';
import { useLocation } from 'react-router-dom';

const ChatResponse = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.chatResponse}>
      <div className={styles.userQuestion}>
        <img src={userProfileImage} alt='user profile' />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Content
            cn='heading'
            sx={{
              fontSize: 20,
              marginBlock: 0,
            }}
          >
            I am experiencing cough, sore throat and runny nose.
          </Content>
          {pathname !== '/community' ? (
            <div className={styles.editButton}>
              <img
                src={editPenIcon}
                alt='edit pen icon'
                width={12}
                height={12}
              />{' '}
              <span style={{ marginLeft: 5, fontSize: 14 }}>Edit</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.userQuestion} style={{ marginTop: 30 }}>
        <img
          src={logo}
          alt='user profile'
          style={{ border: '1px solid #DEE4F7', padding: 11 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Content
            cn='paragraph'
            sx={{
              fontSize: 16,
              marginBlock: 0,
            }}
          >
            I'm sorry to hear that you're not feeling well. It sounds like you
            might have a cold or a respiratory infection. It's important to
            rest, stay hydrated, and consider reaching out to a healthcare
            professional for advice, especially if your symptoms worsen or
            persist.
          </Content>
          {pathname !== '/community' ? (
            <div
              className='qaIcons'
              style={{ display: 'flex', gap: 15, marginBottom: 30 }}
            >
              <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
              <img src={reloadIcon} alt='copy icon' width={20} height={20} />{' '}
              <img src={thumbUp} alt='copy icon' width={20} height={20} />{' '}
              <img src={thumbDown} alt='copy icon' width={20} height={20} />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 30,
                cursor: 'pointer',
              }}
            >
              <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
              <span style={{ fontSize: 14 }}>Copy</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatResponse;
