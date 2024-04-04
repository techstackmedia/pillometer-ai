import styles from './index.module.css'

const LoadingBalls = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-ball"]}></div>
      <div className={styles["loading-ball"]}></div>
      <div className={styles["loading-ball"]}></div>
    </div>
  );
};

export default LoadingBalls;
