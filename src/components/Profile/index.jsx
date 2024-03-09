import styles from './index.module.css';
import profileImage from '../../images/personProfileImage.png';
import Content from '../shared/Content';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const { pathname } = useLocation();

  return (
    <>
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
            Babajide McKinsey
          </Content>
          <Content cn={`paragraph ${styles.paragraph}`}>
            b.mckinsey@gmail.com
          </Content>
        </div>
      </div>
    </>
  );
};

export default Profile;
