import Content from '../../shared/Content';
import styles from './index.module.css';
import userProfileImage from '../../../images/personProfileImage.png';
import editPenIcon from '../../../images/editPen.png';
import { useLocation } from 'react-router-dom';

const UserQuestion = ({ message, id }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.userQuestion} id={id}>
      <img src={userProfileImage} alt='user profile' />
      <div className={styles.questionHeading}>
        <Content className={`heading ${styles.question}`}>
          <a href={`#${id}`} style={{border: 'none'}}>{message}</a>
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
