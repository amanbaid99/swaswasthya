import React from 'react';
import posthog from 'posthog-js';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Nav, Footer } from './components/common.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Programs from './pages/Programs.jsx';
import Contact from './pages/Contact.jsx';
import Calculator from './pages/Calculator.jsx';
import Admin from './pages/Admin.jsx';
import Blog from './pages/Blog.jsx';

const WA_URL = 'https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs.';
const openWhatsApp = () => window.open(WA_URL, '_blank');
const onEnquire = (source) => {
  posthog.capture('enquiry_initiated', { source: typeof source === 'string' ? source : 'home_hero' });
  openWhatsApp();
};

function SiteInner() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState(() => {
    try { return localStorage.getItem('swa-dark') === 'true'; } catch (e) { return false; }
  });
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

  const currentPage = window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1).split('/')[0];

  return (
    <div className="site-shell">
      <Nav page={currentPage} setPage={navigatePage} onEnquire={onEnquire} isDark={isDark} toggleDark={toggleDark} />
      <Routes>
        <Route path="/" element={<Home setPage={navigatePage} onEnquire={onEnquire} onOpenProgram={(id) => { navigate('/programs/' + id); window.scrollTo(0, 0); }} />} />
        <Route path="/about" element={<About setPage={navigatePage} onEnquire={onEnquire} />} />
        <Route path="/programs" element={<Programs onEnquire={onEnquire} setPage={navigatePage} />} />
        <Route path="/programs/:id" element={<Programs onEnquire={onEnquire} setPage={navigatePage} />} />
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
