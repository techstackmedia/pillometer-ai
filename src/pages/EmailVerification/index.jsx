import Verification from '../../components/Verification';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';

const EmailVerification = ({ disabled }) => {
  const location = useLocation();
  const email = location?.state?.email;

  return (
    <>
      <Navbar />
      <Verification email={email} />
    </>
  );
};

export default EmailVerification;
