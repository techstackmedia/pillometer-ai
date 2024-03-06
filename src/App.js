import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
