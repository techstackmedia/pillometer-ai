import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Main from '../../components/Main';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default Home;
