import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import TrashPage from './pages/TrashPage';
import ArchivedPage from './pages/ArchivedPage';

function App() { 
  return (
    <div className='h-[100vh] overflow-y-auto'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/archive" element={<ArchivedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
