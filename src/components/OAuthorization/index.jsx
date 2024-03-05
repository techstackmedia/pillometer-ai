import Button from '../shared/Button';
import styles from './index.module.css';

const OAuthorization = () => {
  const buttonMg = {
    marginBlock: 20,
  };

  const buttonColor = {
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid #c5c4d4',
  };

  return (
    <div className={styles.buttons}>
      <Button cn={styles.mediaImage} sx={buttonColor}>
        Continue with Google
      </Button>
      <Button cn={styles.mediaImage} sx={{ ...buttonMg, ...buttonColor }}>
        Continue with Facebook
      </Button>
      <Button cn={styles.mediaImage} sx={buttonColor}>
        Continue with Apple
      </Button>
    </div>
  );
};

export default OAuthorization;
