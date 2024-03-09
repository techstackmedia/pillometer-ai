import Content from '../shared/Content';
import userProfileImage from '../../images/userProgileImage.png';
import editPenIcon from '../../images/editPen.png';
import styles from './index.module.css';
import copyIcon from '../../images/copy.png';
import reloadIcon from '../../images/reload.png';
import thumbUp from '../../images/thumbUp.png';
import thumbDown from '../../images/thumbDown.png';
import logo from '../../logo.svg';
import { useLocation } from 'react-router-dom';

const ChatResponse = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.chatResponse}>
      <div className={styles.userQuestion}>
        <img src={userProfileImage} alt='user profile' />
        <div cn={styles.questionHeading}>
          <Content cn={`heading ${styles.question}`}>
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
              <span className={styles.editIconText}>Edit</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.userQuestion}>
        <img src={logo} alt='user profile' className={styles.userProfileImag} />
        <div className={styles.chatResponseCol}>
          <Content cn={`paragraph ${styles.chatResponseParagraph}`}>
            I'm sorry to hear that you're not feeling well. It sounds like you
            might have a cold or a respiratory infection. It's important to
            rest, stay hydrated, and consider reaching out to a healthcare
            professional for advice, especially if your symptoms worsen or
            persist.
          </Content>
          {pathname !== '/community' ? (
            <div className={styles.qaIcons}>
              <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
              <img src={reloadIcon} alt='copy icon' width={20} height={20} />{' '}
              <img src={thumbUp} alt='copy icon' width={20} height={20} />{' '}
              <img src={thumbDown} alt='copy icon' width={20} height={20} />
            </div>
          ) : (
            <div className={styles.copyButton}>
              <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
              <span>Copy</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatResponse;
