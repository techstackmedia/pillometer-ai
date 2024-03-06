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
          src={profileImage}
          alt='person profile'
          style={{
            borderColor: pathname !== '/auth/profile' ? 'transparent' : null,
          }}
        />
        <div>
          <Content
            cn='heading'
            sx={{
              fontSize: '1rem',
              marginBlock: 0,
              marginLeft: pathname !== '/auth/profile' ? 0 : null,
              marginRight: 24,
            }}
          >
            Babajide McKinsey
          </Content>
          <Content cn='paragraph' sx={{ fontSize: 14, marginBlock: 0 }}>
            b.mckinsey@gmail.com
          </Content>
        </div>
      </div>
    </>
  );
};

export default Profile;
