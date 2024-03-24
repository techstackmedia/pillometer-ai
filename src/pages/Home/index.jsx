import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';

const Home = () => {
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
