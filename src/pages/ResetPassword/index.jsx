import { useNavigate } from 'react-router-dom';
import spinner from '../../images/spinner.gif';
import Alert from '../../components/shared/Alert';
import Content from '../../components/shared/Content';
import styles from './index.module.css';
import { useContext, useEffect } from 'react';
import { AuthResetPasswordContext } from '../../context/Auth/ResetPassword';

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    resetPasswordSuccessMessage,
    resetPasswordErrorMessage,
    resetPasswordErrorAltMessage,
  } = useContext(AuthResetPasswordContext);
  console.log(window.location.href);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (token) {
    return (
      <div>
        {resetPasswordSuccessMessage && (
          <Alert>{resetPasswordSuccessMessage}</Alert>
        )}
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.pageAlert}>
          {resetPasswordErrorMessage && (
            <Alert>
              <Content className={`heading ${styles.heading}`}>
                {resetPasswordErrorMessage}
              </Content>
              <Content className={`paragraph ${styles.paragraph}`}>
                {resetPasswordErrorAltMessage}
              </Content>
            </Alert>
          )}
        </div>
        <div className='App'>
          <img src={spinner} alt='spinner gif' width={150} height={150} />
        </div>
      </>
    );
  }
};

export default ResetPassword;
