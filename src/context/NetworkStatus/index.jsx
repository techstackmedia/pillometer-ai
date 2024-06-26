import { createContext, useEffect, useState } from 'react';
import { defaultNetworkStatusValues } from '../defaultValues';

const NetworkStatusContext = createContext(defaultNetworkStatusValues);

const NetworkStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
  }, []);

  const internetConnection = isOnline
    ? null
    : 'You are offline. Please check your network connection.';

  const values = { internetConnection };

  return (
    <NetworkStatusContext.Provider value={values}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export { NetworkStatusProvider, NetworkStatusContext };
