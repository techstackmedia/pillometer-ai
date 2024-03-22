import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Community from './pages/Community';
import ChatQADetail from './pages/ChatQADetail';
import Auth from './pages/Auth';
import { AuthSigninProvider } from './context/Auth/Signin';
import EmailVerification from './pages/EmailVerification';
import { AuthSignupProvider } from './context/Auth/Register';
import Profile from './pages/Profile';
import { AuthProfileProvider } from './context/Auth/Profile';
import { AuthForgotPasswordProvider } from './context/Auth/ForgotPassword';
import PasswordVerification from './pages/PasswordVerification';
import { AuthResetPasswordProvider } from './context/Auth/ResetPassword';
import ResetPassword from './pages/ResetPassword';
import { WebSocketProvider } from './context/Chat/Service';
import { NewPostProvider } from './context/Chat/NewPost';
import { ChatDetailProvider } from './context/ChatDetail';
import NotFoundPage from './pages/Error/404';
import { useContext } from 'react';
import {
  NetworkStatusContext,
  NetworkStatusProvider,
} from './context/NetworkStatus';

import Alert from './components/shared/Alert';

function App() {
  const isOnline = useContext(NetworkStatusContext);

  return (
    <BrowserRouter>
      <NetworkStatusProvider>
        {!isOnline ? (
          <AuthSignupProvider>
            <AuthSigninProvider>
              <AuthProfileProvider>
                <AuthForgotPasswordProvider>
                  <AuthResetPasswordProvider>
                    <NewPostProvider>
                      <WebSocketProvider>
                        <ChatDetailProvider>
                          <Routes>
                            <Route index element={<Home />} />
                            <Route path='/auth/login' element={<Auth />} />
                            <Route path='/auth/register' element={<Auth />} />
                            <Route
                              path='/auth/password-verification'
                              element={<PasswordVerification />}
                            />
                            <Route
                              path='/auth/email-verification'
                              element={<EmailVerification />}
                            />
                            <Route
                              path='/reset-password'
                              element={<ResetPassword />}
                            />
                            <Route path='/auth/profile' element={<Profile />} />
                            <Route path='/community' element={<Community />} />
                            <Route
                              path='/details/:reference_no'
                              element={<ChatQADetail />}
                            />
                            <Route path='*' element={<NotFoundPage />} />
                          </Routes>
                        </ChatDetailProvider>
                      </WebSocketProvider>
                    </NewPostProvider>
                  </AuthResetPasswordProvider>
                </AuthForgotPasswordProvider>
              </AuthProfileProvider>
            </AuthSigninProvider>
          </AuthSignupProvider>
        ) : (
          <div className='network'>
            <Alert>
              You are offline. Please check your network connection.
            </Alert>
            <img
              width='48'
              height='48'
              src='https://img.icons8.com/color/48/wifi-off.png'
              alt='wifi-off'
            />
          </div>
        )}
      </NetworkStatusProvider>
    </BrowserRouter>
  );
}

export default App;
