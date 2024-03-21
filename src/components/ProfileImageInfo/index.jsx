import { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthProfileContext } from '../../context/Auth/Profile';
import Button from '../shared/Button';
import ProfileDropdown from './Dropdown';
import profileImage from '../../images/personProfileImage.png';
import styles from './index.module.css';
import Content from '../shared/Content';
import uploadImageIcon from '../../images/uploadProfile.png';
import { token } from '../../constants';

const ProfileImageInfo = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { profileResponse, getProfile } = useContext(AuthProfileContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  const truncateString = (str, maxLength) => {
    return str?.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  };

  const firstName = profileResponse?.first_name;
  const lastName = profileResponse?.last_name;
  const email = profileResponse?.email;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const login = () => {
    navigate('/auth/login');
  };
  const [isUpload, setIsLoad] = useState(false);

  const handleMouseOver = () => {
    setIsLoad((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {token ? (
        <div className={styles.profile}>
          <div onClick={logout}>
            <Button navigateToNextPage={logout}>Log out</Button>
          </div>
          <div
            ref={dropdownRef}
            className={styles.dropdown}
            onClick={handleClick}
          >
            <img
              className={
                pathname !== '/auth/profile'
                  ? styles.nonProfilePageImage
                  : styles.profilePageImage
              }
              src={profileImage}
              alt='person profile'
            />
            {show && <ProfileDropdown />}
          </div>
          <div>
            <Content
              cn={`heading ${styles.heading} ${
                pathname !== '/auth/profile' ? styles.nonProfileMg : undefined
              }`}
            >
              {truncateString(firstName, 10)} {truncateString(lastName, 10)}
            </Content>
            <Content cn={`paragraph ${styles.paragraph}`}>
              {truncateString(email, 15)}
            </Content>
          </div>
        </div>
      ) : (
        pathname !== '/auth/profile' && (
          <div onClick={login}>
            <Button>Log in</Button>
          </div>
        )
      )}
      {pathname === '/auth/profile' && (
        <div className={styles.uploadImage}>
          <img
            className={
              pathname !== '/auth/profile'
                ? styles.nonProfilePageImage
                : `${styles.profilePageImage} ${styles.uploadProfilePageImage}`
            }
            src={profileImage}
            alt='person profile'
            onMouseEnter={handleMouseOver}
          />
          <img
            style={{ display: !isUpload ? 'none' : '' }}
            src={uploadImageIcon}
            width={24}
            height={24}
            alt='upload icon'
          />
        </div>
      )}
    </>
  );
};

export default ProfileImageInfo;
