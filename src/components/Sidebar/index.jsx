import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../shared/Content';
import styles from './index.module.css';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WebSocketContext } from '../../context/Chat/Service';
import { ChatDetailContext } from '../../context/ChatDetail';
import { WSS_CHAT_URL, token } from '../../constants';
import AddIcon from '../../images/add.png';
import editPenIcon from '../../images/editPen.png';
import Alert from '../shared/Alert';
import { MessagesContext } from '../../context/Messages';

const Sidebar = ({ id: reference_no }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { chat } = useContext(ChatDetailContext);
  const { createNewPost, isOpen, setIsOpen } = useContext(NewPostContext);
  const { newPostData, connectWebSocket, setValue } =
    useContext(WebSocketContext);
  const { isLoginModal } = useContext(MessagesContext);
  const { serverError } = useContext(ChatDetailContext);
  const referenceNo = newPostData?.reference_no;
  const id = referenceNo ?? reference_no ?? state?.data?.reference_no;

  const chatList = chat?.results;
  const path = pathname.split('/');
  const handleNewChat = (e) => {
    if (e.target.textContent.trim() === 'New Chat') {
      setValue('');
    }
    createNewPost();
    if (id) {
      connectWebSocket(`${WSS_CHAT_URL}${id}`, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleNewChatAlt = () => {
    createNewPost();
    navigate(`/details/${id}`);
  };

  const onClick = path.includes('details') ? handleNewChat : handleNewChatAlt;

  const navigateToChat = (reference_no) => {
    navigate(`/details/${reference_no}`);
  };

  useEffect(() => {
    navigateToChat(reference_no);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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

  const closeNav = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleShortcutCloseNav = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleShortcutOpenNav = (event) => {
    if (event.shiftKey && event.key === 'O') {
      setIsOpen(true);
    }
  };

  const handleShortcutToggleNav = (event) => {
    if (event.shiftKey && event.key === 'T') {
      setIsOpen((prev) => !prev);
    }
  };

  const handleShortcutNewChat = (event) => {
    if (event.shiftKey && event.key === 'N') {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutNewChat);
    return () => {
      document.removeEventListener('keydown', handleShortcutNewChat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', closeNav);
    return () => {
      document.body.removeEventListener('click', closeNav);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutCloseNav);
    return () => {
      document.removeEventListener('keydown', handleShortcutCloseNav);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutToggleNav);
    return () => {
      document.removeEventListener('keydown', handleShortcutToggleNav);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutOpenNav);
    return () => {
      document.removeEventListener('keydown', handleShortcutOpenNav);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {serverError && (
        <div className='bottomError'>
          <Alert>Server Error Occured. Reloading Page...</Alert>
        </div>
      )}
      {isOpen ? (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      ) : null}
      <div
        className={`${styles.sidebar} ${!isOpen ? styles.none : styles.flex} ${
          isLoginModal ? styles.zIndex10 : styles.zIndex1
        }`}
      >
        <div className={styles.main}>
          <div className={styles.section}>
            <button type='button' className={styles.button} onClick={onClick}>
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
    </>
  );
};

export default Sidebar;
