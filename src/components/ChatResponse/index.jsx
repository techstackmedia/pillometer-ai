import { useContext } from 'react';
import UserQuestion from './UserQuestion';
import Response from './Response';
import { WebSocketContext } from '../../context/Chat/Service';

const ChatResponse = ({ item }) => {
  const { newResponse } = useContext(WebSocketContext);

  return (
    <>
      {item?.isUser ? (
        item?.message !== '' ? (
          <UserQuestion message={item?.message} id={item?.id} />
        ) : null
      ) : (
        <Response message={item?.message || newResponse} />
      )}
    </>
  );
};

export default ChatResponse;
