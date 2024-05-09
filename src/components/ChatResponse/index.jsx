import UserQuestion from './UserQuestion';
import Response from './Response';

const ChatResponse = ({ item }) => {

  return (
    <>
      {item?.isUser ? (
        item?.message !== '' ? (
          <UserQuestion message={item?.message} id={item?.id} />
        ) : null
      ) : (
        <Response message={item?.message} id={item?.id} />
      )}
    </>
  );
};

export default ChatResponse;
