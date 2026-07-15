import React from 'react';
import posthog from 'posthog-js';
import { createPortal } from 'react-dom';

const WaIcon = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'block' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneIcon = ({ size = 15 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'block' }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>);
const InstaIcon = ({ size = 15 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'block' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>);
const MailIcon = ({ size = 15 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'block' }}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>);

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

export const Nav = ({ page, setPage, onEnquire, isDark, toggleDark }) => {
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
    { id: 'blog', label: 'Journal' },
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
        paddingTop: 16,
        paddingBottom: 16,
        gap: 16,
      }}>
        <a onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
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
          <a href="https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs." target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }} onClick={() => posthog.capture('nav_whatsapp_clicked')}>
            <WaIcon /> WhatsApp
          </a>
          <button
            onClick={toggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid var(--rule)',
              background: 'var(--cream-light)',
              color: 'var(--ink)',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
          >
            {isDark ? '☀' : '☾'}
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

      {mobileOpen && createPortal(
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
            <a href="https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs." target="_blank" rel="noreferrer" className="btn btn-primary" onClick={() => setMobileOpen(false)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
              <WaIcon /> WhatsApp us
            </a>
            <a href="tel:9923086478" className="btn btn-outline" style={{ width: '100%' }}>
              ☎ Call 99230 86478
            </a>
            <button
              onClick={toggleDark}
              style={{
                background: 'transparent',
                border: '1px solid var(--rule)',
                borderRadius: 100,
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 16 }}>{isDark ? '☀' : '☾'}</span>
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
            <a href="https://instagram.com/swaswasthya" target="_blank" rel="noreferrer" className="mono" style={{ textAlign: 'center', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, paddingTop: 4 }}>
              @swaswasthya
            </a>
          </div>
        </div>,
        document.body
      )}
    </header>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: <PhoneIcon />, label: '+91 99230 86478', href: 'tel:9923086478' },
              { icon: <InstaIcon />, label: '@swaswasthya', href: 'https://instagram.com/swaswasthya', external: true },
              { icon: <WaIcon size={15} />, label: 'WhatsApp us', href: 'https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs.', external: true },
              { icon: <MailIcon />, label: 'swaswasthya@gmail.com', href: 'mailto:swaswasthya@gmail.com' },
            ].map(({ icon, label, href, external }) => (
              <a key={href} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(240,229,207,0.85)', textDecoration: 'none' }}>
                <span style={{ opacity: 0.6 }}>{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter — hidden for now
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
        */}
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

// Blur-up image: shows a tiny blurred placeholder instantly, crossfades to the
// full-res image once it finishes loading. Pass `blurSrc` (a small data URI) to
// enable it; falls back to a plain image when no placeholder is available.
export const LazyImage = ({ src, blurSrc, alt = '', style = {}, imgStyle = {} }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {blurSrc && (
        <img
          src={blurSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'blur(18px)', transform: 'scale(1.15)',
            opacity: loaded ? 0 : 1, transition: 'opacity 0.5s ease',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          position: blurSrc ? 'relative' : 'static',
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: blurSrc ? (loaded ? 1 : 0) : 1,
          transition: 'opacity 0.5s ease',
          ...imgStyle,
        }}
      />
    </div>
  );
};

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
        Drop us a message and Tanvi will get back to you personally.
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs." target="_blank" rel="noreferrer" className="btn btn-primary" style={{
          background: 'var(--cream)',
          color: 'var(--green-deep)',
          borderColor: 'var(--cream)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
        }} onClick={() => posthog.capture('footer_enquiry_clicked', { channel: 'whatsapp' })}>
          <WaIcon color="var(--green-deep)" /> WhatsApp Tanvi
        </a>
        <a href="mailto:swaswasthya@gmail.com" className="btn btn-outline" style={{
          borderColor: 'var(--cream)',
          color: 'var(--cream)',
          textDecoration: 'none',
        }} onClick={() => posthog.capture('footer_enquiry_clicked', { channel: 'email' })}>
          Email us
        </a>
      </div>
    </div>
  </section>
);

