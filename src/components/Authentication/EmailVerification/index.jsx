import Content from '../../shared/Content';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import styles from './index.module.css';
import { useContext } from 'react';
import { AuthForgotPasswordResetContext } from '../../../context/Auth/ForgotPassword';
import Alert from '../../shared/Alert';

const EmailVerification = () => {
  const {
    email,
    handleForgotPasswordSubmit,
    handleEmailChange,
    forgotPasswordSuccessMessage,
    forgotPasswordErrorMessage,
    forgotPasswordErrorAltMessage,
  } = useContext(AuthForgotPasswordResetContext);

  return (
    <>
      <div className={styles.alert}>
        {forgotPasswordSuccessMessage ? (
          <Alert>
            <Content cn={`heading ${styles.heading}`}>
              {forgotPasswordSuccessMessage}
            </Content>
            <Content cn={`paragraph ${styles.paragraph}`}>
              We just sent a message to the email you provided with a link to
              reset your password. Please check your inbox and follow the
              instructions in the email.
            </Content>
          </Alert>
        ) : (
          forgotPasswordErrorMessage ||
          (forgotPasswordErrorAltMessage && (
            <Alert>
              <Content className={`heading ${styles.heading}`}>
                {forgotPasswordErrorMessage}
              </Content>
              <Content className={`paragraph ${styles.paragraph}`}>
                {forgotPasswordErrorAltMessage}
              </Content>
            </Alert>
          ))
        )}
      </div>
      <form
        onSubmit={handleForgotPasswordSubmit}
        className={styles.formEmailVerification}
      >
        <Content cn={`heading ${styles.heading} ${styles.newHeading}`}>
          {forgotPasswordSuccessMessage
            ? 'Password Reset Sent'
            : 'Email Verification'}
        </Content>

        <Input
          type='email'
          name='email'
          value={email}
          handleEmailChange
          onChange={handleEmailChange}
          placeholder='Enter your email'
        />
        <Button
          disabled={forgotPasswordSuccessMessage ? true : false}
          type='submit'
        >
          Verify Your Email
        </Button>

        <Content cn={`paragraph ${styles.paragraph}`}>
          Navigate to your email inbox with the subject line{' '}
          <strong>Pilometer Team</strong>.
        </Content>
      </form>
    </>
  );
};

export default EmailVerification;
