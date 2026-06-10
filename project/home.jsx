/* home.jsx — Homepage with hero, story, programs grid, testimonials, transformation, CTA */

const Home = ({ setPage, onEnquire, onOpenProgram }) => {
  return (
    <main>
      <HomeHero setPage={setPage} onEnquire={onEnquire} />
      <HomeIntro />
      <HomeStory setPage={setPage} />
      <HomePrograms onOpenProgram={onOpenProgram} setPage={setPage} />
      <HomeSchedulePreview setPage={setPage} />
      <HomeTransformations />
      <HomeTestimonials />
      <HomePress />
      <HomeFinalCTA onEnquire={onEnquire} />
    </main>
  );
};

/* ---------- Hero ---------- */
const HomeHero = ({ onEnquire, setPage }) => (
  <section style={{
    paddingTop: 40,
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div className="container">
      {/* Eyebrow */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span className="eyebrow">For the woman you were, are, and are becoming</span>
        <span className="eyebrow" style={{ color: 'var(--clay)' }}>
          ✦ Est. 2007 · 18+ years
        </span>
      </div>

      {/* Massive editorial wordmark */}
      <div style={{ position: 'relative' }}>
        <h1 className="display-1" style={{
          textAlign: 'center',
          color: 'var(--green-deep)',
          fontStyle: 'italic',
          letterSpacing: '-0.04em',
        }}>
          Swa-Swasthya
        </h1>
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
          marginTop: -4,
        }}>
          Balanced Fitness · Mind & Body
        </div>
      </div>

      {/* Hero composition */}
      <div className="hero-grid" style={{
        marginTop: 56,
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr 1fr',
        gap: 28,
        alignItems: 'end',
      }}>
        {/* Left: meta + tag */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ImgPh label="founder portrait" height={220} radius="var(--radius-md)" />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            paddingTop: 16,
            borderTop: '1px solid var(--rule)',
          }}>
            <span className="eyebrow">A note from Tanvi</span>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 22,
              lineHeight: 1.3,
              color: 'var(--green-deep)',
            }}>
              "swa is self and swasthya is health — finding the right balance is how we become our best self."
            </p>
          </div>
        </div>

        {/* Center: hero image */}
        <div style={{ position: 'relative' }}>
          <ImgPh label="hero · woman mid-flow · soft morning light" height={520} radius="var(--radius-lg)" />
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <span className="tag tag-filled">▸ Now booking</span>
            <span className="tag" style={{ background: 'var(--cream-light)' }}>
              Online + In-person
            </span>
          </div>
        </div>

        {/* Right: stats + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            padding: '20px 22px',
            background: 'var(--green-deep)',
            color: 'var(--cream)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            <div className="mono" style={{ color: 'var(--tan)', letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 10 }}>
              The community
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 1, color: 'var(--cream-light)' }}>
              400+
            </div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>women across ages, on the path</div>
          </div>

          <div style={{
            padding: '20px 22px',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--cream-light)',
          }}>
            <div className="mono" style={{ color: 'var(--green-soft)', letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 10, marginBottom: 6 }}>
              6 programs
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--green-deep)', lineHeight: 1.2, marginBottom: 12 }}>
              From everyday strength to face yog & prenatal care
            </div>
            <button
              onClick={() => setPage('programs')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--green-deep)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              See all programs →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-primary" onClick={onEnquire} style={{ width: '100%' }}>
              Book a free intro session
            </button>
            <button className="btn btn-outline" onClick={() => setPage('schedule')} style={{ width: '100%' }}>
              View weekly schedule
            </button>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @container site (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

/* ---------- Marquee ---------- */
const HomeIntro = () => (
  <Marquee items={[
    'strength',
    'yoga',
    'face yog',
    'pranayam',
    'prenatal',
    'mobility',
    'breathwork',
    'longevity',
    'community',
  ]} />
);

/* ---------- Our Story ---------- */
const HomeStory = ({ setPage }) => (
  <section className="section">
    <div className="container">
      <div className="story-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}>
        <div>
          <SectionLabel num="01">Our Story</SectionLabel>
          <h2 className="display-2" style={{ marginBottom: 28 }}>
            Started in a small room with <span className="italic" style={{ color: 'var(--clay)' }}>just four women</span>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20, maxWidth: 540 }}>
            Eighteen years ago, what began as a way to use time productively quietly grew into a practice — and then into a community of women of all ages working towards health and wellness.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 32, maxWidth: 540 }}>
            The journey has been long and filled with new ideas, techniques, teaching and continuous learning. Onwards and upwards.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={() => setPage('about')}>
              Read the full story
            </button>
            <span className="tag">Tanvi · Founder & Coach</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}>
          <ImgPh label="early days · 2007" height={280} radius="var(--radius-md)" />
          <ImgPh label="practice · today" height={280} radius="var(--radius-md)" style={{ marginTop: 40 }} />
          <ImgPh label="community · group session" height={200} radius="var(--radius-md)" style={{ gridColumn: 'span 2', marginTop: -20 }} />
        </div>
      </div>
    </div>

    <style>{`
      @container site (max-width: 900px) {
        .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      }
    `}</style>
  </section>
);

