import styles from './index.module.css';
import profileImage from '../../images/personProfileImage.png';
import Content from '../shared/Content';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthProfileContext } from '../../context/Auth/Profile';

const ProfileImageInfo = () => {
  const { pathname } = useLocation();

  const { profileResponse, getProfile } = useContext(AuthProfileContext);
  const token = localStorage.getItem('token');
  useEffect(() => {
    getProfile(token);
  }, []);

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  };

  const { first_name, last_name, email } = profileResponse;

  return (
    <>
      {first_name && last_name && email ? (
        <div className={styles.profile}>
          <img
            className={
              pathname !== '/auth/profile'
                ? styles.nonProfilePageImage
                : styles.profilePageImage
            }
            src={profileImage}
            alt='person profile'
          />
          <div>
            <Content
              cn={`heading ${styles.heading} ${
                pathname !== '/auth/profile' ? styles.nonProfileMg : undefined
              }`}
            >
              {truncateString(first_name, 10)} {truncateString(last_name, 10)}
            </Content>
            <Content cn={`paragraph ${styles.paragraph}`}>
              {truncateString(email, 15)}
            </Content>
          </div>
        </div>
      ) : (
        <a href='/auth/profile'>Set up your profile</a>
      )}
    </>
  );
};

export default ProfileImageInfo;
