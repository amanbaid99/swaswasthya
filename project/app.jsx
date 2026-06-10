/* app.jsx — Root app, routing, Tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "viewport": "desktop",
  "showCommunityCount": true,
  "showPress": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
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
  };

  let content;
  if (page === 'home') content = <Home setPage={navigatePage} onEnquire={onEnquire} onOpenProgram={openProgram} />;
  else if (page === 'about') content = <About setPage={navigatePage} onEnquire={onEnquire} />;
  else if (page === 'programs') content = <Programs activeId={activeProgramId} setActiveId={setActiveProgramId} onEnquire={onEnquire} setPage={navigatePage} />;
  else if (page === 'schedule') content = <Schedule onEnquire={onEnquire} />;
  else if (page === 'contact') content = <Contact onEnquire={onEnquire} />;

  const site = (
    <>
      <Nav page={page} setPage={navigatePage} onEnquire={onEnquire} />
      {content}
      <Footer setPage={navigatePage} onEnquire={onEnquire} />
    </>
  );

  return (
    <>
      {t.viewport === 'mobile' ? (
        <div className="device-stage">
          <div className="device-frame">
            <div className="notch"></div>
            <div className="scroll site-shell" data-mobile="true">
              {site}
            </div>
          </div>
        </div>
      ) : (
        <div className="site-shell">{site}</div>
      )}

      <ThemeSwitch palette={palette} setPalette={setPalette} />

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialProgram={activeProgramId ? window.PROGRAMS.find((p) => p.id === activeProgramId)?.name : null}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakSelect
          label="Theme"
          value={palette}
          options={[
            { value: 'default', label: 'Forest cream' },
            { value: 'blush', label: 'Blush-led' },
            { value: 'dark', label: 'Dark mode' },
            { value: 'boutique', label: 'Boutique off-white' },
          ]}
          onChange={(v) => setPalette(v)}
        />

        <TweakSection label="Viewport" />
        <TweakRadio
          label="Preview as"
          value={t.viewport}
          options={['desktop', 'mobile']}
          onChange={(v) => setTweak('viewport', v)}
        />

        <TweakSection label="Sections" />
        <TweakToggle
          label="Community stat"
          value={t.showCommunityCount}
          onChange={(v) => setTweak('showCommunityCount', v)}
        />
        <TweakToggle
          label="Press strip"
          value={t.showPress}
          onChange={(v) => setTweak('showPress', v)}
        />

        <TweakSection label="Jump to" />
        <TweakButton onClick={() => navigatePage('home')}>Home</TweakButton>
        <TweakButton onClick={() => navigatePage('about')}>About</TweakButton>
        <TweakButton onClick={() => navigatePage('programs')}>Programs</TweakButton>
        <TweakButton onClick={() => navigatePage('schedule')}>Schedule</TweakButton>
        <TweakButton onClick={() => navigatePage('contact')}>Contact</TweakButton>
        <TweakButton onClick={onEnquire}>Open enquiry modal</TweakButton>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
