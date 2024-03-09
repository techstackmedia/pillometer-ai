import Button from '../../shared/Button';
import styles from './index.module.css';

const SymptomButton = ({ viewMore, handleViewMoreClick }) => {
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
