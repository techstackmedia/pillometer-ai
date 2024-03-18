import styles from './index.module.css';
import copyIcon from '../../../images/copy.png';

const CopyIcon = ({ handleCopy }) => {
  return (
    <div className={styles.copyButton} onClick={handleCopy}>
      <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
      <span>Copy</span>
    </div>
  );
};

export default CopyIcon;
