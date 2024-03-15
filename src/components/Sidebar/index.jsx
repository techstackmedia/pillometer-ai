import AddIcon from '../../images/add.png';
import Content from '../shared/Content';
import styles from './index.module.css';
import editPenIcon from '../../images/editPen.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NewPostContext } from '../../context/Chat/NewPost';
import { useContext } from 'react';
import { BASE_CHAT_URL } from '../../constants';
import { useState, useEffect } from 'react';
import { WebSocketContext } from '../../context/Chat/Service';
const Sidebar = () => {
  const navigate = useNavigate();
  const handleCommunityNav = () => {
    navigate('/community');
  };
  const { pathname } = useLocation();

  const { createNewPost } = useContext(NewPostContext);
  const { response } = useContext(WebSocketContext);
  const token = localStorage.getItem('token');
  const handleChatList = async (e) => {
    try {
      const res = await fetch(`${BASE_CHAT_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setChatList(data?.results);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleNewChat = async () => {
    createNewPost(token);
    // handleChatList();
  };
  const [chatList, setChatList] = useState(null);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    void handleChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, response]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.main}>
        <div className={styles.section}>
          <button className={styles.button} onClick={handleNewChat}>
            <span>New Chat</span> <img src={AddIcon} alt='add icon' />
          </button>
          {!error && chatList?.length > 0 && (
            <>
              <Content cn={styles.tab} sx={{ marginBlock: 0, marginTop: 30 }}>
                <a href={`/details/${chatList[0]?.reference_no}`}>
                  {chatList[0]?.title}
                </a>
              </Content>
              <Content
                cn={styles.paragraph}
                sx={{ marginTop: 20, marginBottom: 10 }}
              >
                Recent Chats
              </Content>
              {showAll ? (
                chatList.slice(1).map((item, index) => (
                  <Content key={index} cn={styles.tab} sx={{ marginBlock: 0 }}>
                    <a href={`/details/${item.reference_no}`}>{item.title}</a>
                  </Content>
                ))
              ) : (
                <>
                  <Content cn={styles.tab} sx={{ marginBlock: 0 }}>
                    <a href={`/details/${chatList[1]?.reference_no}`}>
                      {chatList[1]?.title}
                    </a>
                  </Content>
                  <Content cn={styles.tab} sx={{ marginBlock: 0 }}>
                    <a href={`/details/${chatList[2]?.reference_no}`}>
                      {chatList[2]?.title}
                    </a>
                  </Content>
                  {chatList[2] && (
                    <Content
                      cn={styles.tab}
                      sx={{ marginBlock: 0 }}
                      handleContentClick={() => setShowAll(true)}
                    >
                      <Content sx={{ color: '#4C70D6' }}>See all...</Content>
                    </Content>
                  )}
                </>
              )}
            </>
          )}
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
