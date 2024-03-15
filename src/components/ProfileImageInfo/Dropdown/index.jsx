import styles from './index.module.css';
const ProfileDropdown = () => {
  return (
    <div className={styles.dropdown}>
      <a href='/auth/profile'>Set up your Profile</a>
    </div>
  );
};

export default ProfileDropdown;
