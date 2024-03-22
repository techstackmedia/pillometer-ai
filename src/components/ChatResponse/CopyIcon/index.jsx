import styles from './index.module.css';
import copyIcon from '../../../images/copy.png';

const CopyIcon = ({ message, handleCopy, textCopied, successMessage }) => {
  return (
    <div className={styles.copyButton} onClick={handleCopy}>
      <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
      {textCopied && <span>{successMessage}</span>}
    </div>
  );
};

export default CopyIcon;
