import styles from './index.module.css';
const AuthLiner = ({ isCurrentPage }) => {
  return isCurrentPage ? null : (
    <div className={styles.AuthOrLine}>
      <p className={styles.or}>
        <span>OR</span>
      </p>
    </div>
  );
};

export default AuthLiner;
