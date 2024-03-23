import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkStatusContext = createContext();

const NetworkStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, [navigate]);

  const values = { isOnline };

  return (
    <NetworkStatusContext.Provider value={values}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export { NetworkStatusProvider, NetworkStatusContext };
