import React from 'react';
import { PROGRAMS } from '../data/programs.js';
import { HomeFinalCTA } from '../components/common.jsx';

const programColors = {
  'Swa-Shakti': { bg: 'var(--cream-deep)', accent: 'var(--green-deep)' },
  'Swa & I': { bg: 'var(--blush-light)', accent: 'var(--clay)' },
  'Swa-Tej': { bg: 'var(--blush)', accent: 'var(--clay)' },
  'Swa-Dhyana': { bg: 'var(--tan)', accent: 'var(--green-deep)' },
  'Swa-Antara': { bg: 'var(--blush-light)', accent: 'var(--clay)' },
  'Swa': { bg: 'var(--green-deep)', accent: 'var(--cream)' },
};

const sessions = [
  { day: 'Mon', time: '7:00', dur: '60', program: 'Swa-Shakti', sub: 'Sunrise', mode: 'Online + Offline' },
  { day: 'Mon', time: '10:15', dur: '60', program: 'Swa-Shakti', sub: 'Mid-morning', mode: 'Online + Offline' },
  { day: 'Mon', time: '18:15', dur: '60', program: 'Swa-Shakti', sub: 'Evening', mode: 'Online + Offline' },
  { day: 'Tue', time: '7:00', dur: '60', program: 'Swa-Shakti', sub: 'Sunrise', mode: 'Online + Offline' },
  { day: 'Tue', time: '10:15', dur: '60', program: 'Swa-Shakti', sub: 'Mid-morning', mode: 'Online + Offline' },
  { day: 'Tue', time: '18:15', dur: '60', program: 'Swa-Shakti', sub: 'Evening', mode: 'Online + Offline' },
  { day: 'Wed', time: '7:00', dur: '60', program: 'Swa-Shakti', sub: 'Sunrise', mode: 'Online + Offline' },
  { day: 'Wed', time: '10:15', dur: '60', program: 'Swa-Shakti', sub: 'Mid-morning', mode: 'Online + Offline' },
  { day: 'Wed', time: '18:15', dur: '60', program: 'Swa-Shakti', sub: 'Evening', mode: 'Online + Offline' },
  { day: 'Thu', time: '7:00', dur: '60', program: 'Swa-Shakti', sub: 'Sunrise', mode: 'Online + Offline' },
  { day: 'Thu', time: '10:15', dur: '60', program: 'Swa-Shakti', sub: 'Mid-morning', mode: 'Online + Offline' },
  { day: 'Thu', time: '18:15', dur: '60', program: 'Swa-Shakti', sub: 'Evening', mode: 'Online + Offline' },
  { day: 'Fri', time: '7:00', dur: '60', program: 'Swa-Shakti', sub: 'Sunrise', mode: 'Online + Offline' },
  { day: 'Fri', time: '10:15', dur: '60', program: 'Swa-Shakti', sub: 'Mid-morning', mode: 'Online + Offline' },
  { day: 'Fri', time: '18:15', dur: '60', program: 'Swa-Shakti', sub: 'Evening', mode: 'Online + Offline' },
  { day: 'Mon', time: '11:30', dur: '25', program: 'Swa-Tej', sub: 'Face yog', mode: 'Online + Offline' },
  { day: 'Thu', time: '11:30', dur: '25', program: 'Swa-Tej', sub: 'Face yog', mode: 'Online + Offline' },
  { day: 'Tue', time: '8:30', dur: '25', program: 'Swa-Dhyana', sub: 'Pranayam', mode: 'Online + Offline' },
  { day: 'Fri', time: '8:30', dur: '25', program: 'Swa-Dhyana', sub: 'Pranayam', mode: 'Online + Offline' },
  { day: 'Mon', time: '9:30', dur: '60', program: 'Swa-Antara', sub: 'Prenatal', mode: 'Online + Offline' },
  { day: 'Wed', time: '9:30', dur: '60', program: 'Swa-Antara', sub: 'Prenatal', mode: 'Online + Offline' },
  { day: 'Fri', time: '9:30', dur: '60', program: 'Swa-Antara', sub: 'Prenatal', mode: 'Online + Offline' },
  { day: 'Mon', time: 'Custom', dur: '60', program: 'Swa & I', sub: '1:1 Personal', mode: 'Online · Home visit' },
  { day: 'Wed', time: 'Custom', dur: '60', program: 'Swa & I', sub: '1:1 Personal', mode: 'Online · Home visit' },
  { day: 'Fri', time: 'Custom', dur: '60', program: 'Swa & I', sub: '1:1 Personal', mode: 'Online · Home visit' },
];

