import Authentication from '../../components/Auth';
import OAuthorization from '../../components/OAuth';

const Auth = () => {
  return (
    <div className='App'>
      <Authentication />
      <div className='AuthOrLine'>
        <p className='or'>
          <span style={{ fontSize: 12 }}>OR</span>
        </p>
      </div>
      <OAuthorization />
    </div>
  );
};

export default Auth;