/* ---------- Programs grid ---------- */
const HomePrograms = ({ onOpenProgram, setPage }) => (
  <section className="section" style={{ background: 'var(--cream-light)', borderBlock: '1px solid var(--rule)' }}>
    <div className="container">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 64,
        flexWrap: 'wrap',
        gap: 20,
      }}>
        <div>
          <SectionLabel num="02">What we offer</SectionLabel>
          <h2 className="display-2" style={{ maxWidth: 720 }}>
            Six distinct <span className="italic" style={{ color: 'var(--clay)' }}>edits</span> — one whole practice.
          </h2>
        </div>
        <button className="btn btn-ghost" onClick={() => setPage('programs')}>
          All programs →
        </button>
      </div>

      <div className="programs-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
      }}>
        {window.PROGRAMS.map((p) => (
          <ProgramCard key={p.id} p={p} onClick={() => onOpenProgram(p.id)} />
        ))}
      </div>
    </div>

    <style>{`
      @container site (max-width: 1000px) {
        .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @container site (max-width: 640px) {
        .programs-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

const ProgramCard = ({ p, onClick }) => (
  <article
    onClick={onClick}
    className="card card-hover"
    style={{
      padding: 0,
      cursor: 'pointer',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderColor: 'var(--rule)',
    }}
  >
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <ImgPh label={p.imagery} height={220} radius="0" style={{ background: p.bg }} />
      <span style={{
        position: 'absolute',
        top: 14,
        left: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.16em',
        color: 'var(--green-deep)',
      }}>
        {p.num} / 06
      </span>
      <span className="tag" style={{
        position: 'absolute',
        top: 14,
        right: 14,
        background: 'var(--cream-light)',
        fontSize: 9,
      }}>
        {p.format}
      </span>
    </div>
    <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>{p.sub}</div>
      <h3 className="display-3" style={{ marginBottom: 12, fontSize: 28 }}>
        {p.name}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 20, flex: 1 }}>
        {p.short}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTop: '1px solid var(--rule)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--ink-soft)',
        letterSpacing: '0.04em',
      }}>
        <span>{p.schedule}</span>
        <span style={{ color: 'var(--clay)' }}>read more →</span>
      </div>
    </div>
  </article>
);

/* ---------- Schedule preview ---------- */
const HomeSchedulePreview = ({ setPage }) => (
  <section className="section">
    <div className="container">
      <div className="sched-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        gap: 64,
        alignItems: 'center',
      }}>
        <div>
          <SectionLabel num="03">This week</SectionLabel>
          <h2 className="display-2" style={{ marginBottom: 24 }}>
            A rhythm <span className="italic" style={{ color: 'var(--clay)' }}>that holds</span>.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 28 }}>
            Group sessions run Mon–Fri at three reliable times. Personal training is fully customisable to your day.
          </p>
          <button className="btn btn-primary" onClick={() => setPage('schedule')}>
            Open the full schedule
          </button>
        </div>

        <div style={{
          background: 'var(--green-deep)',
          color: 'var(--cream)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 40px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 28,
            paddingBottom: 20,
            borderBottom: '1px solid rgba(240, 229, 207, 0.18)',
          }}>
            <div>
              <div className="mono" style={{ color: 'var(--tan)', letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 10 }}>
                Group · Swa-Shakti
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--cream-light)', marginTop: 4 }}>
                Everyday strength training
              </div>
            </div>
            <div className="mono" style={{ color: 'var(--tan)', fontSize: 11 }}>MON — FRI</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { time: '7:00 — 8:00 am', label: 'Sunrise batch', mode: 'online + offline' },
              { time: '10:15 — 11:15 am', label: 'Mid-morning batch', mode: 'online + offline' },
              { time: '6:15 — 7:15 pm', label: 'Evening batch', mode: 'online + offline' },
            ].map((s, i) => (
              <div key={i} className="sched-row" style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr auto',
                gap: 20,
                padding: '16px 0',
                borderBottom: i < 2 ? '1px solid rgba(240, 229, 207, 0.12)' : 'none',
                alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--cream-light)' }}>
                  {s.time}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--cream-light)' }}>
                  {s.label}
                </span>
                <span className="mono sched-mode" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--tan)' }}>
                  {s.mode}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, fontSize: 13, color: 'rgba(240, 229, 207, 0.7)' }}>
            For offline sessions, connect with us on{' '}
            <a href="tel:9923086478" style={{ color: 'var(--blush)', textDecoration: 'underline' }}>9923086478</a>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @container site (max-width: 900px) {
        .sched-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      }
      @container site (max-width: 560px) {
        .sched-row { grid-template-columns: 1fr !important; gap: 4px !important; }
        .sched-row .sched-mode { justify-self: start !important; }
      }
    `}</style>
  </section>
);