const SessionChip = ({ s, onClick }) => {
  const c = programColors[s.program] || { bg: 'var(--cream-deep)', accent: 'var(--green-deep)' };
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 76,
        background: c.bg,
        border: 'none',
        borderLeft: `3px solid ${c.accent}`,
        borderRadius: 6,
        padding: '10px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 16,
          color: c.accent,
          lineHeight: 1.1,
        }}>
          {s.program}
        </div>
        <div className="mono" style={{
          fontSize: 9,
          letterSpacing: '0.12em',
          color: 'var(--ink-soft)',
          textTransform: 'uppercase',
          marginTop: 4,
        }}>
          {s.sub}
        </div>
      </div>
      <div className="mono" style={{
        fontSize: 9,
        color: 'var(--ink-soft)',
        letterSpacing: '0.08em',
      }}>
        {s.dur}min · {s.mode.includes('Online') ? 'on+off' : 'off'}
      </div>
    </button>
  );
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeSlots = ['7:00', '8:30', '9:30', '10:15', '11:30', 'Custom', '18:15'];

const WeekGrid = ({ filtered, onEnquire }) => (
  <div>
    <style>{`
      .week-hint { display: none; }
      @container site (max-width: 760px) {
        .week-hint { display: flex; }
      }
    `}</style>
    <div className="week-hint" style={{
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--green-soft)',
    }}>
      Swipe the grid sideways to see the full week →
    </div>
    <div style={{
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      border: '1px solid var(--rule)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cream-light)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px repeat(5, 1fr)',
        minWidth: 760,
      }}>
        <div style={{
          padding: '20px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--green-soft)',
          borderBottom: '1px solid var(--rule)',
          borderRight: '1px solid var(--rule)',
          background: 'var(--cream-deep)',
        }}>
          Time
        </div>
        {days.map((d) => (
          <div key={d} style={{
            padding: '20px 16px',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--green-deep)',
            borderBottom: '1px solid var(--rule)',
            borderRight: '1px solid var(--rule)',
            background: 'var(--cream-deep)',
            textAlign: 'center',
          }}>
            {d}
          </div>
        ))}

        {timeSlots.map((slot, slotIdx) => (
          <React.Fragment key={slot}>
            <div style={{
              padding: '14px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--ink-soft)',
              borderBottom: slotIdx < timeSlots.length - 1 ? '1px solid var(--rule-soft)' : 'none',
              borderRight: '1px solid var(--rule)',
              display: 'flex',
              alignItems: 'center',
            }}>
              {slot}
            </div>
            {days.map((day) => {
              const s = filtered.find((x) => x.day === day && x.time === slot);
              return (
                <div key={day + slot} style={{
                  padding: 8,
                  borderBottom: slotIdx < timeSlots.length - 1 ? '1px solid var(--rule-soft)' : 'none',
                  borderRight: '1px solid var(--rule)',
                  minHeight: 90,
                }}>
                  {s && <SessionChip s={s} onClick={onEnquire} />}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

const ListView = ({ filtered, onEnquire }) => {
  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.day]) acc[s.day] = [];
    acc[s.day].push(s);
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <style>{`
        @container site (max-width: 600px) {
          .sched-list-row { grid-template-columns: 58px 1fr auto !important; gap: 14px !important; }
          .sched-list-row .sl-mode { display: none !important; }
        }
      `}</style>
      {Object.entries(grouped).map(([day, items]) => (
        <div key={day}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 20,
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: '1px solid var(--rule)',
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36, color: 'var(--green-deep)' }}>
              {day}
            </h3>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--green-soft)' }}>
              {items.length} sessions
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((s, i) => {
              const c = programColors[s.program] || { accent: 'var(--green-deep)' };
              return (
                <div key={i} className="sched-list-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 1fr auto',
                  gap: 24,
                  padding: '20px 0',
                  alignItems: 'center',
                  borderBottom: i < items.length - 1 ? '1px solid var(--rule-soft)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--green-deep)' }}>
                    {s.time}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: c.accent, lineHeight: 1.2 }}>
                      {s.program}
                    </div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 4 }}>
                      {s.sub} · {s.dur} mins
                    </div>
                  </div>
                  <div className="sl-mode" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                    {s.mode}
                  </div>
                  <button onClick={onEnquire} className="btn btn-ghost btn-sm">
                    Book
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Schedule = ({ onEnquire }) => {
  const [view, setView] = React.useState('week');
  const [mode, setMode] = React.useState('All');
  const [program, setProgram] = React.useState('All');

  const programs = ['All', ...PROGRAMS.map((p) => p.name.replace('The ', '').replace(' Edit', ''))];

  const filtered = sessions.filter((s) => {
    if (mode === 'Online' && !s.mode.toLowerCase().includes('online')) return false;
    if (mode === 'Offline' && !s.mode.toLowerCase().includes('offline')) return false;
    if (program !== 'All' && !s.program.toLowerCase().includes(program.toLowerCase().split(' ')[0])) return false;
    return true;
  });

  return (
    <main>
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="eyebrow">Weekly schedule</span>
          <h1 className="display-1" style={{
            fontStyle: 'italic',
            marginTop: 20,
            fontSize: 'clamp(40px, 8cqw, 130px)',
            maxWidth: 1100,
          }}>
            Pick a time that <span style={{ color: 'var(--clay)' }}>holds you</span>.
          </h1>
          <p style={{
            fontSize: 17,
            color: 'var(--ink-soft)',
            maxWidth: 600,
            lineHeight: 1.6,
            marginTop: 24,
          }}>
            Group sessions run Mon–Fri. Personal training and the smaller practices have customisable timings — book a slot that works for you.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{
        position: 'sticky',
        top: 76,
        background: 'rgba(240, 229, 207, 0.94)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        borderBlock: '1px solid var(--rule)',
        padding: '20px 0',
        zIndex: 20,
      }}>
        <div className="container">
          <div className="filter-bar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-soft)' }}>Mode</span>
                <div style={{
                  display: 'flex',
                  background: 'var(--cream-light)',
                  border: '1px solid var(--rule)',
                  borderRadius: 100,
                  padding: 3,
                }}>
                  {['All', 'Online', 'Offline'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 12,
                        fontFamily: 'var(--font-body)',
                        background: mode === m ? 'var(--green-deep)' : 'transparent',
                        color: mode === m ? 'var(--cream)' : 'var(--ink-soft)',
                        border: 'none',
                        borderRadius: 100,
                        cursor: 'pointer',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-soft)' }}>Program</span>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    fontSize: 13,
                    fontFamily: 'var(--font-body)',
                    background: 'var(--cream-light)',
                    border: '1px solid var(--rule)',
                    borderRadius: 100,
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {programs.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setView('week')}
                className={view === 'week' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                style={{ textTransform: 'none', letterSpacing: '0.04em' }}
              >
                Week view
              </button>
              <button
                onClick={() => setView('list')}
                className={view === 'list' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                style={{ textTransform: 'none', letterSpacing: '0.04em' }}
              >
                List view
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          {view === 'week' ? (
            <WeekGrid filtered={filtered} onEnquire={onEnquire} />
          ) : (
            <ListView filtered={filtered} onEnquire={onEnquire} />
          )}

          <div style={{
            marginTop: 40,
            padding: 24,
            background: 'var(--cream-light)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 6 }}>
                For offline sessions
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--green-deep)' }}>
                Connect with us on <a href="tel:9923086478" style={{ color: 'var(--clay)', textDecoration: 'underline' }}>9923086478</a>
              </div>
            </div>
            <button className="btn btn-primary" onClick={onEnquire}>
              Request your slot
            </button>
          </div>
        </div>
      </section>

      <HomeFinalCTA onEnquire={onEnquire} />
    </main>
  );
};

export default Schedule;
