import Content from '../../shared/Content';
import styles from './index.module.css';
import userProfileImage from '../../../images/personProfileImage.png';
import editPenIcon from '../../../images/editPen.png';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';

const UserQuestion = () => {
  const { pathname } = useLocation();
  const { value } = useContext(WebSocketContext);

  return (
    <div className={styles.userQuestion}>
      <img src={userProfileImage} alt='user profile' />
      <div cn={styles.questionHeading}>
        <Content cn={`heading ${styles.question}`}>{value}</Content>
        {pathname !== '/community' ? (
          <div className={styles.editButton}>
            <img src={editPenIcon} alt='edit pen icon' width={12} height={12} />{' '}
            <span className={styles.editIconText}>Edit</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserQuestion;
