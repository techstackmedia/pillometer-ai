import Content from '../../shared/Content';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import styles from './index.module.css';
import { useContext } from 'react';
import { AuthResetPasswordContext } from '../../../context/Auth/ResetPassword';

const ResetPassword = () => {
  const {
    password,
    handleResetPasswordSubmit,
    handlePasswordChange,
    resetPasswordErrorMessage,
    resetPasswordErrorAltMessage,
    resetPasswordSuccessMessage,
  } = useContext(AuthResetPasswordContext);
  console.log(
    resetPasswordErrorMessage,
    resetPasswordErrorAltMessage,
    resetPasswordSuccessMessage
  );
  return (
    <>
      <form
        onSubmit={handleResetPasswordSubmit}
        className={styles.formVerification}
      >
        <Content cn={`heading ${styles.heading}`}>Create New Password</Content>
        <Input
          type='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='Enter your password'
        />
        <Button type='submit'>Create New Password</Button>
      </form>
    </>
  );
};

export default ResetPassword;
