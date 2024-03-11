import Content from '../shared/Content';
import Input from '../shared/Input';
import Button from '../shared/Button';
import styles from './index.module.css';

const Verification = ({ email }) => {
  const isDisabled = Boolean(email) === false ? true : false;
  const emailAddress = `https://${email?.split('@')[1]}`;
  const handleVerificationEmailClick = () => {
    window.open(emailAddress, '_blank', 'noreferrer');
  };
  // const details = 'password reset email sent';
  const details = '';
  // register and forgot password to share one page
  return (
    <form className={styles.formEmailVerification}>
      <Content cn={`heading ${styles.heading}`}>
        {details ? 'Request Password Reset' : 'Email Verification'}
      </Content>
      {details ? (
        <Input type='email' name='email' placeholder='Enter your email' />
      ) : null}
      <Button
        disabled={isDisabled}
        type={details ? 'submit' : 'button'}
        handlePageNavigation={handleVerificationEmailClick}
      >
        {details ? 'Request Password Reset' : 'Verify Your Email'}
      </Button>

      <Content cn={`paragraph ${styles.paragraph}`}>
        Navigate to your email inbox with the subject line{' '}
        <strong>Pilometer Team</strong>.
      </Content>
    </form>
  );
};

export default Verification;
