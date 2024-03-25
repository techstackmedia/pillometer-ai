import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import { useContext, useEffect, useState } from 'react';
import { AuthProfileContext } from '../../context/Auth/Profile';
import { token } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

const Home = () => {
  const { profileResponse } = useContext(AuthProfileContext);
  const firstName = profileResponse?.first_name;
  const lastName = profileResponse?.last_name;
  const navigate = useNavigate();
  const { state } = useLocation();
  const message = state?.message;
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (firstName === '' && lastName === '' && token) {
      navigate('/auth/profile', {
        state: { message: 'Profile set up is incomplete' },
      });
    }
  }, [firstName, lastName, navigate]);

  useEffect(() => {
    setSuccessMessage(message)
  },  [message]);


  return (
    <>
      {successMessage && (
        <div className='pageAlert'>
          <Alert>{successMessage}</Alert>
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
