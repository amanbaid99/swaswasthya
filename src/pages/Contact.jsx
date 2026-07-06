import React from 'react';
import { SectionLabel, HomeFinalCTA } from '../components/common.jsx';

const WA_URL = 'https://wa.me/919637142820?text=Hi%20Tanvi%2C%20I%27d%20like%20to%20enquire%20about%20your%20programs.';

const WaIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ContactItem = ({ label, value, href, primary }) => (
  <a
    href={href}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '32px 36px',
      background: primary ? 'var(--green-deep)' : 'var(--cream-light)',
      border: primary ? 'none' : '1px solid var(--rule)',
      borderRadius: 'var(--radius-md)',
      textDecoration: 'none',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: primary ? 'rgba(240,229,207,0.6)' : 'var(--ink-soft)' }}>
      {label}
    </span>
    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: primary ? 'var(--cream)' : 'var(--green-deep)', lineHeight: 1.3 }}>
      {value}
    </span>
  </a>
);

const Contact = ({ onEnquire }) => (
  <main>
    <section style={{ padding: '60px 0 80px' }}>
      <div className="container">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Get in touch</span>
          <h1 className="display-1" style={{ fontStyle: 'italic', marginTop: 20, fontSize: 'clamp(40px, 7cqw, 110px)' }}>
            Let's <span style={{ color: 'var(--clay)' }}>talk</span>.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', marginTop: 28 }}>
            The fastest way to reach Tanvi is WhatsApp. She responds personally to every message.
          </p>
        </div>
      </div>
    </section>

    <section style={{ paddingBottom: 80 }}>
      <div className="container">
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>

          {/* WhatsApp — primary */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '40px 44px',
              background: '#25D366',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.35)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' }}>
              <WaIcon size={32} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>Fastest response · WhatsApp</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: '#fff' }}>+91 96371 42820</div>
            </div>
            <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
              Message now →
            </div>
          </a>

          <ContactItem label="Call us" value="+91 99230 86478" href="tel:9923086478" />
          <ContactItem label="Email" value="swaswasthya@gmail.com" href="mailto:swaswasthya@gmail.com" />
          <ContactItem label="Instagram" value="@swaswasthya" href="https://instagram.com/swaswasthya" />
        </div>
      </div>

      <style>{`
        @container site (max-width: 700px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <section className="section" style={{ background: 'var(--cream-light)', borderBlock: '1px solid var(--rule)' }}>
      <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionLabel num="01">Where to find us</SectionLabel>
        <h2 className="display-2" style={{ marginBottom: 32 }}>
          Pune, India · <span className="italic" style={{ color: 'var(--clay)' }}>Online worldwide</span>.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 560 }}>
          In-person sessions run in Pune. Online sessions are available for women anywhere in the world — same practice, same Tanvi, same results.
        </p>
      </div>
    </section>

    <HomeFinalCTA onEnquire={onEnquire} />
  </main>
);

export default Contact;
