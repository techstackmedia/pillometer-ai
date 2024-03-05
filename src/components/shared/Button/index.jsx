import styles from './index.module.css';
const Button = ({ children, sx, cn }) => {
  return (
    <button className={`${styles.button} ${cn}`} style={sx}>
      {children}
    </button>
  );
};

export default Button;
