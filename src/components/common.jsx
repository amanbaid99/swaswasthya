import React from 'react';

export const Wordmark = ({ size = 'md', oneline = false }) => {
  const sizeMap = {
    sm: { fs: '16px', ls: '0.06em' },
    md: { fs: '22px', ls: '0.06em' },
    lg: { fs: '32px', ls: '0.08em' },
  };
  const s = sizeMap[size];
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: s.fs,
      letterSpacing: s.ls,
      color: 'var(--green-deep)',
      lineHeight: 1,
      display: 'inline-flex',
      flexDirection: oneline ? 'row' : 'column',
      gap: oneline ? '8px' : 0,
    }}>
      <span>Swa-</span><span style={{ marginTop: oneline ? 0 : '-2px' }}>Swasthya</span>
    </div>
  );
};

export const Logo = ({ size = 40 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    border: '1px solid var(--green-deep)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--green-deep)',
    fontFamily: 'var(--font-display)',
    fontStyle: 'italic',
    fontSize: size * 0.42,
    flexShrink: 0,
  }}>
    s
  </div>
);

export const Nav = ({ page, setPage, onEnquire }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'contact', label: 'Contact' },
  ];

  const go = (id) => {
    setPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(240, 229, 207, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        gap: 24,
      }}>
        <a onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <Logo size={36} />
          <Wordmark size="sm" oneline />
        </a>

        <nav className="nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {items.map((it) => (
            <a
              key={it.id}
              onClick={() => go(it.id)}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                letterSpacing: '0.04em',
                color: page === it.id ? 'var(--green-deep)' : 'var(--ink-soft)',
                fontWeight: page === it.id ? 500 : 400,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {it.label}
              {page === it.id && (
                <span style={{
                  position: 'absolute',
                  bottom: 2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--clay)',
                }} />
              )}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="tel:9923086478" className="btn btn-ghost btn-sm nav-phone" style={{ display: 'inline-flex' }}>
            ☎ 99230 86478
          </a>
          <button className="btn btn-primary btn-sm" onClick={onEnquire}>
            Enquire
          </button>
          <button
            className="nav-burger"
            data-open={mobileOpen}
            aria-label="Menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Wordmark size="sm" oneline />
            <button
              className="nav-burger"
              data-open="true"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'inline-flex' }}
            >
              <span></span><span></span><span></span>
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
            {items.map((it, i) => (
              <a key={it.id} className="mobile-drawer-link" onClick={() => go(it.id)}>
                <span style={{ color: page === it.id ? 'var(--clay)' : 'var(--green-deep)' }}>{it.label}</span>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24 }}>
            <button className="btn btn-primary" onClick={() => { setMobileOpen(false); onEnquire(); }} style={{ width: '100%' }}>
              Book a free intro session
            </button>
            <a href="tel:9923086478" className="btn btn-outline" style={{ width: '100%' }}>
              ☎ Call 99230 86478
            </a>
            <a href="https://instagram.com/swaswasthya" target="_blank" rel="noreferrer" className="mono" style={{ textAlign: 'center', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, paddingTop: 4 }}>
              @swaswasthya
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const THEMES = [
  { id: 'default', name: 'Forest cream', a: '#1f3329', b: '#f0e5cf' },
  { id: 'blush', name: 'Blush', a: '#a8654e', b: '#fbf1e9' },
  { id: 'dark', name: 'Dark mode', a: '#f0e5cf', b: '#1f3329' },
  { id: 'boutique', name: 'Boutique', a: '#b8765f', b: '#fdfaf2' },
];

export const ThemeSwitch = ({ palette, setPalette }) => {
  const [open, setOpen] = React.useState(false);
  const current = THEMES.find((t) => t.id === palette) || THEMES[0];
  return (
    <div className="theme-switch">
      {open && (
        <div className="theme-switch-panel">
          <div className="ts-head">
            <span>Choose a theme</span>
            <button className="ts-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className="ts-option"
              data-active={palette === t.id}
              onClick={() => setPalette(t.id)}
            >
              <span className="ts-swatch" style={{ '--sw-a': t.a, '--sw-b': t.b }}></span>
              <span className="ts-name">{t.name}</span>
              <span className="ts-check">✓</span>
            </button>
          ))}
        </div>
      )}
      <button className="theme-switch-toggle" onClick={() => setOpen((o) => !o)} aria-label="Change theme">
        <span className="ts-swatch" style={{ '--sw-a': current.a, '--sw-b': current.b }}></span>
        <span className="ts-label">Theme</span>
      </button>
    </div>
  );
};

