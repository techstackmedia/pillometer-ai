import Content from '../../shared/Content';
import styles from './index.module.css';
import logo from '../../../logo.svg';
import CopyIcon from '../CopyIcon';
import { useLocation } from 'react-router-dom';
import QAIcon from '../QAIcon';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';
const Response = () => {
  const { pathname } = useLocation();
  const { response } = useContext(WebSocketContext);

  return (
    <div className={styles.chatResponse}>
      <img src={logo} alt='user profile' className={styles.userProfileImage} />
      <div className={styles.chatResponseCol}>
        <Content cn={`paragraph ${styles.chatResponseParagraph}`}>
          {response}
        </Content>
        {pathname !== '/community' ? <QAIcon /> : <CopyIcon />}
      </div>
    </div>
  );
};

export default Response;
