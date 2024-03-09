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
        <Alert />
        <UsageInfoInput />
      </div>
    </>
  );
};

export default ProfileInfo;