export const Footer = ({ setPage, onEnquire }) => (
  <footer style={{
    background: 'var(--green-deep)',
    color: 'var(--cream-light)',
    padding: '80px 0 32px',
    marginTop: 0,
  }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 56,
        marginBottom: 64,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 42,
            lineHeight: 1,
            color: 'var(--cream)',
            marginBottom: 16,
          }}>
            Swa-Swasthya
          </div>
          <p style={{ color: 'rgba(240, 229, 207, 0.7)', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
            Balanced fitness for mind & body — for the woman you were, are, and are becoming.
          </p>
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--tan)',
            marginBottom: 20,
          }}>
            Explore
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['About', 'about'],
              ['Programs', 'programs'],
              ['Schedule', 'schedule'],
              ['Contact', 'contact'],
            ].map(([label, id]) => (
              <a key={id} onClick={() => { setPage(id); window.scrollTo(0, 0); }}
                 style={{ cursor: 'pointer', color: 'rgba(240, 229, 207, 0.85)', fontSize: 14 }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--tan)',
            marginBottom: 20,
          }}>
            Connect
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'rgba(240, 229, 207, 0.85)' }}>
            <a href="tel:9923086478">+91 99230 86478</a>
            <a href="https://instagram.com/swaswasthya" target="_blank" rel="noreferrer">@swaswasthya</a>
            <a onClick={onEnquire} style={{ cursor: 'pointer' }}>Send an enquiry</a>
          </div>
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--tan)',
            marginBottom: 20,
          }}>
            Newsletter
          </div>
          <p style={{ fontSize: 13, color: 'rgba(240, 229, 207, 0.7)', marginBottom: 12, lineHeight: 1.6 }}>
            Practices, schedules, seasonal resets.
          </p>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(240, 229, 207, 0.3)',
            paddingBottom: 4,
          }}>
            <input
              type="email"
              placeholder="your@email"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--cream)',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                flex: 1,
                padding: '8px 0',
              }}
            />
            <button style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--cream)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}>
              Join →
            </button>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(240, 229, 207, 0.18)',
        paddingTop: 28,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        color: 'rgba(240, 229, 207, 0.5)',
      }}>
        <div>© 2026 Swa-Swasthya. Founded by Tanvi.</div>
        <div>Pune, India · Online worldwide</div>
      </div>
    </div>
  </footer>
);

export const ImgPh = ({ label, height = 320, radius = 'var(--radius-md)', style = {} }) => (
  <div className="imgph" style={{ height, borderRadius: radius, ...style }}>
    <div className="imgph-label">▣ {label}</div>
  </div>
);

export const SectionLabel = ({ num, children }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  }}>
    {num && <span className="section-num">{num}</span>}
    {num && <span style={{ width: 28, height: 1, background: 'var(--rule)' }} />}
    <span className="eyebrow">{children}</span>
  </div>
);

export const Marquee = ({ items }) => (
  <div className="marquee">
    <div className="marquee-track">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="marquee-track" style={{ animation: 'none', padding: 0 }}>
          {items.map((it, i) => (
            <span key={i} className="marquee-item">{it}</span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const SunArc = ({ size = 200, color = 'var(--clay)' }) => (
  <svg width={size} height={size / 2} viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
    <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke={color} strokeWidth="1" />
    <path d="M 25 100 A 75 75 0 0 1 175 100" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    <path d="M 40 100 A 60 60 0 0 1 160 100" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    <circle cx="100" cy="100" r="6" fill={color} />
  </svg>
);

export const HomeFinalCTA = ({ onEnquire }) => (
  <section className="section" style={{ background: 'var(--green-deep)', color: 'var(--cream)' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <span className="eyebrow" style={{ color: 'var(--tan)' }}>
        Begin your practice
      </span>
      <h2 className="display-1" style={{
        color: 'var(--cream-light)',
        fontStyle: 'italic',
        margin: '24px auto 32px',
        maxWidth: 1100,
        fontSize: 'clamp(40px, 8cqw, 128px)',
      }}>
        Its <span style={{ color: 'var(--blush)' }}>you</span>, its <span style={{ color: 'var(--blush)' }}>me</span>, its <span style={{ color: 'var(--blush)' }}>us</span>.
      </h2>
      <p style={{
        fontSize: 18,
        color: 'rgba(240, 229, 207, 0.75)',
        maxWidth: 600,
        margin: '0 auto 40px',
        lineHeight: 1.6,
      }}>
        A 20-minute intro call. Whatever you choose afterwards is up to you.
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onEnquire} className="btn btn-primary" style={{
          background: 'var(--cream)',
          color: 'var(--green-deep)',
          borderColor: 'var(--cream)',
        }}>
          Book your intro session
        </button>
        <a href="https://wa.me/919923086478" className="btn btn-outline" style={{
          borderColor: 'var(--cream)',
          color: 'var(--cream)',
        }}>
          WhatsApp us
        </a>
      </div>
    </div>
  </section>
);
