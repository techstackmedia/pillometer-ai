import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Question from '../../components/Forum';

const Community = () => {
  return (
    <>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <Question />
      </div>
    </>
  );
};

export default Community;
