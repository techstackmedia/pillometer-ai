import { createContext, useState, useEffect } from 'react';
import { connectWebSocket, disconnect, sendMessage } from './websocket';
import { CHAT_URL } from '../../../constants';
import { useLocation } from 'react-router-dom';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const newPostData = location.state?.data;

  const [viewMore, setViewMore] = useState(false);

  const handleViewMoreClick = () => {
    if (viewMore === false) {
      setViewMore(!viewMore);
    } else {
      setViewMore(false);
    }
  };

  useEffect(() => {
    if (newPostData) {
      const chatUrl = `${CHAT_URL}${newPostData.reference_no}/`;
      // const chatUrl = `${CHAT_URL}chtKMKGDTC/`;
      console.log(chatUrl);
      const token = localStorage.getItem('token');
      const newSocket = connectWebSocket(chatUrl, token);
      console.log(newSocket);

      newSocket.onopen = () => {
        console.log('WebSocket connected');
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      newSocket.onclose = () => {
        console.log('WebSocket closed');
      };

      newSocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log(receivedMessage);
        setResponse(receivedMessage.message); // Update response state with the message
      };

      setSocket(newSocket);

      return () => {
        disconnect(newSocket);
      };
    }
  }, [newPostData]);

  const sendMessageToServer = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageToSend = {
        message,
        user_type: 'personal',
        message_type: 'symptom',
        symptoms: [3, 4],
        conditions: [4, 5],
      };
      sendMessage(socket, messageToSend);
    } else {
      console.error('WebSocket not connected');
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ sendMessageToServer, response, handleViewMoreClick }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
