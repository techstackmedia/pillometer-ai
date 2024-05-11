import { useContext } from 'react';
import Button from '../../shared/Button';
import styles from './index.module.css';
import { WebSocketContext } from '../../../context/Chat/Service';
import { MessagesContext } from '../../../context/Messages';
import { AuthProfileContext } from '../../../context/Auth/Profile';

const SymptomButton = () => {
  const { handleViewMoreClick, viewMore } = useContext(WebSocketContext);
  const { handleClick } = useContext(MessagesContext);
  const { profileResponse } = useContext(AuthProfileContext);
  const userType = profileResponse?.user_type;

  return (
    <>
      {viewMore ? (
        <Button cn={styles.diagnoseButton} navigatePage={handleClick}>
          Diagnose
        </Button>
      ) : (
        <Button cn={styles.symptomsButton} navigatePage={handleViewMoreClick}>
          {userType === 'health_consultant' ? null : 'View all symptoms'}
        </Button>
      )}
    </>
  );
};

export default SymptomButton;
