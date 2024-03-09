import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';

const CompleteSymptomList = ({ viewMore, fullSymptomList }) => {
  return (
    <SymptomsSelectionInput
      cn={`${styles.cards} ${
        !viewMore ? styles.openViewMore : styles.closeViewMore
      }`}
    >
      {fullSymptomList.map((item, index) => {
        return (
          <Card
            key={`${item.replace(/\s/g, '').toLowerCase()}-${index}`}
            cn={styles.cardCheckbox}
          >
            <label className={styles.label}>
              <input type='checkbox' name='symptom' />
              <Content>{item}</Content>
            </label>
          </Card>
        );
      })}
    </SymptomsSelectionInput>
  );
};

export default CompleteSymptomList;
