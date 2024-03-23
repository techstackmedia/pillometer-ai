import { useContext } from 'react';
import Card from '../shared/Card';
import Content from '../shared/Content';
import personIcon from '../../images/person.png';
import styles from './index.module.css';
import Button from '../shared/Button';
import personsGroupIcon from '../../images/personsGroup.png';
import manageSearch from '../../images/manageSearch.png';
import { AuthProfileContext } from '../../context/Auth/Profile';
import Alert from '../shared/Alert';

const UsageInfoInput = () => {
  const { selectedOption, handleOptionChange, handleFormClick, secondMessage } =
    useContext(AuthProfileContext);

  return (
    <>
      {secondMessage && (
        <div className='pageAlert'>
          <Alert>{secondMessage}</Alert>
        </div>
      )}
      <Content cn={`heading ${styles.heading}`}>
        For a better experience, kindly tell us who or why you're using
        pillometer.ai
      </Content>
      <div className={styles.cardContainer}>
        <Card cn={styles.card}>
          <div className={styles.iconRadio}>
            <img src={personIcon} alt='person icon' />
            <input
              type='radio'
              checked={selectedOption === 'personal'}
              id='personal'
              onChange={() => handleOptionChange('personal')}
            />
          </div>
          <Content cn={`heading ${styles.usageInfoHeading}`}>Personal</Content>
          <Content cn='paragraph'>
            Welcome to HealthBot; Your Personal Health Companion on the Journey
            to Wellness
          </Content>
        </Card>

        <Card cn={styles.card}>
          <div className={styles.iconRadio}>
            <img src={personsGroupIcon} alt='person icon' />
            <input
              type='radio'
              checked={selectedOption === 'family'}
              name='usageInfo'
              id='family'
              onChange={() => handleOptionChange('family')}
            />
          </div>
          <Content cn={`heading ${styles.usageInfoHeading}`}>
            Friends/Family
          </Content>
          <Content cn='paragraph'>
            Welcome to HealthBot; Your Personal Health Companion on the Journey
            to Wellness
          </Content>
        </Card>

        <Card cn={`${styles.card} ${styles.cardMg}`}>
          <div className={styles.iconRadio}>
            <img src={manageSearch} alt='person icon' />
            <input
              type='radio'
              checked={selectedOption === 'health_consultant'}
              id='health_consultant'
              onChange={() => handleOptionChange('health_consultant')}
            />
          </div>
          <Content cn={`heading ${styles.usageInfoHeading}`}>
            Health Consultant
          </Content>
          <Content cn='paragraph'>
            Welcome to HealthBot; Your Personal Health Companion on the Journey
            to Wellness
          </Content>
        </Card>
      </div>
      <Button
        type={selectedOption ? 'submit' : 'button'}
        cn={styles.proceedButton}
        navigateToNextPage={selectedOption ? null : handleFormClick}
      >
        Proceed
      </Button>
    </>
  );
};

export default UsageInfoInput;
