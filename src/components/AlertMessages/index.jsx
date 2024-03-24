import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NewPostContext } from '../../context/Chat/NewPost';
import { ChatDetailContext } from '../../context/ChatDetail';
import { WebSocketContext } from '../../context/Chat/Service';
import Alert from '../shared/Alert';
import { useLocation } from 'react-router-dom';
import { AuthSigninContext } from '../../context/Auth/Signin';
import styles from './index.module.css';

const AlertMessages = () => {
  const { state } = useLocation();
  const errorAltMessage = useContext(NewPostContext);
  const responseMessage = useContext(NewPostContext);
  const errorMessage = useContext(NewPostContext);
  const serverError = useContext(ChatDetailContext);
  const err = useContext(ChatDetailContext);
  const connectionErrorMessage = useContext(WebSocketContext);
  const connectionMessage = useContext(WebSocketContext);
  const connectionWarnMessage = useContext(WebSocketContext);
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const profile = state?.profile;
  const status = state?.status;
  const token = state?.token;
  const { successMessage } = useContext(AuthSigninContext);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
      setShowProfileAlert(true);
      setTimeout(() => {
        setShowProfileAlert(false);
      }, 3000);
    }
  }, [profile]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const renderAlert = (message) => (
    <div className={styles.pageAlert}>
      <Alert>{message}</Alert>
    </div>
  );
  const serverErr = (
    <>
      Server error occurred. Please <a href={window.location.href}>try again</a>
    </>
  );

  return (
    <>
      {status && successMessage && renderAlert('Login Successful')}
      {errorAltMessage && renderAlert(errorAltMessage)}
      {err && renderAlert(err)}
      {showProfileAlert && renderAlert(profile)}
      {responseMessage?.statusText && renderAlert(responseMessage.statusText)}
      {connectionErrorMessage && renderAlert(connectionErrorMessage)}
      {errorMessage &&
        serverError &&
        errorMessage &&
        err &&
        renderAlert(
          <>
            Oops! Server stopped working. Please{' '}
            <a href={window.location.href}>try again</a>
          </>
        )}
      {connectionMessage && renderAlert(connectionMessage)}
      {connectionWarnMessage && renderAlert(connectionWarnMessage)}
      {serverError && renderAlert(serverErr)}
    </>
  );
};

export default AlertMessages;
