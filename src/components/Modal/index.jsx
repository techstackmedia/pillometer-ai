import { useContext } from 'react';
import cancelIcon from '../../images/cancel.png';
import { MessagesContext } from '../../context/Messages';
const Modal = ({ children, cn, sx }) => {
  const { setIsLoginModal } = useContext(MessagesContext);
  const handleCancel = () => {
    setIsLoginModal(false);
  };
  return (
    <div className='modal-overlay'>
      <div className={`modal ${cn}`} style={sx}>
        <img
          onClick={handleCancel}
          className='modalCancel'
          src={cancelIcon}
          alt='cancel icon'
          width={24}
          height={24}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
