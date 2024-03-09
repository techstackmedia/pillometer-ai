import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Main from '../../components/Main';

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
