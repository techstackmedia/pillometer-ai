import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthSigninContext } from '../../context/Auth/Signin';
import Alert from '../../components/shared/Alert';
import styles from './index.module.css';
import { AuthResetPasswordContext } from '../../context/Auth/ResetPassword';
import Content from '../../components/shared/Content';

const Home = () => {
  const location = useLocation();
  const token = location.state?.token;
  const status = location.state?.status;
  const profile = location.state?.profile;
  const details = location.state?.details;
  const { successMessage } = useContext(AuthSigninContext);
  const {
    resetPasswordSuccessMessage,
    resetPasswordErrorMessage,
    resetPasswordErrorAltMessage,
  } = useContext(AuthResetPasswordContext);

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
  console.log(resetPasswordSuccessMessage, resetPasswordErrorMessage);

  return (
    <>
      {status && successMessage ? (
        <div className={styles.homeAlert}>
          <Alert>Login Successful</Alert>
        </div>
      ) : (
        <div className={styles.homeAlert}>
          {details ? (
            <Alert>{details}</Alert>
          ) : (
            resetPasswordErrorMessage && (
              <Alert>
                <Content className={`heading ${styles.heading}`}>
                  {resetPasswordErrorMessage}
                </Content>
                <Content className={`paragraph ${styles.paragraph}`}>
                  {resetPasswordErrorAltMessage}
                </Content>
              </Alert>
            )
          )}
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
