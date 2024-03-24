import { useContext, useEffect } from 'react';
import Button from '../../shared/Button';
import styles from './index.module.css';
import { WebSocketContext } from '../../../context/Chat/Service';
import { NewPostContext } from '../../../context/Chat/NewPost';
import { ChatDetailContext } from '../../../context/ChatDetail';
import { useParams } from 'react-router-dom';
import { MessagesContext } from '../../../context/Messages';

const SymptomButton = () => {
  const { handleViewMoreClick, viewMore } = useContext(WebSocketContext);
  const { handleClick } = useContext(MessagesContext);
  const { res } = useContext(NewPostContext);
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { reference_no } = useParams();
  useEffect(() => {
    if (res) {
      handleClick();
    }
    handleChatQAResponses(reference_no);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

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
