import ChatResponseList from '../../components/ChatResponseList';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ChatQADetail = () => {
  return (
    <div>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <ChatResponseList />
      </div>
    </div>
  );
};

export default ChatQADetail;
