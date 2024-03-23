import { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Content from '../shared/Content';
import styles from './index.module.css';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WebSocketContext } from '../../context/Chat/Service';
import { ChatDetailContext } from '../../context/ChatDetail';
import { BASE_CHAT_URL, WSS_CHAT_URL, token } from '../../constants';
import AddIcon from '../../images/add.png';
import editPenIcon from '../../images/editPen.png';

const Sidebar = () => {
  // const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleChatQAResponses } = useContext(ChatDetailContext);
  const { createNewPost, res, Ref } = useContext(NewPostContext);
  const { newPostData, connectWebSocket, isWebSocketConnected } =
    useContext(WebSocketContext);
  const { reference_no } = useParams();

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
        setChat(data);
      }
    } catch (e) {
      console.error('Error fetching chat list:', e.message);
    }
  };
  let chatList = chat?.results;

  if (res) {
    chatList = chat?.results;
  }

  useEffect(() => {
    // if (chat?.results?.length > 0) {
    handleChatList();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference_no]);

  const handleNewChat = useCallback(() => {
    createNewPost();
    if (newPostData?.reference_no ?? Ref ?? reference_no) {
      connectWebSocket(
        `${WSS_CHAT_URL}${reference_no ?? newPostData?.reference_no}`,
        token
      );
      handleChatQAResponses(reference_no);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebSocketConnected]);

  const navigateToChat = async (reference_no) => {
    await handleChatQAResponses(reference_no);
    navigate(`/details/${reference_no}`);
    window.scrollBy({ behavior: 'smooth', top: 0 });
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
            <div className={styles.dGap}>
              <Content
                cn={`${styles.tab} ${
                  pathname === `/details/${chatList[0]?.reference_no}`
                    ? styles.active
                    : undefined
                }`}
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
                    cn={`${styles.tab} ${
                      pathname === `/details/${item.reference_no}`
                        ? styles.active
                        : undefined
                    }`}
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
                      cn={`${styles.tab} ${
                        pathname === `/details/${item.reference_no}`
                          ? styles.active
                          : undefined
                      }`}
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
            </div>
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
          <Content
            handleContentClick={() => navigate('/help-feedback')}
            cn={`${styles.tab} ${
              pathname === '/help-feedback' ? styles.active : undefined
            }`}
          >
            Help & Feedback
          </Content>
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
