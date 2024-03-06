import styles from './index.module.css';

const Card = ({ children, cn, sx }) => {
  return (
    <div className={`${cn} ${styles.card}`} style={sx}>
      {children}
    </div>
  );
};

export default Card;
