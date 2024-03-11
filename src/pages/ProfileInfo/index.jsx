import Alert from '../../components/shared/Alert';
import Navbar from '../../components/Navbar';
import Profile from '../../components/Profile';
import UsageInfoInput from '../../components/UsageInfoInput';
import styles from './index.module.css';

const ProfileInfo = () => {
  return (
    <>
      <Navbar />
      <div className={`App ${styles.App}`}>
        <Profile />
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

export default ProfileInfo;
