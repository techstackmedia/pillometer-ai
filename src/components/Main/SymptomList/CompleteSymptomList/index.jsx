import { useContext } from 'react';
import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';
import { WebSocketContext } from '../../../../context/Chat/Service';

const CompleteSymptomList = ({ viewMore, fullSymptomList }) => {
  const { handleInputChange, selectedSymptoms } = useContext(WebSocketContext);

  return (
    <SymptomsSelectionInput
      cn={`${styles.cards} ${
        !viewMore ? styles.openViewMore : styles.closeViewMore
      }`}
    >
      {fullSymptomList.map((item, index) => (
        <Card
          key={`${index}-${item}`}
          cn={`${styles.cardCheckbox} ${item === '' && styles.nonInputValue}`}
        >
          <label
            className={`${styles.label} ${item === '' && styles.nonLabel}`}
          >
            <input
              type='checkbox'
              name='symptom'
              value={item}
              onChange={handleInputChange}
              checked={selectedSymptoms.includes(item)}
            />
            <Content>{item}</Content>
          </label>
        </Card>
      ))}
    </SymptomsSelectionInput>
  );
};

export default CompleteSymptomList;
