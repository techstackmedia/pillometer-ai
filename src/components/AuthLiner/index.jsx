const AuthLiner = ({ isCurrentPage }) => {
  return isCurrentPage ? null : (
    <div className='AuthOrLine'>
      <p className='or'>
        <span style={{ fontSize: 12 }}>OR</span>
      </p>
    </div>
  );
};

export default AuthLiner;
