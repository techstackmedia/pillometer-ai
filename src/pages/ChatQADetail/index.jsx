import React, { useState } from 'react';
import ChatResponseList from '../../components/ChatResponseList';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ChatQADetail = () => {
  // eslint-disable-next-line no-unused-vars
  const [viewMore, setViewMore] = useState(true);

  return (
    <>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <div>
          <ChatResponseList setViewMore={setViewMore} />
        </div>
      </div>
    </>
  );
};

export default ChatQADetail;
