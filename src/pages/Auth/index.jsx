import { useState } from 'react';
import AuthLiner from '../../components/AuthLiner';
import Authentication from '../../components/Authentication';
import OAuthorization from '../../components/OAuthorization';

const Auth = () => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const navigateToNextPage = () => {
    setIsCurrentPage(true);
  };

  return (
    <div className='App'>
      <Authentication
        navigateToNextPage={navigateToNextPage}
        isCurrentPage={isCurrentPage}
      />
      <AuthLiner isCurrentPage={isCurrentPage} />
      <OAuthorization isCurrentPage={isCurrentPage} />
    </div>
  );
};

export default Auth;
