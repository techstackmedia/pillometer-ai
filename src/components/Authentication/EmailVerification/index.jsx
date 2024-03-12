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
    resetPasswordSuccessMessage,
    resetPasswordErrorMessage,
    resetPasswordErrorAltMessage,
  } = useContext(AuthForgotPasswordResetContext);

  return (
    <>
      <div className={styles.alert}>
        {resetPasswordSuccessMessage ? (
          <Alert>
            <Content>{resetPasswordSuccessMessage}</Content>
          </Alert>
        ) : (
          <Alert>
            <Content className={`heading ${styles.heading}`}>
              {resetPasswordErrorMessage}
            </Content>
            <Content className={`paragraph ${styles.paragraph}`}>
              {resetPasswordErrorAltMessage}
            </Content>
          </Alert>
        )}
      </div>
      <form
        onSubmit={handleForgotPasswordSubmit}
        className={styles.formEmailVerification}
      >
        <Content cn={`heading ${styles.heading}`}>Email Verification</Content>

        <Input
          type='email'
          name='email'
          value={email}
          handleEmailChange
          onChange={handleEmailChange}
          placeholder='Enter your email'
        />
        <Button type='submit'>Verify Your Email</Button>

        <Content cn={`paragraph ${styles.paragraph}`}>
          Navigate to your email inbox with the subject line{' '}
          <strong>Pilometer Team</strong>.
        </Content>
      </form>
    </>
  );
};

export default EmailVerification;
