import { useCallback, useContext, useEffect } from 'react';
import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';
import { WebSocketContext } from '../../../../context/Chat/Service';
import { NewPostContext } from '../../../../context/Chat/NewPost';
import { useParams } from 'react-router-dom';

const IncompleteSymptomList = ({ symptoms }) => {
  const { handleInputChange, selectedSymptoms } = useContext(WebSocketContext);
  const { sendNewPost, createNewPost, Ref, res, newPostData } =
    useContext(NewPostContext);
  const { reference_no } = useParams();
  useEffect(() => {
    if (res) {
      handleClick();
    }
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
    [Ref, reference_no, newPostData?.reference_no, sendNewPost]
  );

  return (
    <SymptomsSelectionInput cn={styles.cards}>
      {symptoms.map((item, index) => {
        if (item === 'Go') {
          return (
            <Card
              key={item.toLowerCase()}
              cn={`${styles.cardCheckbox} ${styles.inCompleteCheckbox}`}
              onClick={() => handleClick(item)}
            >
              <Content>{item}</Content>
            </Card>
          );
        } else {
          return (
            <Card
              key={`${item.replace(/\s/g, '').toLowerCase()}-${index}`}
              cn={`${styles.cardCheckbox}`}
            >
              <label className={styles.label}>
                <input
                  type='checkbox'
                  name='symptom'
                  onChange={handleInputChange}
                  value={item}
                  checked={selectedSymptoms.includes(item)}
                />
                <Content>{item}</Content>
              </label>
            </Card>
          );
        }
      })}
    </SymptomsSelectionInput>
  );
};

export default IncompleteSymptomList;
