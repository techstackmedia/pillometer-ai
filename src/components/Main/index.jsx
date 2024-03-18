import Banner from '../shared/Banner';
import Content from '../shared/Content';
import styles from './index.module.css';
import { useState } from 'react';
import Chat from '../Chat';
import SymptomList from './SymptomList';
import SymptomButton from './SymptomButton';

const Main = () => {
  const [viewMore, setViewMore] = useState(false);

  const handleViewMoreClick = () => {
    setViewMore((prev) => {
      return !prev;
    });
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
        <SymptomList viewMore={viewMore} />
        <SymptomButton handleViewMoreClick={handleViewMoreClick} />
      </main>
      <Chat setViewMore={setViewMore} />
    </div>
  );
};

export default Main;
