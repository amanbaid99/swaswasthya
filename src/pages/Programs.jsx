import React from 'react';
import { PROGRAMS } from '../data/programs.js';
import { ImgPh, SectionLabel, HomeFinalCTA } from '../components/common.jsx';

const Meta = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 20, borderRight: '1px solid var(--rule)' }}>
    <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-soft)' }}>
      {label}
    </span>
    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, color: 'var(--green-deep)' }}>
      {value}
    </span>
  </div>
);

const ProgramRow = ({ p, index, onOpen }) => {
  const flip = index % 2 === 1;
  return (
    <article
      className="program-row card card-hover"
      onClick={onOpen}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: 0,
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
        background: 'var(--cream-light)',
      }}
    >
      <div style={{ order: flip ? 2 : 1 }}>
        <ImgPh label={p.imagery} height={420} radius="0" style={{ background: p.bg }} />
      </div>
      <div style={{
        order: flip ? 1 : 2,
        padding: '56px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--green-soft)' }}>
              {p.num} / 06
            </span>
            <span style={{ width: 28, height: 1, background: 'var(--rule)' }} />
            <span className="eyebrow">{p.sub}</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3.4cqw, 54px)',
            color: 'var(--green-deep)',
            marginBottom: 20,
            lineHeight: 1.02,
          }}>
            {p.name}
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 28, maxWidth: 460 }}>
            {p.short}
          </p>
        </div>

        <div>
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}>
            <Meta label="Schedule" value={p.schedule} />
            <Meta label="Duration" value={p.duration} />
            <Meta label="Format" value={p.format} />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="btn btn-primary btn-sm">Read more →</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--clay)' }}>
              {p.pricing}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @container site (max-width: 900px) {
          .program-row { grid-template-columns: 1fr !important; }
          .program-row > div:first-child { order: 1 !important; }
          .program-row > div:nth-child(2) { order: 2 !important; padding: 32px !important; }
        }
      `}</style>
    </article>
  );
};

const ProgramDetail = ({ p, onBack, onEnquire }) => (
  <main>
    <section style={{ padding: '40px 0 32px' }}>
      <div className="container">
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ marginBottom: 32 }}>
          ← All programs
        </button>

        <div className="pd-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          alignItems: 'start',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span className="mono" style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--clay)' }}>
                {p.num} / 06
              </span>
              <span style={{ width: 28, height: 1, background: 'var(--rule)' }} />
              <span className="eyebrow">{p.sub}</span>
            </div>
            <h1 className="display-1" style={{
              fontStyle: 'italic',
              fontSize: 'clamp(34px, 7cqw, 100px)',
              marginBottom: 32,
            }}>
              {p.name}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 600, marginBottom: 36 }}>
              {p.short}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onEnquire}>
                Enquire about {p.name}
              </button>
              <a href="https://wa.me/919923086478" className="btn btn-outline">
                WhatsApp · 99230 86478
              </a>
            </div>
          </div>

          <ImgPh label={p.imagery} height={520} radius="var(--radius-lg)" style={{ background: p.bg }} />
        </div>
      </div>

      <style>{`
        @container site (max-width: 900px) {
          .pd-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    {/* Snapshot bar */}
    <section style={{ padding: '40px 0', borderBlock: '1px solid var(--rule)', background: 'var(--cream-light)' }}>
      <div className="container">
        <div className="snap-bar" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 0,
        }}>
          {[
            ['Schedule', p.schedule],
            ['Duration', p.duration],
            ['Format', p.format],
            ['Mode', p.tag.split('·')[1]?.trim() || '—'],
            ['Investment', p.pricing],
          ].map(([k, v], i) => (
            <div key={k} style={{
              padding: '0 24px',
              borderLeft: i > 0 ? '1px solid var(--rule)' : 'none',
            }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 6 }}>
                {k}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--green-deep)', lineHeight: 1.2 }}>
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @container site (max-width: 900px) {
          .snap-bar { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px !important; }
          .snap-bar > div { border-left: none !important; padding: 0 24px !important; }
        }
      `}</style>
    </section>

    {/* Benefits + Flow + Equipment */}
    <section className="section">
      <div className="container">
        <div className="pd-three" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 64,
        }}>
          <div>
            <SectionLabel num="01">Targeted for</SectionLabel>
            <h2 className="display-2" style={{ marginBottom: 32, fontSize: 'clamp(28px, 4.5cqw, 64px)' }}>
              What this practice <span className="italic" style={{ color: 'var(--clay)' }}>moves</span>.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {p.benefits.map((b, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '18px 0',
                  borderTop: '1px solid var(--rule)',
                }}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--clay)', width: 28 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--green-deep)' }}>
                    {b}
                  </span>
                </div>
              ))}
              <div style={{ height: 1, background: 'var(--rule)' }} />
            </div>
          </div>

          <div>
            <SectionLabel num="02">The flow</SectionLabel>
            <div style={{
              background: 'var(--green-deep)',
              color: 'var(--cream)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              marginBottom: 24,
            }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--tan)', textTransform: 'uppercase', marginBottom: 16 }}>
                The way it flows
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.flow.map((f, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: 16,
                    padding: '14px 0',
                    borderBottom: i < p.flow.length - 1 ? '1px solid rgba(240, 229, 207, 0.18)' : 'none',
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}>
                    <span style={{ color: 'var(--blush)' }}>✦</span>
                    <span style={{ color: 'rgba(240, 229, 207, 0.9)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'var(--cream-light)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-md)',
              padding: 28,
            }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--green-soft)', textTransform: 'uppercase', marginBottom: 14 }}>
                What you'll need
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.equipment.map((e) => (
                  <span key={e} className="tag">{e}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @container site (max-width: 900px) {
            .pd-three { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </div>
    </section>

    {/* Sample week + timings */}
    <section className="section" style={{ background: 'var(--blush-light)' }}>
      <div className="container">
        <SectionLabel num="03">When it happens</SectionLabel>
        <h2 className="display-2" style={{ marginBottom: 40 }}>
          Sample <span className="italic" style={{ color: 'var(--clay)' }}>weekly rhythm</span>.
        </h2>

        <div style={{
          background: 'var(--cream-light)',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
        }}>
          {p.timings.map((t, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr auto',
              gap: 24,
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: i < p.timings.length - 1 ? '1px solid var(--rule)' : 'none',
            }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--green-soft)', letterSpacing: '0.12em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--green-deep)' }}>
                {t}
              </span>
              <span className="tag">{p.schedule}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing CTA */}
    <section className="section" style={{ background: 'var(--green-deep)', color: 'var(--cream)' }}>
      <div className="container">
        <div className="price-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--tan)' }}>Investment</span>
            <h2 className="display-1" style={{
              color: 'var(--cream-light)',
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 7cqw, 110px)',
              marginTop: 12,
              marginBottom: 24,
              lineHeight: 0.95,
            }}>
              {p.pricing}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(240, 229, 207, 0.75)', marginBottom: 28, maxWidth: 440 }}>
              Pricing varies by frequency, format and personalisation. Send us an enquiry and we'll send back a detailed plan within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onEnquire} style={{
                background: 'var(--cream)',
                color: 'var(--green-deep)',
                borderColor: 'var(--cream)',
              }}>
                Send enquiry
              </button>
              <a href="https://wa.me/919923086478" className="btn btn-outline" style={{
                borderColor: 'var(--cream)',
                color: 'var(--cream)',
              }}>
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div style={{
              padding: '32px',
              border: '1px solid rgba(240, 229, 207, 0.22)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 16,
            }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--tan)', textTransform: 'uppercase', marginBottom: 12 }}>
                What's included
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Onboarding call with Tanvi',
                  'Personalised onboarding plan',
                  'Form correction in every session',
                  'WhatsApp support between sessions',
                  'Monthly progress check-in',
                ].map((x) => (
                  <li key={x} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'rgba(240, 229, 207, 0.9)' }}>
                    <span style={{ color: 'var(--blush)' }}>✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: '20px 32px',
              border: '1px dashed rgba(240, 229, 207, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              color: 'rgba(240, 229, 207, 0.7)',
              lineHeight: 1.6,
            }}>
              <span style={{ color: 'var(--blush)' }}>✦</span> First 20-min intro call is always free. No commitment.
            </div>
          </div>
        </div>

        <style>{`
          @container site (max-width: 900px) {
            .price-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </div>
    </section>
  </main>
);

const ProgramsIndex = ({ setActiveId, onEnquire, setPage }) => {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Group', 'Personal', 'Capsule'];
  const filtered = PROGRAMS.filter((p) => {
    if (filter === 'All') return true;
    return p.format.toLowerCase().includes(filter.toLowerCase()) ||
           p.tag.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <main>
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ maxWidth: 1000 }}>
            <span className="eyebrow">Programs</span>
            <h1 className="display-1" style={{
              fontStyle: 'italic',
              marginTop: 20,
              fontSize: 'clamp(40px, 8cqw, 130px)',
            }}>
              For the woman you<br/>
              <span style={{ color: 'var(--clay)' }}>were, are, and are becoming.</span>
            </h1>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 56,
            paddingTop: 32,
            borderTop: '1px solid var(--rule)',
            flexWrap: 'wrap',
            gap: 24,
          }}>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 480 }}>
              Six programs. One integrated practice. Pick the one that meets you where you are — or build a combination with us.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={f === filter ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                  style={{ textTransform: 'none', letterSpacing: '0.04em' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {filtered.map((p, i) => (
              <ProgramRow key={p.id} p={p} index={i} onOpen={() => setActiveId(p.id)} />
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-soft)' }}>
                No programs match that filter.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-light)', borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          <SectionLabel num="·">Compare at a glance</SectionLabel>
          <h2 className="display-2" style={{ marginBottom: 48 }}>
            Find the <span className="italic" style={{ color: 'var(--clay)' }}>right edit</span> for you.
          </h2>

          <div style={{
            background: 'var(--cream)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            overflowX: 'auto',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
              minWidth: 720,
            }}>
              <thead>
                <tr style={{ background: 'var(--cream-deep)' }}>
                  {['Program', 'Focus', 'Format', 'Frequency', 'Mode', ''].map((h, i) => (
                    <th key={i} style={{
                      padding: '18px 20px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--green-soft)',
                      fontWeight: 500,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROGRAMS.map((p) => (
                  <tr key={p.id} style={{ borderTop: '1px solid var(--rule-soft)' }}>
                    <td style={{ padding: '20px', verticalAlign: 'top' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--green-deep)' }}>
                        {p.name}
                      </div>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
                        {p.num} · {p.sub}
                      </div>
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top', color: 'var(--ink-soft)', maxWidth: 320 }}>
                      {p.short.split(' ').slice(0, 14).join(' ')}…
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top' }}>
                      <span className="tag">{p.format}</span>
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)' }}>
                      {p.schedule}
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)' }}>
                      {p.tag.includes('Online') ? 'Online · Offline' : 'Capsule'}
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top', textAlign: 'right' }}>
                      <button onClick={() => setActiveId(p.id)} className="btn btn-ghost btn-sm">
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <HomeFinalCTA onEnquire={onEnquire} />
    </main>
  );
};

const Programs = ({ activeId, setActiveId, onEnquire, setPage }) => {
  if (activeId) {
    const p = PROGRAMS.find((x) => x.id === activeId);
    if (p) return <ProgramDetail p={p} onBack={() => setActiveId(null)} onEnquire={onEnquire} />;
  }
  return <ProgramsIndex setActiveId={setActiveId} onEnquire={onEnquire} setPage={setPage} />;
};

export default Programs;
