import React, { createContext, useState, useEffect } from 'react';
import { connectWebSocket, disconnect, sendMessage } from './websocket';
import { WSS_CHAT_URL } from '../../../constants';
import { useLocation } from 'react-router-dom';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { token } from '../../../constants';

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
  const valueLength = value?.length;
  const [viewMore, setViewMore] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState(transcript);
  const [connectionMessage, setConnectionMessage] = useState(null);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState(null);
  const [connectionWarnMessage, setConnectionWarnMessage] = useState(null);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    console.log(selectedSymptoms);
  }, [selectedSymptoms]);

  const handleInputChange = (e) => {
    const symptomValue = e.target.value;
    if (e.target.checked) {
      setSelectedSymptoms((prevState) => [...prevState, symptomValue]);
    } else {
      setSelectedSymptoms((prevState) =>
        prevState.filter((item) => item !== symptomValue)
      );
    }
  };
  const mySymptoms = selectedSymptoms.join(', ');
  console.log(mySymptoms);

  useEffect(() => {
    if (transcript) {
      setTranscription(transcript);
    }
  }, [transcript]);

  const handleViewMoreClick = () => {
    setViewMore(!viewMore);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setTranscription(e.target.value);
  };
  useEffect(() => {
    if (transcript) {
      setHeight(351);
    } else {
      setHeight(32);
    }
  }, [listening, transcript]);

  useEffect(() => {
    if (valueLength > 0) {
      setViewMore(false);
    }
  }, [setViewMore, valueLength]);

  const startListening = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      console.error("Browser doesn't support speech recognition.");
    }
  };

  const stopListening = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.abortListening();
    } else {
      console.error("Browser doesn't support speech recognition.");
    }
  };

  const handleNewPostCreation = () => {
    if (newPostData && !socket) {
      const chatUrl = `${WSS_CHAT_URL}${newPostData.reference_no}/`;
      const newSocket = connectWebSocket(chatUrl, token);

      newSocket.onopen = () => {
        setConnectionMessage('WebSocket connected');
        setIsWebSocketConnected(true);
        setTimeout(() => {
          setConnectionMessage(null);
        }, 3000);
      };

      newSocket.onerror = (error) => {
        setConnectionErrorMessage(error.message);
        setIsWebSocketConnected(false);
        setTimeout(() => {
          setConnectionErrorMessage(null);
        }, 3000);
      };

      newSocket.onclose = () => {
        setConnectionWarnMessage('WebSocket closed');
        setIsWebSocketConnected(false);
        setTimeout(() => {
          setConnectionWarnMessage(null);
        }, 3000);
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
  };

  const handleTextToSpeech = (message) => {
    if ('speechSynthesis' in window) {
      if (message) {
        if (!isSpeaking) {
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
          };
          window.speechSynthesis.speak(utterance);
          setIsSpeaking(true);
        } else {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
        }
      }
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  useEffect(() => {
    handleNewPostCreation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        connectionErrorMessage,
        connectionMessage,
        connectionWarnMessage,
        response,
        handleViewMoreClick,
        height,
        handleChange,
        handleNewPostCreation,
        startListening,
        stopListening,
        setViewMore,
        handleTextToSpeech,
        value,
        transcript,
        valueLength,
        listening,
        newPostData,
        transcription,
        setHeight,
        setValue,
        connectWebSocket,
        isWebSocketConnected,
        handleInputChange,
        selectedSymptoms,
        mySymptoms,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
