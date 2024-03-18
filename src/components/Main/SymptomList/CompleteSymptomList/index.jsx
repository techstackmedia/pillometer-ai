import React, { useContext } from 'react';
import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';
import { WebSocketContext } from '../../../../context/Chat/Service';

const CompleteSymptomList = ({ viewMore, fullSymptomList }) => {
  // const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const { handleInputChange, selectedSymptoms } = useContext(WebSocketContext);

  console.log(selectedSymptoms);

  return (
    <SymptomsSelectionInput
      cn={`${styles.cards} ${
        !viewMore ? styles.openViewMore : styles.closeViewMore
      }`}
    >
      {fullSymptomList.map((item, index) => (
        <Card
          key={`${index}-${item}`} // Use a unique identifier for the key
          cn={styles.cardCheckbox}
        >
          <label className={styles.label}>
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
