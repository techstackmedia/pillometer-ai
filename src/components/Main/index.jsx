import Banner from '../shared/Banner';
import Content from '../shared/Content';
import SymptomsSelectionInput from '../shared/SymptomsSelectionInput';
import styles from './index.module.css';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { symptoms, fullSymptomList } from '../../content';
import { useState } from 'react';
import Chat from '../Chat';

const Main = () => {
  const [viewMore, setViewMore] = useState(false);

  const handleViewMoreClick = () => {
    if (viewMore === false) {
      setViewMore(!viewMore);
    } else {
      setViewMore(false);
    }
  };

  return (
    <div className={styles.main}>
      <main>
        <Banner>
          <div className={styles.gradientText}>
            <Content cn={`heading ${styles.heading}`}>
              Your Ultimate Wellness Partner
            </Content>
          </div>
          <Content cn={`paragraph ${styles.paragraph}`}>
            Your medical data and health information is confidential, protected
            and secured with end-to-end encryption.
          </Content>
          <Content cn={`paragraph ${styles.paragraph}`}>
            We are in compliance with ISO 9145930 data protection law.
          </Content>
        </Banner>
        {viewMore ? (
          <SymptomsSelectionInput
            cn={`${styles.cards} ${
              viewMore ? styles.openViewMore : styles.closeViewMore
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
        ) : (
          <SymptomsSelectionInput cn={styles.cards}>
            {symptoms.map((item, index) => {
              if (item === 'Go') {
                return (
                  <Card
                    key={item.toLowerCase()}
                    cn={`${styles.cardCheckbox} ${styles.symptomList}`}
                  >
                    <Content>{item}</Content>
                  </Card>
                );
              } else {
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
              }
            })}
          </SymptomsSelectionInput>
        )}
        {viewMore ? (
          <Button cn={styles.diagnoseButton}>Diagnose</Button>
        ) : (
          <Button
            cn={styles.symptomsButton}
            navigateToNextPage={handleViewMoreClick}
          >
            View all symptoms
          </Button>
        )}
      </main>
      <Chat />
    </div>
  );
};

export default Main;
