import { createContext, useState, useEffect } from 'react';
import { connectWebSocket, disconnect, sendMessage } from './websocket';
import { CHAT_URL } from '../../../constants';
import { useLocation } from 'react-router-dom';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const newPostData = location.state?.data;
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(32);
  const { transcript, listening, browserSupportsContinuousListening } =
    useSpeechRecognition();
  console.log(response);

  const valueLength = value.length;

  // useEffect(() => {
  //   if (response.length > 30) {
  //     stopListening();
  //   }
  // }, [response]);

  useEffect(() => {
    if (response) {
      setHeight(32);
    }
  }, [response]);

  const [viewMore, setViewMore] = useState(false);

  const handleViewMoreClick = () => {
    if (viewMore === false) {
      setViewMore(!viewMore);
    } else {
      setViewMore(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    setValue(transcript);
    setHeight(351);
  }, [transcript, listening]);

  useEffect(() => {
    if (valueLength > 0) {
      setViewMore(false);
    }
  }, [setViewMore, valueLength]);

  const startListening = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  };

  const stopListening = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.abortListening();
    } else {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  };

  const handleTextToSpeech = () => {
    if (response) {
      const utterance = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(utterance);
    }
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (newPostData) {
      const chatUrl = `${CHAT_URL}${newPostData.reference_no}/`;
      const newSocket = connectWebSocket(chatUrl, token);

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
        setResponse(receivedMessage.message);
      };

      setSocket(newSocket);

      return () => {
        disconnect(newSocket);
      };
    }
  }, [newPostData, token]);

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
      value={{
        sendMessageToServer,
        response,
        handleViewMoreClick,
        height,
        handleChange,
        startListening,
        stopListening,
        setViewMore,
        handleTextToSpeech,
        value,
        transcript,
        valueLength,
        listening,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
