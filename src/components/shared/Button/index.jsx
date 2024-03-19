import { useContext } from 'react';
import styles from './index.module.css';
import { AuthProfileContext } from '../../../context/Auth/Profile';
const Button = ({ children, sx, cn, type, disabled }) => {
  const { navigateToNextPage } = useContext(AuthProfileContext);
  const handleClick = () => {
    if (navigateToNextPage) {
      console.log('Hello');
      navigateToNextPage();
    }
  };
  return (
    <button
      className={`${styles.button} ${cn}`}
      style={sx}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
};
