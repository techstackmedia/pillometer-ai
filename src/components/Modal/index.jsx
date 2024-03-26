const Modal = ({ children, cn, sx }) => {
  return (
    <div className={cn} style={sx}>
      {children}
    </div>
  );
};

export default Modal;
