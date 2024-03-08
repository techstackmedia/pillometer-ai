import styles from './index.module.css';
const Tag = ({ sx }) => {
  return (
    <div className={styles.tags} style={sx}>
      <div>#malaria</div>
      <div>#anti-malarial</div>
      <div>#health-check</div>
    </div>
  );
};

export default Tag;
