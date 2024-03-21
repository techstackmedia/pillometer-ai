import { useContext } from 'react';
import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';
import { WebSocketContext } from '../../../../context/Chat/Service';
import { NewPostContext } from '../../../../context/Chat/NewPost';

const IncompleteSymptomList = ({ symptoms }) => {
  const { handleInputChange, selectedSymptoms } = useContext(WebSocketContext);
  const { sendNewPost, createNewPost, Ref, res } = useContext(NewPostContext);
  const handleClick = (item) => {
    createNewPost();
    Ref && res && sendNewPost(item);
  };

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
