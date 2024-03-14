import ChatResponseList from '../../components/ChatResponseList';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ChatQADetail = () => {
  return (
    <>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <div>
          <ChatResponseList />
        </div>
      </div>
    </>
  );
};

export default ChatQADetail;
