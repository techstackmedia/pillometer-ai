import styles from './index.module.css';

const Banner = ({ children, sx }) => {
  return (
    <div className={styles.banner} style={sx}>
      {children}
    </div>
  );
};

export default Banner;
