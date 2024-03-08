import truncateWords from '../../utils/truncateWords';
import Card from '../shared/Card';
import styles from './index.module.css';
import thumbUp from '../../images/thumbUp.png';
import thumbDown from '../../images/thumbDown.png';
import viewBarIcon from '../../images/barChart.png';
import Tags from '../Tag';

const Question = () => {
  return (
    <form
      style={{
        width: '100%',
      }}
    >
      <Card cn={styles.card}>
        <Tags />
        <div className={styles.questions}>
          {truncateWords(
            'I am experiencing cough, sore throat and runny nose. What are the possible ways, medium or steps I can take to eradicate this feeling completely.'
          )}
        </div>
        <div className={styles.likeViews}>
          <div className={styles.likesSection}>
            <div className={styles.likes}>
              <img src={thumbUp} alt='thumbs up icon' />
              <span>304</span>
            </div>
            <div style={{ color: '#E8E7EE' }}>|</div>
            <div className={styles.likes}>
              <span>304</span>
              <img src={thumbDown} alt='thumb down icon' />
            </div>
          </div>

          <div
            className={styles.likesSection}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            <div
              className={styles.likes}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #e8e7ee',
                borderRadius: 999,
                padding: '5px 10px',
                height: 23,
                minWidth: 35,
              }}
            >
              <img src={viewBarIcon} alt='thumbs up icon' />
              <span>514</span>
            </div>
            <div className={styles.dot}></div>
            <div className={styles.postPeriod}>posted 3hrs ago</div>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default Question;
