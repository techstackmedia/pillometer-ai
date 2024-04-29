import { useLocation } from 'react-router-dom';
import styles from './index.module.css';
const Button = ({ children, sx, cn, type, disabled, navigatePage }) => {
  const {pathname} = useLocation()
  return (
    <button
      className={`${styles.button} ${!pathname.includes('auth') ? styles.loginButton : ''} ${cn}`}
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
