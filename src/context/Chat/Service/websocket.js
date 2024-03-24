export const connectWebSocket = (url, token) => {
  const authenticatedUrl = `${url}?token=${token}`;
  const socket = new WebSocket(authenticatedUrl);
  let text;
  socket.onopen = () => {
    text = 'WebSocket connected';
    return text;
  };

  socket.onerror = (error) => {
    localStorage.setItem('WebSocket error', error);
    setTimeout(() => {
      localStorage.removeItem('WebSocket error');
    }, 3000);
  };

  socket.onclose = () => {
    localStorage.setItem('WebSocket closed', 'WebSocket closed');
    setTimeout(() => {
      localStorage.removeItem('WebSocket closed');
    }, 3000);
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
