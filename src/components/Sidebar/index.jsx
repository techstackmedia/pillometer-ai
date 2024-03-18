import AddIcon from '../../images/add.png';
import Content from '../shared/Content';
import styles from './index.module.css';
import editPenIcon from '../../images/editPen.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { NewPostContext } from '../../context/Chat/NewPost';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { WebSocketContext } from '../../context/Chat/Service';
import { ChatDetailContext } from '../../context/ChatDetail';
import { BASE_CHAT_URL, token } from '../../constants';

const Sidebar = () => {
  const [chatList, setChatList] = useState(null);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const handleCommunityNav = () => {
    navigate('/community');
  };
  const { pathname } = useLocation();
  const { handleChatQAResponses } = useContext(ChatDetailContext);

  const { createNewPost, res } = useContext(NewPostContext);
  const { newPostData, response } = useContext(WebSocketContext);
  useEffect(() => {
    void handleChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPostData, res, response]);

  const handleChatList = async () => {
    try {
      const response = await fetch(BASE_CHAT_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setChatList(data?.results);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleNewChat = async () => {
    createNewPost();
    handleChatQAResponses();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.main}>
        <div className={styles.section}>
          {/* <form onSubmit={handleNewChat}> */}
          <button className={styles.button} onClick={handleNewChat}>
            <span>New Chat</span> <img src={AddIcon} alt='add icon' />
          </button>
          {/* </form> */}
          {!error && chatList?.length > 0 && (
            <>
              <Content cn={styles.tab} sx={{ marginBlock: 0, marginTop: 30 }}>
                <button
                  onClick={() =>
                    navigate(`/details/${chatList[0]?.reference_no}`)
                  }
                >
                  {chatList[0]?.title}
                </button>
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
                    <button
                      onClick={() => navigate(`/details/${item?.reference_no}`)}
                    >
                      {item.title}
                    </button>
                  </Content>
                ))
              ) : (
                <>
                  <Content cn={styles.tab} sx={{ marginBlock: 0 }}>
                    <button
                      onClick={() =>
                        navigate(`/details/${chatList[1]?.reference_no}`)
                      }
                    >
                      {chatList[1]?.title}
                    </button>
                  </Content>
                  <Content cn={styles.tab} sx={{ marginBlock: 0 }}>
                    <button
                      onClick={() =>
                        navigate(`/details/${chatList[2]?.reference_no}`)
                      }
                    >
                      {chatList[2]?.title}
                    </button>
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
