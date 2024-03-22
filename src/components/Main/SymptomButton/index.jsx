import { useCallback, useContext, useEffect } from 'react';
import Button from '../../shared/Button';
import styles from './index.module.css';
import { WebSocketContext } from '../../../context/Chat/Service';
import { NewPostContext } from '../../../context/Chat/NewPost';
import { ChatDetailContext } from '../../../context/ChatDetail';
import { useParams } from 'react-router-dom';

const SymptomButton = () => {
  const { handleViewMoreClick, viewMore } = useContext(WebSocketContext);
  const { sendNewPost, createNewPost, Ref, res, newPostData } =
    useContext(NewPostContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { reference_no } = useParams();
  useEffect(() => {
    if (res) {
      handleClick();
    }
    handleChatQAResponses(reference_no);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);
  const handleClick = useCallback(
    (item) => {
      createNewPost();
      if (Ref ?? newPostData?.reference_no ?? reference_no) {
        sendNewPost(item);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Ref, reference_no, newPostData?.reference_no]
  );
  return (
    <>
      {viewMore ? (
        <Button cn={styles.diagnoseButton} navigateToNextPage={handleClick}>
          Diagnose
        </Button>
      ) : (
        <Button
          cn={styles.symptomsButton}
          navigateToNextPage={handleViewMoreClick}
        >
          View all symptoms
        </Button>
      )}
    </>
  );
};

export default SymptomButton;
