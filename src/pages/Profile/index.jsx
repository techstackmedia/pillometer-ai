import { useContext } from 'react';
import UsageInfo from '../UsageInfo';
import ProfileInfo from '../ProfileInfo';
import { AuthProfileContext } from '../../context/Auth/Profile';
import Alert from '../../components/shared/Alert';

const Profile = () => {
  const { handleProfileSubmit, isCurrentPage, firstMessage } =
    useContext(AuthProfileContext);

  return (
    <>
      {firstMessage && (
        <div className='pageAlert'>
          <Alert>{firstMessage}</Alert>
        </div>
      )}

      <form onSubmit={handleProfileSubmit}>
        {isCurrentPage ? <UsageInfo /> : <ProfileInfo />}
      </form>
    </>
  );
};

export default Profile;
