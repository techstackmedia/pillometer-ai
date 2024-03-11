import styles from './index.module.css';

const Card = ({ children, cn, sx }) => {
  return (
    <div className={`${styles.card} ${cn}`} style={sx}>
      {children}
    </div>
  );
};

export default Card;
