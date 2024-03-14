import styles from './index.module.css';
import copyIcon from '../../../images/copy.png';
import reloadIcon from '../../../images/reload.png';
import thumbUp from '../../../images/thumbUp.png';
import thumbDown from '../../../images/thumbDown.png';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';

const QAIcon = () => {
  const { handleTextToSpeech } = useContext(WebSocketContext);
  return (
    <div className={styles.qaIcons}>
      <img
        onClick={handleTextToSpeech}
        src='https://img.icons8.com/ios/50/high-volume--v1.png'
        alt='copy icon'
        width={20}
        height={20}
      />{' '}
      <img src={copyIcon} alt='copy icon' width={20} height={20} />{' '}
      <img src={reloadIcon} alt='copy icon' width={20} height={20} />{' '}
      <img src={thumbUp} alt='copy icon' width={20} height={20} />{' '}
      <img src={thumbDown} alt='copy icon' width={20} height={20} />
    </div>
  );
};

export default QAIcon;
