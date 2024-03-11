import Alert from '../../components/shared/Alert';
import Navbar from '../../components/Navbar';
import ProfileImageInfo from '../../components/ProfileImageInfo';
import UsageInfoInput from '../../components/UsageInfoInput';
import styles from './index.module.css';

const UsageInfo = () => {
  return (
    <>
      <Navbar />
      <div className={`App ${styles.App}`}>
        <ProfileImageInfo />
        <Alert>
          Your medical data and health information is confidential, protected
          and secured with end-to-end encryption. We are in compliance with ISO
          9145930 data protection law.
        </Alert>
        <UsageInfoInput />
      </div>
    </>
  );
};

export default UsageInfo;
