const Content = ({ cn, sx, children }) => {
  return (
    <div className={cn} style={sx}>
      {children}
    </div>
  );
};

export default Content;
