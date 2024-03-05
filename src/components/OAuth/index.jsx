import Button from '../shared/Button';

const OAuth = () => {
  const buttonStyles = {
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid #c5c4d4',
    marginBlock: 20,
  };
  return (
    <div style={{ marginTop: 10 }}>
      <Button className='mediaImage' sx={buttonStyles}>
        Continue with Google
      </Button>
      <Button className='mediaImage' sx={buttonStyles}>
        Continue with Facebook
      </Button>
      <Button className='mediaImage' sx={buttonStyles}>
        Continue with Apple
      </Button>
    </div>
  );
};

export default OAuth;
