import styles from './index.module.css';

const Content = ({ className, sx, children }) => {
  return (
    <div className={`${styles.contentContener} ${className}`} style={sx}>
      {children}
    </div>
  );
};

export default Content;
