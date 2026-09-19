import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./Pages/Home'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Settings = lazy(() => import('./Pages/Settings'));
const About = lazy(() => import('./Pages/About'));

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">მთავარი</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">პარამეტრები</Link>
        <Link to="/about">ჩვენს შესახებ</Link>
      </nav>
      <Suspense fallback={<div style={{ padding: '20px' }}>იტვირთება...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;