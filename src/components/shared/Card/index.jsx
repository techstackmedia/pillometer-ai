import { useContext } from 'react';
import styles from './index.module.css';
import { NetworkStatusContext } from '../../../context/NetworkStatus';

const Card = ({ children, cn, sx, onClick }) => {
  const { internetConnection } = useContext(NetworkStatusContext);
  return (
    <div
      className={`${styles.card} ${cn} ${
        internetConnection && styles.internetConnection
      }`}
      style={sx}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
