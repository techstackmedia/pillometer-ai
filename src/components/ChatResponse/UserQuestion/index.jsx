import Content from '../../shared/Content';
import styles from './index.module.css';
import userProfileImage from '../../../images/userProgileImage.png';
import editPenIcon from '../../../images/editPen.png';
import { useLocation } from 'react-router-dom';

const UserQuestion = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.userQuestion}>
      <img src={userProfileImage} alt='user profile' />
      <div cn={styles.questionHeading}>
        <Content cn={`heading ${styles.question}`}>
          I am experiencing cough, sore throat and runny nose.
        </Content>
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
