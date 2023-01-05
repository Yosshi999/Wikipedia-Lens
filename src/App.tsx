import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Article from './routes/article';
import Home from './routes/home';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Wikipedia-Lens/" />} />
        <Route path="/Wikipedia-Lens/" element={<Home />} />
        <Route path="/Wikipedia-Lens/article/:title" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
