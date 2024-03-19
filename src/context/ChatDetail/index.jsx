import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_CHAT_URL, token } from '../../constants';
import { WebSocketContext } from '../Chat/Service';
import { NewPostContext } from '../Chat/NewPost';

const ChatDetailContext = createContext();

const ChatDetailProvider = ({ children }) => {
  const { newPostData, response } = useContext(WebSocketContext);
  const { res } = useContext(NewPostContext);
  const { Ref } = useContext(NewPostContext);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const id = path[path.length - 1];

  const { reference_no } = useParams();

  const handleChatQAResponses = async () => {
    try {
      const response = await fetch(
        `${BASE_CHAT_URL}/${id ?? reference_no}/messages`,
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
        // refreshComponent();
      } else {
        setErr(data?.details);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (newPostData) {
      handleChatQAResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, response, newPostData, pathname, Ref, res]);
  const chatResponses = chats?.results;

  const values = {
    handleChatQAResponses,
    chats,
    chatResponses,
    error,
    err,
    // refreshKey,
  };

  return (
    <ChatDetailContext.Provider value={values}>
      {children}
    </ChatDetailContext.Provider>
  );
};

export { ChatDetailContext, ChatDetailProvider };
