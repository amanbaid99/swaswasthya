import React from 'react';
import { PROGRAMS } from '../data/programs.js';
import { ImgPh, SectionLabel, Marquee, HomeFinalCTA } from '../components/common.jsx';

const HomeHero = ({ onEnquire, setPage }) => (
  <section style={{
    paddingTop: 40,
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div className="container">

      {/* Title + EST 2007 + tagline */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 className="display-1" style={{
          color: 'var(--green-deep)',
          fontStyle: 'italic',
          letterSpacing: '-0.04em',
        }}>
          Swa-Swasthya
        </h1>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
          marginTop: 14,
          marginBottom: 16,
        }}>
          Balanced Fitness · Mind &amp; Body · Est. 2007
        </div>
        <span className="eyebrow">For the woman you were, are, and are becoming</span>
      </div>

      {/* Full-width founder image */}
      <img
        src="/images/founder.jpg"
        alt="Tanvi — founder of Swa-Swasthya"
        style={{
          width: '100%',
          height: 580,
          objectFit: 'cover',
          objectPosition: 'center top',
          borderRadius: 'var(--radius-lg)',
          display: 'block',
          marginBottom: 28,
        }}
      />

      {/* A note from Tanvi */}
      <div style={{
        paddingTop: 24,
        paddingBottom: 20,
        borderTop: '1px solid var(--rule)',
        marginBottom: 16,
      }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: 10 }}>A note from Tanvi</span>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(16px, 2cqw, 24px)',
          lineHeight: 1.3,
          color: 'var(--green-deep)',
          whiteSpace: 'nowrap',
        }}>
          "swa is self and swasthya is health — finding the right balance is how we become our best self."
        </p>
      </div>

      {/* Programs info + CTAs row */}
      <div className="hero-bottom" style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 20,
        alignItems: 'stretch',
      }}>

        {/* 6 programs card */}
        <div style={{
          padding: '28px 32px',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--cream-light)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div className="mono" style={{ color: 'var(--green-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 10, marginBottom: 10 }}>
              6 programs · 400+ women
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--green-deep)', lineHeight: 1.2, marginBottom: 14 }}>
              From everyday strength to face yog & prenatal care
            </div>
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
              alignSelf: 'flex-start',
            }}
          >
            See all programs →
          </button>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={onEnquire} style={{ width: '100%' }}>
            Book a free intro session
          </button>
          <button className="btn btn-outline" onClick={() => setPage('schedule')} style={{ width: '100%' }}>
            View weekly schedule
          </button>
        </div>

      </div>
    </div>

    <style>{`
      @container site (max-width: 640px) {
        .hero-bottom { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

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
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 20, maxWidth: 540 }}>
            Eighteen years ago, what began as a way to use time productively quietly grew into a practice — and then into a community of women of all ages working towards health and wellness.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 32, maxWidth: 540 }}>
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
          gap: 12,
        }}>
          <img src="/images/our_story_1.JPG" alt="Sound healing session" style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center center', borderRadius: 'var(--radius-md)', display: 'block', imageOrientation: 'from-image' }} />
          <img src="/images/our_story_2.JPG" alt="Community group session" style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center top', borderRadius: 'var(--radius-md)', display: 'block', marginTop: 40, imageOrientation: 'from-image' }} />
          <img src="/images/our_story_3.JPG" alt="Tanvi — founder" style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center top', borderRadius: 'var(--radius-md)', display: 'block', imageOrientation: 'from-image' }} />
          <img src="/images/our_story_4.JPG" alt="Practice today" style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center center', borderRadius: 'var(--radius-md)', display: 'block', marginTop: -40, imageOrientation: 'from-image' }} />
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
    <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
      {p.image
        ? <img src={p.image} alt={p.name} style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: p.imagePosition || 'center center', display: 'block', imageOrientation: 'from-image', transform: p.imageZoom ? `scale(${p.imageZoom})` : undefined, transformOrigin: 'center center' }} />
        : <ImgPh label={p.imagery} height={220} radius="0" style={{ background: p.bg }} />
      }
      <span style={{
        position: 'absolute',
        top: 14,
        left: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
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
      <h3 className="display-3" style={{ marginBottom: 12 }}>
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
        {PROGRAMS.map((p) => (
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
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 28 }}>
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
              <div className="mono" style={{ color: 'var(--tan)', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 10 }}>
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

const TESTIMONIALS = [
  {
    q: `I started it with my doctor's permission in about 3.5 months. I started realising its benefits gradually after a couple of months — even in the later months, I didn't have back ache or swollen feet, touchwood.\n\nIt has really helped me remain active throughout the pregnancy. I am especially surprised because I did not regularly exercise before I joined prenatal yoga and was not sure initially if I could manage. But thankfully, all went well and I am continuing it for the past 5 months till date and on!\n\nTanvi madam's overall personality is a great positive driving force. She takes the classes at each individual's comfortable pace and slowly increases and adds new necessary exercises. Even in online classes, madam has a close eye for details due to her experience — she gives personalised attention to every student.\n\nFor someone like me who did not like exercise or yoga before, I have surprisingly developed a liking for yoga too!`,
    who: 'Swa-Antara · Prenatal Wellness',
  },
  {
    q: `My fitness journey with Tanvi Dharmadhikari has been a progressive and a very humbling experience. She teaches us all the effective, different and impactful yoga poses with sheer dedication and makes sure that each workout is different from the other to avoid monotony.\n\nShe has targeted our problem and weak areas to strengthen on an individual level with her personal attention as well. I wake up every morning looking forward to her class and have achieved a good lung capacity and flexibility because of these stress busting yoga sessions.\n\nMost importantly, her friendly and motivating persona makes the class even more fun. Thank you so much Tanvi — you are the best!`,
    who: 'Swa-Shakti · Group Batch',
  },
];

const HomeTestimonials = () => (
  <section className="section" style={{ background: 'var(--cream-light)', borderBlock: '1px solid var(--rule)' }}>
    <div className="container">
      <SectionLabel num="04">From the community</SectionLabel>
      <h2 className="display-2" style={{ marginBottom: 48, maxWidth: 600 }}>
        In their <span className="italic" style={{ color: 'var(--clay)' }}>own words</span>.
      </h2>

      <div className="testimonials-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 24,
      }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{
            background: 'var(--cream)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            position: 'relative',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 64,
              lineHeight: 0.8,
              color: 'var(--clay)',
              opacity: 0.5,
            }}>"</div>
            <div style={{ flex: 1 }}>
              {t.q.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: j < t.q.split('\n\n').length - 1 ? 14 : 0 }}>
                  {para}
                </p>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-soft)' }}>
                {t.who}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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

const Home = ({ setPage, onEnquire, onOpenProgram }) => (
  <main>
    <HomeHero setPage={setPage} onEnquire={onEnquire} />
    <HomeIntro />
    <HomeStory setPage={setPage} />
    <HomePrograms onOpenProgram={onOpenProgram} setPage={setPage} />
    <HomeSchedulePreview setPage={setPage} />
    <HomeTestimonials />
    <HomePress />
    <HomeFinalCTA onEnquire={onEnquire} />
  </main>
);

export default Home;
