import styles from './index.module.css';
const Button = ({ children, sx, cn, type, disabled, navigateToNextPage }) => {
  return (
    <button
      className={`${styles.button} ${cn}`}
      style={sx}
      type={type}
      disabled={disabled}
      onClick={navigateToNextPage}
    >
      {children}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
};
