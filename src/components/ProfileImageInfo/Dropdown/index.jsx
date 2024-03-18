import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <div className={styles.dropdown}>
      <a className={styles.item} href='/auth/profile'>
        Profile Setup
      </a>
      <div className={styles.line}></div>
      <div className={styles.item} onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default ProfileDropdown;
