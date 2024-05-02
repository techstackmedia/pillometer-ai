import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';

const Layout = ({ children }) => {
  const { reference_no } = useParams();
  return (
    <>
      <Navbar />
      <div className='Main'>
        <Sidebar id={reference_no} />
        {children}
      </div>
    </>
  );
};

export default Layout;
