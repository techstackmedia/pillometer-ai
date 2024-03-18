import { useState } from 'react';
import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';

const IncompleteSymptomList = ({ symptoms }) => {
  const [value, setValue] = useState([]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(value);
  return (
    <SymptomsSelectionInput cn={styles.cards}>
      {symptoms.map((item, index) => {
        if (item === 'Go') {
          return (
            <Card
              key={item.toLowerCase()}
              cn={`${styles.cardCheckbox} ${styles.inCompleteCheckbox}`}
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
                  onChange={handleChange}
                  value={value}
                  checked={item === value}
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
