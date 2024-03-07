import Content from '../shared/Content';
import styles from './index.module.css';
import logo from '../../logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from '../Profile';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className={styles.navbar}>
      <div onClick={handleNavigate}>
        <img src={logo} alt='pillometer logo' />
        <Content cn='heading' sx={{ margin: 0, color: '#5EA3D6' }}>
          pillometer.ai
        </Content>
      </div>
      {pathname === '/auth/profile' ? (
        <button type='button'>Close</button>
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default Navbar;
