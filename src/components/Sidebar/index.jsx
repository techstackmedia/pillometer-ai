import { useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Content from '../shared/Content';
import styles from './index.module.css';
import { NewPostContext } from '../../context/Chat/NewPost';
import { WebSocketContext } from '../../context/Chat/Service';
import { ChatDetailContext } from '../../context/ChatDetail';
import { WSS_CHAT_URL, token } from '../../constants';
import AddIcon from '../../images/add.png';
import editPenIcon from '../../images/editPen.png';
import Alert from '../shared/Alert';

const Sidebar = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { handleChatQAResponses, chat } =
    useContext(ChatDetailContext);
  const { createNewPost } = useContext(NewPostContext);
  const { newPostData, connectWebSocket } = useContext(WebSocketContext);
  const { serverError } = useContext(ChatDetailContext);
  const { reference_no } = useParams();
  const referenceNo = newPostData?.reference_no;
  const id = referenceNo ?? reference_no ?? state?.data?.reference_no;

  const chatList = chat?.results;
  const path = pathname.split('/');
  const handleNewChat = () => {
    createNewPost();
    if (id) {
      connectWebSocket(`${WSS_CHAT_URL}${id}`, token);
      handleChatQAResponses(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleNewChatAlt = () => {
    createNewPost();
    navigate(`/details/${id}`);
    handleChatQAResponses(id);
  };

  const onClick = path.includes('details') ? handleNewChat : handleNewChatAlt;

  const navigateToChat = (reference_no) => {
    handleChatQAResponses(reference_no);
    navigate(`/details/${reference_no}`);
    window.location.href = `/details/${reference_no}`
    handleChatQAResponses(reference_no);
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
    <>
      {serverError && (
        <div className='bottomError'>
          <Alert>Server Error Occured. Reloading Page...</Alert>
        </div>
      )}
      <div className={styles.sidebar}>
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
