import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Question from '../../components/Forum';

const Community = () => {
  return (
    <div>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <Question />
      </div>
    </div>
  );
};

export default Community;
