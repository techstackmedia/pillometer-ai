import styles from './index.module.css';

const Banner = ({ children, sx, cn }) => {
  return (
    <div className={`${cn} ${styles.banner}`} style={sx}>
      {children}
    </div>
  );
};

export default Banner;
