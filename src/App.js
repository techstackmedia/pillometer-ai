import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileInfo from './pages/ProfileInfo';
import Home from './pages/Home';
import Community from './pages/Community';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth/profile' element={<ProfileInfo />} />
          <Route path='/community' element={<Community />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
