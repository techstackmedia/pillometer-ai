import { useContext } from 'react';
import styles from './index.module.css';
import { AuthProfileContext } from '../../../context/Auth/Profile';
const Button = ({ children, sx, cn, type }) => {
  const { navigateToNextPage } = useContext(AuthProfileContext);
  return (
    <button
      className={`${styles.button} ${cn}`}
      style={sx}
      type={type}
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
