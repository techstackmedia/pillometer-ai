import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthSigninContext } from '../../context/Auth/Signin';
import Alert from '../../components/shared/Alert';
import styles from './index.module.css';
import { NewPostContext } from '../../context/Chat/POST';

const Home = () => {
  const location = useLocation();
  const token = location.state?.token;
  const status = location.state?.status;
  const profile = location.state?.profile;
  const { successMessage } = useContext(AuthSigninContext);
  const { errorAltMessage } = useContext(NewPostContext);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <>
      {status && successMessage && (
        <div className={styles.homeAlert}>
          <Alert>Login Successful</Alert>
        </div>
      )}

      {errorAltMessage && (
        <div className={styles.homeAlert}>
          <Alert>{errorAltMessage}</Alert>
        </div>
      )}

      <Navbar />
      <div className='Main'>
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export default Home;
