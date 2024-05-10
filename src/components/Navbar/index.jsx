import Content from '../shared/Content';
import styles from './index.module.css';
import logo from '../../logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileImageInfo from '../ProfileImageInfo';
import { useContext } from 'react';
import { NewPostContext } from '../../context/Chat/NewPost';
import menuIcon from '../../images/menu.png';

const Navbar = () => {
  const { pathname } = useLocation();
  const { handleMenuToggle } = useContext(NewPostContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className={styles.navbar}>
      <div onClick={handleMenuToggle} className={styles.menuButton}>
        <img src={menuIcon} alt='menu icon' />
      </div>
      <div onClick={handleNavigate} className={styles.logo}>
        <img src={logo} alt='pillometer logo' />
        <Content cn={`heading ${styles.heading}`}>pillometer.ai</Content>
      </div>

      {pathname === '/auth/profile' ? (
        <button type='button' onClick={handleNavigate}>
          Close
        </button>
      ) : (
        <ProfileImageInfo />
      )}
    </div>
  );
};

export default Navbar;
