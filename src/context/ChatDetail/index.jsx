import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';
import { NewPostContext } from '../Chat/NewPost';
import { defaultChatDetailsValues } from '../defaultValues';

const ChatDetailContext = createContext(defaultChatDetailsValues);

const ChatDetailProvider = ({ children }) => {
  const { newPostData } = useContext(WebSocketContext);
  const { Ref } = useContext(NewPostContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname, state } = useLocation();
  const referenceNo = newPostData?.reference_no;
  const { reference_no } = useParams();
  const [serverError, setServerError] = useState(null);
  const [chat, setChat] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const chatId = chat?.results[0]?.reference_no;
  const id = pathname.split('/details/')[1];
  const idx =
    id ?? Ref ?? referenceNo ?? state?.data?.reference_no ?? reference_no;
  const path = pathname.split('/');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (token) {
      handleChatList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatList = async () => {
    try {
      if (path) {
        const response = await fetch(BASE_CHAT_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setChat(data);
          if (data?.count === 0 && !redirectToDetails) {
            setRedirectToDetails(true);
            handleChatList();
            return;
          }
        }
      }
    } catch (e) {
      setServerError(e.message);
      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };

  const handleChatQAResponses = async () => {
    setIsSendingMessage(true);
    setPageLoading(true);
    let endpoint = '';
    if (idx) {
      endpoint = `${BASE_CHAT_URL}/${idx}/messages?page=${page}`;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setChats(data);
        setMessages((prev) => {
          const newMessages = data?.results?.filter((newMessage) => {
            return !prev.some(
              (prevMessage) => prevMessage.id === newMessage.id
            );
          });
          return [...prev, ...newMessages];
        });
        setHasMore(data.next !== null);
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
    } finally {
      setIsSendingMessage(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !pageLoading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, pageLoading]);

  useEffect(() => {
    handleChatQAResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, page]);

  const values = {
    handleChatQAResponses,
    chats,
    error,
    err,
    messages,
    page,
    serverError,
    handleChatList,
    redirectToDetails,
    chat,
    chatId,
    isSendingMessage,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
