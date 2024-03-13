import AddIcon from '../../images/add.png';
import Content from '../shared/Content';
import styles from './index.module.css';
import editPenIcon from '../../images/editPen.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { NewPostContext } from '../../context/Chat/NewPost';
import { useContext } from 'react';
const Sidebar = () => {
  const navigate = useNavigate();
  const handleCommunityNav = () => {
    navigate('/community');
  };
  const { pathname } = useLocation();

  const { createNewPost, responseMessage } = useContext(NewPostContext);
  const handleNewChat = async () => {
    const token = localStorage.getItem('token');
    createNewPost(token);
    navigate(`/${responseMessage?.reference_no}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.main}>
        <div className={styles.section}>
          <button className={styles.button} onClick={handleNewChat}>
            <span>New Chat</span> <img src={AddIcon} alt='add icon' />
          </button>
        </div>
        <div className={styles.section}>
          <Content cn={styles.paragraph}>Libraries</Content>
          <Content cn={styles.tab}>Symptoms</Content>
          <Content cn={styles.tab}>Conditions</Content>
        </div>
        <div className={styles.section}>
          <Content cn={styles.paragraph}>near me</Content>
          <Content cn={styles.tab}>Pharmacies</Content>
          <Content cn={styles.tab}>Hospitals</Content>
        </div>
        <div className={styles.section}>
          <Content
            handleContentClick={handleCommunityNav}
            cn={`${styles.tab} ${
              pathname === '/community' ? styles.active : undefined
            }`}
          >
            Community
          </Content>
          <Content cn={styles.tab}>Help & Feedback</Content>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.section}>
          <Content cn={styles.paragraph}>Your Location:</Content>
          <div className={styles.address}>
            <Content cn={styles.tab}>
              29 Taiwo St, Ojota, Lagos 105102, Lagos
            </Content>
            <button>
              <img src={editPenIcon} alt='edit pen icon' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
