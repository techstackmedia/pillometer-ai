import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../shared/Content';
import styles from './index.module.css';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WebSocketContext } from '../../context/Chat/Service';
import { ChatDetailContext } from '../../context/ChatDetail';
import { BASE_CHAT_URL, token } from '../../constants';
import AddIcon from '../../images/add.png';
import editPenIcon from '../../images/editPen.png';

const Sidebar = () => {
  const [chatList, setChatList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { createNewPost, res } = useContext(NewPostContext);
  const { newPostData, response } = useContext(WebSocketContext);

  useEffect(() => {
    handleChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPostData, res, response, navigate]);

  const location = useLocation();
  const Ref = location.state?.data;

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
        setChatList(res ? [data?.results, ...Ref] : data?.results);
      }
    } catch (e) {
      console.error('Error fetching chat list:', e.message);
    }
  };

  const handleNewChat = () => {
    createNewPost();
    handleChatQAResponses();
  };

  const navigateToChat = (reference_no) => {
    navigate(`/details/${reference_no}`);
    handleChatQAResponses();
    window.scrollBy({ behavior: 'smooth', bottom: 0 });
  };

  const renderSection = (title, items) => (
    <div className={styles.section}>
      <Content cn={styles.paragraph}>{title}</Content>
      {items.map((item, index) => (
        <Content key={index} cn={styles.tab}>
          {item}
        </Content>
      ))}
    </div>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.main}>
        <div className={styles.section}>
          <button
            type='button'
            className={styles.button}
            onClick={handleNewChat}
          >
            <span>New Chat</span> <img src={AddIcon} alt='add icon' />
          </button>
          {chatList?.length > 0 && (
            <>
              <Content
                cn={`${styles.tab}`}
                sx={{ marginBlock: 0, marginTop: 30 }}
              >
                <button
                  type='button'
                  onClick={() => navigateToChat(chatList[0]?.reference_no)}
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
                  <Content
                    key={index}
                    cn={`${styles.tab}`}
                    sx={{ marginBlock: 0 }}
                  >
                    <button
                      type='button'
                      onClick={() => navigateToChat(item.reference_no)}
                    >
                      {item.title}
                    </button>
                  </Content>
                ))
              ) : (
                <>
                  {chatList.slice(1, 3).map((item, index) => (
                    <Content
                      key={index}
                      cn={`${styles.tab}`}
                      sx={{ marginBlock: 0 }}
                    >
                      <button
                        type='button'
                        onClick={() => navigateToChat(item.reference_no)}
                      >
                        {item.title}
                      </button>
                    </Content>
                  ))}
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
        {renderSection('Libraries', ['Symptoms', 'Conditions'])}
        {renderSection('Near Me', ['Pharmacies', 'Hospitals'])}
        <div className={styles.section}>
          <Content
            handleContentClick={() => navigate('/community')}
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
