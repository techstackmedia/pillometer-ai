import Banner from '../shared/Banner';
import Content from '../shared/Content';
import styles from './index.module.css';
import LeftCardQA from './LeftCardQA';
import RightCardQA from './RightCardQA';
import RightFilterButton from './RightFilterButton';
import LeftInputSearch from './LeftInputSearch';

const Forum = () => {
  return (
    <div className={styles.main}>
      <Banner cn={styles.banner}>
        <Content cn={`heading ${styles.heading}`}>
          Your Ultimate Wellness Partner
        </Content>
        <Content cn={`paragraph ${styles.paragraph}`}>
          Your medical data and health information is confidential, protected
          and secured with end-to-end encryption.
        </Content>
        <Content cn={`paragraph ${styles.paragraph}`}>
          We are in compliance with ISO 9145930 data protection law.
        </Content>
      </Banner>
      <div className={styles.topics}>
        <LeftInputSearch />
        <RightFilterButton />
      </div>

      <div className={styles.topics}>
        <LeftCardQA />
        <RightCardQA />
      </div>
    </div>
  );
};

export default Forum;
