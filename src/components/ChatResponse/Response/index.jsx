import Content from '../../shared/Content';
import styles from './index.module.css';
import logo from '../../../logo.svg';
import CopyIcon from '../CopyIcon';
import { useLocation } from 'react-router-dom';
import QAIcon from '../QAIcon';
const Response = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.chatResponse}>
      <img src={logo} alt='user profile' className={styles.userProfileImage} />
      <div className={styles.chatResponseCol}>
        <Content cn={`paragraph ${styles.chatResponseParagraph}`}>
          I'm sorry to hear that you're not feeling well. It sounds like you
          might have a cold or a respiratory infection. It's important to rest,
          stay hydrated, and consider reaching out to a healthcare professional
          for advice, especially if your symptoms worsen or persist.
        </Content>
        {pathname !== '/community' ? <QAIcon /> : <CopyIcon />}
      </div>
    </div>
  );
};

export default Response;
