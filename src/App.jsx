import React from 'react';
import { Nav, Footer, ThemeSwitch } from './components/common.jsx';
import { EnquiryModal } from './pages/Contact.jsx';
import { PROGRAMS } from './data/programs.js';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Programs from './pages/Programs.jsx';
import Schedule from './pages/Schedule.jsx';
import Contact from './pages/Contact.jsx';
import Calculator from './pages/Calculator.jsx';

export default function App() {
  const [palette, setPaletteState] = React.useState(() => {
    try { return localStorage.getItem('swa-palette') || 'default'; } catch (e) { return 'default'; }
  });
  const [page, setPage] = React.useState('home');
  const [activeProgramId, setActiveProgramId] = React.useState(null);
  const [enquiryOpen, setEnquiryOpen] = React.useState(false);

  const setPalette = React.useCallback((v) => {
    setPaletteState(v);
    try { localStorage.setItem('swa-palette', v); } catch (e) {}
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.palette = palette === 'default' ? '' : palette;
  }, [palette]);

  const onEnquire = () => setEnquiryOpen(true);

  const openProgram = (id) => {
    setActiveProgramId(id);
    setPage('programs');
    window.scrollTo(0, 0);
  };

  const navigatePage = (id) => {
    setPage(id);
    if (id !== 'programs') setActiveProgramId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  let content;
  if (page === 'home') content = <Home setPage={navigatePage} onEnquire={onEnquire} onOpenProgram={openProgram} />;
  else if (page === 'about') content = <About setPage={navigatePage} onEnquire={onEnquire} />;
  else if (page === 'programs') content = <Programs activeId={activeProgramId} setActiveId={setActiveProgramId} onEnquire={onEnquire} setPage={navigatePage} />;
  else if (page === 'schedule') content = <Schedule onEnquire={onEnquire} />;
  else if (page === 'contact') content = <Contact onEnquire={onEnquire} />;
  else if (page === 'calculator') content = <Calculator onEnquire={onEnquire} setPage={navigatePage} />;

  return (
    <div className="site-shell">
      <Nav page={page} setPage={navigatePage} onEnquire={onEnquire} />
      {content}
      <Footer setPage={navigatePage} onEnquire={onEnquire} />

      <ThemeSwitch palette={palette} setPalette={setPalette} />

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialProgram={activeProgramId ? PROGRAMS.find((p) => p.id === activeProgramId)?.name : null}
      />
    </div>
  );
}
