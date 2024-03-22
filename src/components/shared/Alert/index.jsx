import Content from '../Content';
import infoIcon from '../../../images/infoIcon.png';
import styles from './index.module.css';
import Card from '../Card';

const Alert = ({ children, sx }) => {
  return (
    <Card cn={`${styles.alert}`} styles={sx}>
      <img src={infoIcon} alt='info icon' width={24} height={24} />
      <Content cn={`paragraph ${styles.paragraph}`}>{children}</Content>
    </Card>
  );
};

export default Alert;
