import ChatResponseList from '../../ChatResponseList';
import Tag from '../../Tag';
import Card from '../../shared/Card';
import styles from './index.module.css';
import thumbUpIcon from '../../../images/thumbUp.png';
import barChatIcon from '../../../images/barChart.png';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';
import chatIcon from '../../../images/forum.png';
import Content from '../../shared/Content';

const RightCardQA = () => {
  const { response } = useContext(WebSocketContext);
  return (
    <form className={styles.cardForm}>
      <Card cn={`${response.length > 0 ? styles.qa : styles.ht}`}>
        {response.length > 0 && (
          <>
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
          </>
        )}
        {response.length > 0 ? (
          <ChatResponseList />
        ) : (
          <div className={styles.chat}>
            <img src={chatIcon} alt='chat icon' width={40} height={40} />
            <Content cn={`heading ${styles.heading}`}>
              View Conversations
            </Content>
            <Content cn={`paragraph ${styles.paragraph}`}>
              Select a conversation on the left panel to view
            </Content>
          </div>
        )}
      </Card>
    </form>
  );
};

export default RightCardQA;
