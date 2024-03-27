import styles from './index.module.css';
const Button = ({ children, sx, cn, type, disabled, navigatePage }) => {
  return (
    <button
      className={`${styles.button} ${cn}`}
      style={sx}
      type={type}
      disabled={disabled}
      onClick={navigatePage}
    >
      {children}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
};
