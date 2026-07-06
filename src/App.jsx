import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Nav, Footer } from './components/common.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Programs from './pages/Programs.jsx';
import Schedule from './pages/Schedule.jsx';
import Contact from './pages/Contact.jsx';
import Calculator from './pages/Calculator.jsx';
import Admin from './pages/Admin.jsx';
import Blog from './pages/Blog.jsx';

const WA_URL = 'https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs.';
const onEnquire = () => window.open(WA_URL, '_blank');

function SiteInner() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState(() => {
    try { return localStorage.getItem('swa-dark') === 'true'; } catch (e) { return false; }
  });
  const [activeProgramId, setActiveProgramId] = React.useState(null);

  const toggleDark = React.useCallback(() => {
    setIsDark((d) => {
      const next = !d;
      try { localStorage.setItem('swa-dark', next); } catch (e) {}
      return next;
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.palette = isDark ? 'dark' : 'boutique';
  }, [isDark]);

  const navigatePage = (id) => {
    if (id === 'home') navigate('/');
    else navigate('/' + id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openProgram = (id) => {
    setActiveProgramId(id);
    navigate('/programs');
    window.scrollTo(0, 0);
  };

  const currentPage = window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1).split('/')[0];

  return (
    <div className="site-shell">
      <Nav page={currentPage} setPage={navigatePage} onEnquire={onEnquire} isDark={isDark} toggleDark={toggleDark} />
      <Routes>
        <Route path="/" element={<Home setPage={navigatePage} onEnquire={onEnquire} onOpenProgram={openProgram} />} />
        <Route path="/about" element={<About setPage={navigatePage} onEnquire={onEnquire} />} />
        <Route path="/programs" element={<Programs activeId={activeProgramId} setActiveId={setActiveProgramId} onEnquire={onEnquire} setPage={navigatePage} />} />
        <Route path="/schedule" element={<Schedule onEnquire={onEnquire} />} />
        <Route path="/contact" element={<Contact onEnquire={onEnquire} />} />
        <Route path="/calculator" element={<Calculator onEnquire={onEnquire} setPage={navigatePage} />} />
        <Route path="/blog" element={<Blog onEnquire={onEnquire} />} />
        <Route path="/blog/:slug" element={<Blog onEnquire={onEnquire} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer setPage={navigatePage} onEnquire={onEnquire} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<SiteInner />} />
      </Routes>
    </BrowserRouter>
  );
}
