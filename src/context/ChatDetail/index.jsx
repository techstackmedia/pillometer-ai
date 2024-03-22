import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const path = pathname.split('/');
  const [refreshKey, setRefreshKey] = useState(0);
  const referenceNo = newPostData?.reference_no;
  const navigate = useNavigate();
  console.log(path[2], referenceNo, Ref);

  let id = '';
  if (id === path[2]) {
    id = path[2];
  } else if (id === referenceNo) {
    id = referenceNo;
  } else {
    id = Ref;
  }

  const handleChatQAResponses = async () => {
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
        navigate(`/details/${id}/`);
        setChats(data);
        if (res && data?.results?.length === 0 && newPostData) {
          window.location.href = `/details/${path[2]}/`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // useEffect(() => {
  //   if (newPostData) {
  //     handleChatQAResponses();
  //   }
  // }, [handleChatQAResponses, newPostData]);
  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const chatResponses = chats?.results;

  // useEffect(() => {
  //   if (referenceNo === undefined) {
  //     navigate('/');
  //   }
  // }, [referenceNo]);

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
