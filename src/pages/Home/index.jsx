import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import { useContext, useEffect } from 'react';
import { AuthProfileContext } from '../../context/Auth/Profile';
import { token } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { profileResponse } = useContext(AuthProfileContext);
  console.log(profileResponse);
  const firstName = profileResponse?.first_name;
  const lastName = profileResponse?.last_name;
  const navigate = useNavigate();

  useEffect(() => {
    if (firstName === '' && lastName === '' && token) {
      navigate('/auth/profile', {
        state: { message: 'Profile set up is incomplete' },
      });
    }
  }, [firstName, lastName, navigate]);

  return (
    <>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export default Home;
