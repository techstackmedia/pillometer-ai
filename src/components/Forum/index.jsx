import Banner from '../shared/Banner';
import Content from '../shared/Content';
import Input from '../shared/Input';
import styles from './index.module.css';
import searchIcon from '../../images/searchCommunity.png';
import Button from '../shared/Button';
import Card from '../shared/Card';
import dropdownIcon from '../../images/arrowDropDown.png';
import thumbUpIcon from '../../images/thumbUp.png';
import barChatIcon from '../../images/barChart.png';
import Tags from '../Tag';
import QuestionList from '../QuestionList';
import ChatResponseList from '../ChatResponseList';

const Forum = () => {
  return (
    <div className={styles.main}>
      <Banner cn={styles.banner}>
        <div>
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
      <div className={styles.topics}>
        <form className={styles.searchForm}>
          <Input type='search' placeholder='Search topics of interest' />
          <img className={styles.img} src={searchIcon} alt='search icon' />
        </form>
        <form className={styles.filterForm}>
          <Button>
            Most recent
            <img src={dropdownIcon} alt='dropdown icon' />
          </Button>
          <Button>
            Informational
            <img src={dropdownIcon} alt='dropdown icon' />
          </Button>
          <Button>
            Prescriptions
            <img src={dropdownIcon} alt='dropdown icon' />
          </Button>
        </form>
      </div>

      <div className={styles.topics}>
        <div className={`${styles['scroll-hidden']} ${styles.questions}`}>
          <QuestionList />
        </div>
        <form className={styles.cardForm}>
          <Card cn={styles.qa}>
            <div className={styles.viewLikes}>
              <div className={styles.postView}>Posted 3 days ago</div>
              <div className={styles.likesSection}>
                <div className={styles.likes}>
                  <img src={barChatIcon} alt='thumbs up icon' />
                  <span>514</span>
                </div>
                <div className={styles.likes}>
                  <span>304</span>
                  <img src={thumbUpIcon} alt='thumb up icon' />
                </div>
              </div>
            </div>
            <Tags cn={styles.tags} />
            <hr />
            <ChatResponseList />
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Forum;
