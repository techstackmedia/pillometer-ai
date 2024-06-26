import Main from '../../components/Main';
import { useContext, useEffect, useState } from 'react';
import { AuthProfileContext } from '../../context/Auth/Profile';
import { token } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from '../../components/shared/Alert';
import LoginModal from '../../components/Modal/LoginModal';
import Layout from '../../components/shared/Layout';

const Home = () => {
  const { profileResponse } = useContext(AuthProfileContext);
  const firstName = profileResponse?.first_name;
  const lastName = profileResponse?.last_name;
  const navigate = useNavigate();
  const { state } = useLocation();
  const message = state?.message;
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (firstName === '' && lastName === '' && token) {
      navigate('/auth/profile', {
        state: { message: 'Profile set up is incomplete' },
      });
    }
  }, [firstName, lastName, navigate]);

  useEffect(() => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }, [message]);

  return (
    <>
      {successMessage && (
        <div className='pageAlert'>
          <Alert>{successMessage}</Alert>
        </div>
      )}
      <LoginModal />
      <Layout>
        <Main />
      </Layout>
    </>
  );
};

export default Home;
