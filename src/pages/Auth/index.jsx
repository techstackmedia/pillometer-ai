import AuthLiner from '../../components/AuthLiner';
import Authentication from '../../components/Authentication';
import OAuthorization from '../../components/OAuthorization';

const Auth = () => {
  return (
    <div className='App'>
      <Authentication />
      <AuthLiner />
      <OAuthorization />
    </div>
  );
};

export default Auth;
