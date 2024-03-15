import { useContext } from 'react';
import UsageInfo from '../UsageInfo';
import ProfileInfo from '../ProfileInfo';
import { AuthProfileContext } from '../../context/Auth/Profile';

const Profile = () => {
  const { handleProfileSubmit, isCurrentPage } = useContext(AuthProfileContext);
  console.log(isCurrentPage);

  return (
    <form onSubmit={handleProfileSubmit}>
      {isCurrentPage ? <UsageInfo /> : <ProfileInfo />}
    </form>
  );
};

export default Profile;
