import styles from './index.module.css';
import profileImage from '../../images/personProfileImage.png';
import Content from '../shared/Content';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthProfileContext } from '../../context/Auth/Profile';
import Button from '../shared/Button';

const ProfileImageInfo = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { profileResponse, getProfile } = useContext(AuthProfileContext);
  const token = localStorage.getItem('token');
  useEffect(() => {
    getProfile(token);
  }, []);

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  };

  const first_name = profileResponse?.first_name;
  const last_name = profileResponse?.last_name;
  const email = profileResponse?.email;
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const login = () => {
    navigate('/auth/login');
  };

  return (
    <>
      {first_name && last_name && email && token ? (
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
          <div onClick={logout}>
            <Button navigateToNextPage={logout}>Log out</Button>
          </div>
        </div>
      ) : token ? (
        <div className={styles.alertLogout}>
          <a href='/auth/profile' className={styles.img}>
            <img
              width={24}
              height={24}
              src='https://img.icons8.com/material-sharp/24/alarm--v1.png'
              alt='alarm--v1'
            />
          </a>
        </div>
      ) : (
        <div onClick={login}>
          <Button>Log in</Button>
        </div>
      )}
    </>
  );
};

export default ProfileImageInfo;
