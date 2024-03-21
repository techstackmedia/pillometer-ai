import styles from './index.module.css';

const Card = ({ children, cn, sx, onClick }) => {
  return (
    <div className={`${styles.card} ${cn}`} style={sx} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
