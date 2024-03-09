import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';

const IncompleteSymptomList = ({ symptoms }) => {
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
                <input type='checkbox' name='symptom' />
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
