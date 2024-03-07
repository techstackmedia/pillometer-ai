import React, { useState } from 'react';
import Card from '../shared/Card';
import Content from '../shared/Content';
import personIcon from '../../images/person.png';
import styles from './index.module.css';
import Button from '../shared/Button';
import personsGroupIcon from '../../images/personsGroup.png';
import manageSearch from '../../images/manageSearch.png';

const UsageInfoInput = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <>
      <Content
        cn='heading'
        sx={{
          color: '#514F6D',
          fontSize: 24,
          fontWeight: 400,
          marginBlock: 0,
        }}
      >
        For a better experience, kindly tell us who or why you're using
        pillometer.ai
      </Content>
      <form>
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
            <Content cn='heading' sx={{ color: '#514F6D', fontSize: 20 }}>
              Personal
            </Content>
            <Content cn='paragraph'>
              Welcome to HealthBot; Your Personal Health Companion on the
              Journey to Wellness
            </Content>
          </Card>

          <Card cn={styles.card}>
            <div className={styles.iconRadio}>
              <img src={personsGroupIcon} alt='person icon' />
              <input
                type='radio'
                checked={selectedOption === 'friends-family'}
                name='usageInfo'
                id='friends-family'
                onChange={() => handleOptionChange('friends-family')}
              />
            </div>
            <Content cn='heading' sx={{ color: '#514F6D', fontSize: 20 }}>
              Friends/Family
            </Content>
            <Content cn='paragraph'>
              Welcome to HealthBot; Your Personal Health Companion on the
              Journey to Wellness
            </Content>
          </Card>

          <Card cn={styles.card} sx={{ margin: 0, marginTop: -10 }}>
            <div className={styles.iconRadio}>
              <img src={manageSearch} alt='person icon' />
              <input
                type='radio'
                checked={selectedOption === 'health-consultant'}
                id='health-consultant'
                onChange={() => handleOptionChange('health-consultant')}
              />
            </div>
            <Content cn='heading' sx={{ color: '#514F6D', fontSize: 20 }}>
              Health Consultant
            </Content>
            <Content cn='paragraph'>
              Welcome to HealthBot; Your Personal Health Companion on the
              Journey to Wellness
            </Content>
          </Card>
        </div>
        <Button sx={{ marginTop: 30 }}>Proceed</Button>
      </form>
    </>
  );
};

export default UsageInfoInput;
