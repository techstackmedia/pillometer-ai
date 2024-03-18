import { useParams } from 'react-router-dom';
import ChatResponseList from '../../components/ChatResponseList';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ChatQADetail = () => {
  const { reference_no } = useParams();
  return (
    <>
      <Navbar />
      <div className='Main'>
        <Sidebar id={reference_no} />
        <div>
          <ChatResponseList id={reference_no} />
        </div>
      </div>
    </>
  );
};

export default ChatQADetail;
