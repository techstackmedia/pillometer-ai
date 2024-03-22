import Content from '../shared/Content';
import styles from './index.module.css';
import logo from '../../logo.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileImageInfo from '../ProfileImageInfo';
import { useEffect } from 'react';

const Navbar = () => {
  const { pathname } = useLocation();
  const { reference_no } = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!reference_no) {
      window.location.href = '/';
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.navbar}>
      <div onClick={handleNavigate}>
        <img src={logo} alt='pillometer logo' />
        <Content cn={`heading ${styles.heading}`}>pillometer.ai</Content>
      </div>
      {pathname === '/auth/profile' ? (
        <button type='button'>Close</button>
      ) : (
        <ProfileImageInfo />
      )}
    </div>
  );
};

export default Navbar;
