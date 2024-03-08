import Banner from '../shared/Banner';
import Content from '../shared/Content';
import Input from '../shared/Input';
import styles from './index.module.css';
import searchIcon from '../../images/searchCommunity.png';
import Button from '../shared/Button';
import Card from '../shared/Card';
import dropdownIcon from '../../images/arrowDropDown.png';
import Question from '../Question';
import thumbUpIcon from '../../images/thumbUp.png';
import barChatIcon from '../../images/barChart.png';
import Tags from '../Tag';
import ChatResponse from '../ChatResponse';

const Forum = () => {
  return (
    <div className={styles.main}>
      <Banner
        cn={styles.banner}
        sx={{ backgroundColor: '#4c70d6', color: '#F9F9FB' }}
      >
        <div>
          <Content
            cn='heading'
            sx={{ fontSize: 48, marginBlock: 0, color: '#F9F9FB' }}
          >
            Your Ultimate Wellness Partner
          </Content>
        </div>
        <Content cn='paragraph' sx={{ fontSize: 16, marginBlock: 2 }}>
          Your medical data and health information is confidential, protected
          and secured with end-to-end encryption.
        </Content>
        <Content cn='paragraph' sx={{ fontSize: 16, marginBlock: 2 }}>
          We are in compliance with ISO 9145930 data protection law.
        </Content>
      </Banner>
      <div className={styles.topics} style={{ marginTop: 30 }}>
        <form style={{ width: '50%' }}>
          <Input type='search' placeholder='Search topics of interest' />
          <img className={styles.img} src={searchIcon} alt='search icon' />
        </form>
        <form style={{ width: '40%', marginTop: 5 }}>
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
        <div
          className={styles['scroll-hidden']}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '106vh',
            overflowY: 'auto',
          }}
        >
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
        <form style={{ position: 'relative', top: 20, width: '50%' }}>
          <Card cn={styles.qa}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ textTransform: 'uppercase', fontSize: 12 }}>
                Posted 3 days ago
              </div>
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
            <Tags sx={{ justifyContent: 'flex-end', marginBlock: 20 }} />
            <hr style={{ border: 0, borderTop: '1px solid #C5C4D4' }} />
            <ChatResponse />
            <ChatResponse />
            <ChatResponse />
            <ChatResponse />
            <ChatResponse />
            <ChatResponse />
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Forum;
