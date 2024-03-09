import Button from '../shared/Button';
import styles from './index.module.css';

const OAuthorization = ({ isCurrentPage }) => {
  return isCurrentPage ? null : (
    <div className={styles.buttons}>
      <Button cn={styles.mediaImage}>Continue with Google</Button>
      <Button cn={`${styles.mediaImage} ${styles.buttonMg}`}>
        Continue with Facebook
      </Button>
      <Button cn={styles.mediaImage}>Continue with Apple</Button>
    </div>
  );
};

export default OAuthorization;
