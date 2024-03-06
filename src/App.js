import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileInfo from './pages/ProfileInfo';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth/profile' element={<ProfileInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
