import Content from '../shared/Content';
import infoIcon from '../../images/infoIcon.png';
import styles from './index.module.css';
import Card from '../shared/Card';

const Alert = ({ children }) => {
  return (
    <Card cn={styles.alert}>
      {children}
      <img src={infoIcon} alt='info icon' width={24} height={24} />
      <Content cn='paragraph' sx={{ margin: 0 }}>
        Your medical data and health information is confidential, protected and
        secured with end-to-end encryption. We are in compliance with ISO
        9145930 data protection law.
      </Content>
    </Card>
  );
};

export default Alert;
