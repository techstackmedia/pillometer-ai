import { useContext } from 'react';
import Button from '../../shared/Button';
import styles from './index.module.css';
import { WebSocketContext } from '../../../context/Chat/Service';

const SymptomButton = () => {
  const { handleViewMoreClick, viewMore } = useContext(WebSocketContext);
  return (
    <>
      {viewMore ? (
        <Button cn={styles.diagnoseButton}>Diagnose</Button>
      ) : (
        <Button
          cn={styles.symptomsButton}
          navigateToNextPage={handleViewMoreClick}
        >
          View all symptoms
        </Button>
      )}
    </>
  );
};

export default SymptomButton;
