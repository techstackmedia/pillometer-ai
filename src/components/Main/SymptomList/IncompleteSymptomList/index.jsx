import { useContext } from 'react';
import Card from '../../../shared/Card';
import Content from '../../../shared/Content';
import SymptomsSelectionInput from '../../../shared/SymptomsSelectionInput';
import styles from '../index.module.css';
import { WebSocketContext } from '../../../../context/Chat/Service';
import { MessagesContext } from '../../../../context/Messages';
import { token } from '../../../../constants';
import { AuthProfileContext } from '../../../../context/Auth/Profile';

const IncompleteSymptomList = ({ symptoms }) => {
  const { handleInputChange, selectedSymptoms } = useContext(WebSocketContext);
  const { handleClick } = useContext(MessagesContext);
  const { profileResponse } = useContext(AuthProfileContext);
  const userType = profileResponse?.user_type;
  const healthConsultant = userType === 'health_consultant';

  return (
    <SymptomsSelectionInput cn={styles.cards}>
      {symptoms.map((item, index) => {
        if (item === 'Go!') {
          return (
            <Card
              key={item.toLowerCase()}
              cn={`${styles.cardCheckbox} ${styles.inCompleteCheckbox}`}
              onClick={handleClick}
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
              <label
                className={`${styles.label} ${
                  healthConsultant && styles.textCenter
                }`}
              >
                {healthConsultant ? null : (
                  <input
                    type='checkbox'
                    name='symptom'
                    onChange={handleInputChange}
                    value={item}
                    checked={selectedSymptoms.includes(item)}
                  />
                )}
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
