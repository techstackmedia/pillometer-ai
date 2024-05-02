import { useParams } from 'react-router-dom';
import ChatResponseList from '../../components/ChatResponseList';
import { useContext } from 'react';
import { NewPostContext } from '../../context/Chat/NewPost';
import Alert from '../../components/shared/Alert';
import Layout from '../../components/shared/Layout';

const ChatQADetail = () => {
  const { reference_no } = useParams();
  const { err, errorAltMessage, serverError } = useContext(NewPostContext);

  const renderAlert = (message) => (
    <div className='pageAlert'>
      <Alert>{message}</Alert>
    </div>
  );

  return (
    <>
      {errorAltMessage && renderAlert(errorAltMessage)}
      {err &&
        renderAlert(
          <>
            Websocket closed. Please{' '}
            <a href={window.location.href}>try again</a>
          </>
        )}
      {serverError &&
        renderAlert(
          <>
            Server error occurred. Please{' '}
            <a href={window.location.href}>try again</a>
          </>
        )}
      <Layout>
        <ChatResponseList id={reference_no} />
      </Layout>
    </>
  );
};

export default ChatQADetail;
