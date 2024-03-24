import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';
import { NewPostContext } from '../Chat/NewPost';

const ChatDetailContext = createContext();

const ChatDetailProvider = ({ children }) => {
  const { newPostData } = useContext(WebSocketContext);
  const { Ref } = useContext(NewPostContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname, state } = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);
  const referenceNo = newPostData?.reference_no;
  const { reference_no } = useParams();
  const [serverError, setServerError] = useState(null);
  const [serverAltError, setServerAltError] = useState(null);
  const [chat, setChat] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  useEffect(() => {
    handleChatList();
  }, [setChat]);

  const handleChatList = async () => {
    try {
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
      } else {
        setServerAltError(data?.details);
      }
    } catch (e) {
      setServerError(e.message);
    }
  };
  const chatId = chat?.results[0]?.reference_no;

  const handleChatQAResponses = async (id) => {
    try {
      if (pathname !== '/') {
        const response = await fetch(
          `${BASE_CHAT_URL}/${
            id ??
            chatId ??
            Ref ??
            referenceNo ??
            state?.data?.reference_no ??
            reference_no
          }/messages`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setChats(data);
          if (data?.count === 0 && !redirectToDetails) {
            setRedirectToDetails(true);
          }
        } else {
          setErr(data?.details);
          setTimeout(() => {
            setErr(null);
          }, 3000);
        }
      }
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    handleChatQAResponses(
      chatId ?? Ref ?? referenceNo ?? state?.data?.reference_no ?? reference_no
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference_no]);

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
    serverError,
    serverAltError,
    handleChatList,
    redirectToDetails,
    chat,
    chatId,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
