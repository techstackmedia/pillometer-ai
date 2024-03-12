import spinner from '../../images/spinner.gif';
const ResetPassword = () => {
  console.log(window.location.href);
  return (
    <div className='App'>
      <img src={spinner} alt='spinner gif' width={150} height={150} />
    </div>
  );
};

export default ResetPassword;
