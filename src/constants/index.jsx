const BASE_AUTH_URL = `${process.env.REACT_APP_HTTPS_BASE_URL}/api/v1/auth`;
const BASE_CHAT_URL = `${process.env.REACT_APP_HTTPS_BASE_URL}/api/v1/chats`;
const BASE_SERVICE_URL = process.env.REACT_APP_WSS_BASE_URL;
const WSS_CHAT_URL = `${BASE_SERVICE_URL}/ws/chat/`;
const token = localStorage.getItem('token');

export { BASE_AUTH_URL, WSS_CHAT_URL, BASE_CHAT_URL, token };
