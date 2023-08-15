import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Weather from './pages/weather';
import Travel from './pages/travel';
import News from './pages/news';

import Sidebar from './components/sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/news" element={<News />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
