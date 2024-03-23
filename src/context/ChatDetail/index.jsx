// ChatDetailProvider
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';
import { NewPostContext } from '../Chat/NewPost';

const ChatDetailContext = createContext();

const ChatDetailProvider = ({ children }) => {
  const { newPostData } = useContext(WebSocketContext);
  const { res, Ref } = useContext(NewPostContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname } = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);
  const referenceNo = newPostData?.reference_no;
  const navigate = useNavigate();
  const { reference_no } = useParams();

  const handleChatQAResponses = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${BASE_CHAT_URL}/${id}/messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          navigate(`/details/${Ref || referenceNo}/`);
          setChats(data);
          if (res && data?.results?.length === 0 && newPostData) {
            window.location.href = `/details/${Ref || referenceNo}/`;
          }
        } else {
          setErr(data?.details);
          setTimeout(() => {
            setErr(null);
          }, 3000);
        }
      } catch (e) {
        setError(e.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    },
    [Ref, navigate, newPostData, referenceNo, res]
  );

  useEffect(() => {
    if (newPostData && pathname !== '/') {
      handleChatQAResponses(reference_no);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChatQAResponses, newPostData]);

  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const chatResponses = chats?.results;

  const values = {
    handleChatQAResponses,
    chats,
    chatResponses,
    error,
    err,
    refreshComponent,
    refreshKey,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
