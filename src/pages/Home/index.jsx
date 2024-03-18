import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthSigninContext } from '../../context/Auth/Signin';
import Alert from '../../components/shared/Alert';
import styles from './index.module.css';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WebSocketContext } from '../../context/Chat/Service';

const Home = () => {
  const location = useLocation();
  const token = location.state?.token;
  const status = location.state?.status;
  const profile = location.state?.profile;
  const { successMessage } = useContext(AuthSigninContext);
  const { errorAltMessage, responseMessage } = useContext(NewPostContext);

  const [showProfileAlert, setShowProfileAlert] = useState(false);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
      setShowProfileAlert(true);
      setTimeout(() => {
        setShowProfileAlert(false);
      }, 3000);
    }
  }, [profile]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const { connectionErrorMessage, connectionMessage, connectionWarnMessage } =
    useContext(WebSocketContext);

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
      {responseMessage?.statusText && (
        <div className={styles.homeAlert}>
          <Alert>{responseMessage?.statusText}</Alert>
        </div>
      )}
      {showProfileAlert && (
        <div className={styles.homeAlert}>
          <Alert>{profile}</Alert>
        </div>
      )}
      {connectionErrorMessage && (
        <div className={styles.homeAlert}>
          <Alert>{connectionErrorMessage}</Alert>
        </div>
      )}

      {connectionMessage && (
        <div className={styles.homeAlert}>
          <Alert>{connectionMessage}</Alert>
        </div>
      )}

      {connectionWarnMessage && (
        <div className={styles.homeAlert}>
          <Alert>{connectionWarnMessage}</Alert>
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
