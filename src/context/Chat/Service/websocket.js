export const connectWebSocket = (url, token) => {
  const authenticatedUrl = `${url}?token=${token}`;
  const socket = new WebSocket(authenticatedUrl);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket closed');
  };

  return socket;
};

export const disconnect = (socket) => {
  if (socket) {
    socket.close();
  }
};

export const sendMessage = (socket, message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket not connected');
  }
};
