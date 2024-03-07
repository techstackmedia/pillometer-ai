const Content = ({ cn, sx, children, handleContentClick }) => {
  return (
    <div className={cn} style={sx} onClick={handleContentClick}>
      {children}
    </div>
  );
};

export default Content;
