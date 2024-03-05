import styles from './index.module.css';
const Button = ({ children, sx, cn, navigateToNextPage, isCurrentPage }) => {
  console.log(isCurrentPage);
  return (
    <button
      className={`${styles.button} ${cn}`}
      style={sx}
      onClick={navigateToNextPage}
    >
      {children}
    </button>
  );
};

export default Button;
