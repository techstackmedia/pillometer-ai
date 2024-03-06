import Alert from '../../components/shared/Alert';
import Navbar from '../../components/Navbar';
import Profile from '../../components/Profile';
import UsageInfoInput from '../../components/UsageInfoInput';

const ProfileInfo = () => {
  return (
    <>
      <Navbar />
      <div className='App' style={{ alignItems: 'flex-start' }}>
        <Profile />
        <Alert />
        <UsageInfoInput />
      </div>
    </>
  );
};

export default ProfileInfo;
