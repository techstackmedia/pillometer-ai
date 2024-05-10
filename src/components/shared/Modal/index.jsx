import { useContext, useEffect } from 'react';
import cancelIcon from '../../../images/cancel.png';
import { MessagesContext } from '../../../context/Messages';
const Modal = ({ children, cn, sx }) => {
  const { setIsLoginModal } = useContext(MessagesContext);
  const handleCancel = () => {
    setIsLoginModal(false);
  };
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      setIsLoginModal(false);
    }
  };

  useEffect(() => {
    document
      .querySelector('.modal-overlay')
      ?.addEventListener('click', closeModal);
    return () => {
      document
        .querySelector('.modal-overlay')
        ?.removeEventListener('click', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
