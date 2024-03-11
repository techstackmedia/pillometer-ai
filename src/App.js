import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileInfo from './pages/ProfileInfo';
import Home from './pages/Home';
import Community from './pages/Community';
import ChatQADetail from './pages/ChatQADetail';
import Auth from './pages/Auth';
import { AuthSigninProvider } from './context/Auth/Signin';
import EmailVerification from './pages/EmailVerification';
import { AuthSignupProvider } from './context/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthSignupProvider>
        <AuthSigninProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/auth/login' element={<Auth />} />
            <Route path='/auth/register' element={<Auth />} />
            <Route
              path='/auth/email-verification'
              element={<EmailVerification />}
            />
            <Route path='/auth/profile' element={<ProfileInfo />} />
            <Route path='/community' element={<Community />} />
            <Route path='/detail' element={<ChatQADetail />} />
          </Routes>
        </AuthSigninProvider>
      </AuthSignupProvider>
    </BrowserRouter>
  );
}

export default App;
