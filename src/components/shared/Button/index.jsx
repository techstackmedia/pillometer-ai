import styles from './index.module.css';
const Button = ({ children, className, sx }) => {
  return (
    <button className={`${styles.button} ${className}`} style={sx}>
      {children}
    </button>
  );
};

export default Button;