/* ---------- Transformations ---------- */
const HomeTransformations = () => (
  <section className="section" style={{ background: 'var(--blush-light)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <SectionLabel num="04">
          <span style={{ display: 'inline-block' }}>Transformations</span>
        </SectionLabel>
        <h2 className="display-2" style={{ maxWidth: 760, margin: '0 auto' }}>
          No quick fixes. <span className="italic" style={{ color: 'var(--clay)' }}>Real, sustainable</span> change.
        </h2>
      </div>

      <div className="trans-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
      }}>
        {[
          { name: 'Anjali', age: 38, time: '6 months', note: 'Lost 11kg, sleeps deeper, lifts heavier than she ever has.' },
          { name: 'Priya', age: 52, time: '4 months', note: 'Joint pain gone, posture corrected, lower back finally calm.' },
          { name: 'Meera', age: 29, time: 'Prenatal · all 3 trimesters', note: 'Stayed active, calm, and ready — birth prep felt grounded.' },
        ].map((t, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', background: 'var(--cream-light)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule)' }}>
              <ImgPh label="before" height={220} radius="0" />
              <ImgPh label="after" height={220} radius="0" />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--green-deep)' }}>
                  {t.name}, {t.age}
                </div>
                <span className="mono" style={{ fontSize: 10, color: 'var(--clay)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {t.time}
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                "{t.note}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      @container site (max-width: 900px) {
        .trans-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

/* ---------- Testimonials ---------- */
const HomeTestimonials = () => {
  const quotes = [
    {
      q: 'Tanvi changed the way I think about my body. After eighteen years of trying everything, this is the only practice that has lasted.',
      who: 'Reshma · with Swa-Swasthya since 2019',
    },
    {
      q: 'It feels less like a workout and more like coming back to myself. The community of women here is what kept me showing up.',
      who: 'Kavita · Swa-Shakti group batch',
    },
    {
      q: 'The prenatal program made my third trimester something I actually looked forward to. Calm, safe, and so well-paced.',
      who: 'Neha · Swa-Antara',
    },
  ];
  const [idx, setIdx] = React.useState(0);

  return (
    <section className="section">
      <div className="container">
        <SectionLabel num="05">From the community</SectionLabel>
        <div style={{
          background: 'var(--cream-light)',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--radius-lg)',
          padding: '64px 72px',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 24,
            left: 32,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 120,
            lineHeight: 1,
            color: 'var(--blush)',
            opacity: 0.7,
          }}>
            "
          </div>

          <div style={{ position: 'relative', minHeight: 200 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.6cqw, 36px)',
              lineHeight: 1.35,
              color: 'var(--green-deep)',
              marginBottom: 32,
              maxWidth: 880,
            }}>
              {quotes[idx].q}
            </p>
            <div className="mono" style={{
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}>
              — {quotes[idx].who}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid var(--rule)',
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 24 : 8,
                    height: 8,
                    borderRadius: 100,
                    background: i === idx ? 'var(--green-deep)' : 'var(--rule)',
                    border: 'none',
                    transition: 'all 0.25s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setIdx((idx - 1 + quotes.length) % quotes.length)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '8px 14px' }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setIdx((idx + 1) % quotes.length)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '8px 14px' }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Press / Recognition ---------- */
const HomePress = () => (
  <section className="section-sm" style={{ borderBlock: '1px solid var(--rule)' }}>
    <div className="container">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        flexWrap: 'wrap',
      }}>
        <span className="eyebrow">As felt by</span>
        {['Femina', 'Vogue India', 'YogaJournal', 'TheBetterIndia', 'HerCircle'].map((n) => (
          <span key={n} style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--ink-soft)',
            opacity: 0.7,
          }}>
            {n}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Final CTA ---------- */
const HomeFinalCTA = ({ onEnquire }) => (
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

window.Home = Home;
