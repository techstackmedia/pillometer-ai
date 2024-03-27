import { useContext, useState } from 'react';
import AuthLiner from '../../components/AuthLiner';
import Authentication from '../../components/Authentication';
import OAuthorization from '../../components/OAuthorization';
import '../../App.css';
import { useLocation } from 'react-router-dom';
import { AuthSigninContext } from '../../context/Auth/Signin';
import { AuthSignupContext } from '../../context/Auth/Register';
import Alert from '../../components/shared/Alert';
import styles from './index.module.css';
import Content from '../../components/shared/Content';

const Auth = () => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const navigatePage = () => {
    setIsCurrentPage(true);
  };
  const { pathname } = useLocation();

  const { signinError } = useContext(AuthSigninContext);
  const { signupError } = useContext(AuthSignupContext);

  return (
    <div className='App'>
      <>
        {(signinError || signupError) && (
          <div className={styles.alert}>
            <Alert>
              <Content>{signinError || signupError}</Content>
            </Alert>
          </div>
        )}
      </>
      <Authentication
        navigatePage={navigatePage}
        isCurrentPage={isCurrentPage}
      />
      {pathname === '/auth/register' && (
        <>
          <AuthLiner isCurrentPage={isCurrentPage} />
          <OAuthorization isCurrentPage={isCurrentPage} />
        </>
      )}
    </div>
  );
};

export default Auth;
