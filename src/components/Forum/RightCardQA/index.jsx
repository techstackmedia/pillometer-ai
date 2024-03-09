import ChatResponseList from '../../ChatResponseList';
import Tag from '../../Tag';
import Card from '../../shared/Card';
import styles from './index.module.css';
import thumbUpIcon from '../../../images/thumbUp.png';
import barChatIcon from '../../../images/barChart.png';

const RightCardQA = () => {
  return (
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
        <Tag
          cn={styles.tags}
          sx={{ justifyContent: 'flex-end', marginBlock: 10 }}
        />
        <hr />
        <ChatResponseList />
      </Card>
    </form>
  );
};

export default RightCardQA;
