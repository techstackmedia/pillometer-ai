import styles from './index.module.css';
import copyIcon from '../../../images/copy.png';
import reloadIcon from '../../../images/reload.png';
import thumbUp from '../../../images/thumbUp.png';
import thumbDown from '../../../images/thumbDown.png';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';
import speakerIcon from '../../../images/speaker.png';

const QAIcon = ({ message, handleCopy, textCopied, successMessage }) => {
  const { handleTextToSpeech } = useContext(WebSocketContext);
  return (
    <div className={styles.qaIcons}>
      {textCopied && <span>{successMessage}</span>}
      <img
        onClick={() => handleTextToSpeech(message)}
        src={speakerIcon}
        alt='audio icon'
        width={20}
        height={20}
      />{' '}
      <img
        src={copyIcon}
        alt='copy icon'
        width={20}
        height={20}
        onClick={handleCopy}
      />{' '}
      <img src={reloadIcon} alt='copy icon' width={20} height={20} />{' '}
      <img src={thumbUp} alt='copy icon' width={20} height={20} />{' '}
      <img src={thumbDown} alt='copy icon' width={20} height={20} />
    </div>
  );
};

export default QAIcon;
