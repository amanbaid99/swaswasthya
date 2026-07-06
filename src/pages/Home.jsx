import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROGRAMS } from '../data/programs.js';
import { ImgPh, SectionLabel, Marquee, HomeFinalCTA, LazyImage } from '../components/common.jsx';
import { supabase } from '../lib/supabase.js';

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
        className="hero-img"
        style={{
          width: '100%',
          height: 520,
          objectFit: 'cover',
          objectPosition: 'center 65%',
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
          fontSize: 'clamp(15px, 2cqw, 24px)',
          lineHeight: 1.4,
          color: 'var(--green-deep)',
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

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={onEnquire} style={{ width: '100%' }}>
            Book a free intro session
          </button>
        </div>

      </div>
    </div>

    <style>{`
      @container site (max-width: 640px) {
        .hero-bottom { grid-template-columns: 1fr !important; }
        .hero-img { height: 320px !important; }
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

const HomeBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (!supabase) return;
    supabase
      .from('blogs')
      .select('id, title, slug, category, excerpt, image_url, image_blur, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts(data || []));
  }, []);

  if (posts.length === 0) return null;

  const fmtDate = (ts) => ts
    ? new Date(ts).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : '';

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <SectionLabel num="01">Journal</SectionLabel>
            <h2 className="display-2">
              From the practice, <span className="italic" style={{ color: 'var(--clay)' }}>to you</span>.
            </h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/blog')}>All posts →</button>
        </div>

        <div className="blog-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }}>
          {posts.map((post) => (
            <article key={post.id} className="card" onClick={() => navigate(`/blog/${post.slug}`)} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', background: 'var(--cream-light)' }}>
              {post.image_url
                ? <LazyImage src={post.image_url} blurSrc={post.image_blur} alt={post.title} style={{ height: 220 }} />
                : <ImgPh label={post.category} height={220} radius="0" />
              }
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clay)' }}>{post.category}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--rule)', display: 'inline-block' }} />
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-soft)' }}>{fmtDate(post.published_at)}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--green-deep)', lineHeight: 1.3, marginBottom: 10 }}>{post.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 20 }}>{post.excerpt}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green-deep)' }}>Read →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @container site (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

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

const TESTIMONIALS = [
  {
    q: `I started it with my doctor's permission in about 3.5 months. I started realising its benefits gradually after a couple of months — even in the later months, I didn't have back ache or swollen feet, touchwood.\n\nIt has really helped me remain active throughout the pregnancy. I am especially surprised because I did not regularly exercise before I joined prenatal yoga and was not sure initially if I could manage. But thankfully, all went well and I am continuing it for the past 5 months till date and on!\n\nTanvi madam's overall personality is a great positive driving force. She takes the classes at each individual's comfortable pace and slowly increases and adds new necessary exercises. Even in online classes, madam has a close eye for details due to her experience — she gives personalised attention to every student.\n\nFor someone like me who did not like exercise or yoga before, I have surprisingly developed a liking for yoga too!`,
    who: 'Swa-Antara · Prenatal Wellness',
  },
  {
    q: `My fitness journey with Tanvi Dharmadhikari has been a progressive and a very humbling experience. She teaches us all the effective, different and impactful yoga poses with sheer dedication and makes sure that each workout is different from the other to avoid monotony.\n\nShe has targeted our problem and weak areas to strengthen on an individual level with her personal attention as well. I wake up every morning looking forward to her class and have achieved a good lung capacity and flexibility because of these stress busting yoga sessions.\n\nMost importantly, her friendly and motivating persona makes the class even more fun. Thank you so much Tanvi — you are the best!`,
    who: 'Swa-Shakti · Group Batch',
  },
  {
    q: `I delivered my baby boy on 13th September through a normal delivery.\n\nI want to sincerely thank you for making my pregnancy journey so enjoyable with your prenatal yoga and strengthening exercises. I've been consistent with the classes since my 4th month, and they became the highlight of my pregnancy. Each session filled my day with so much positivity and calmness — I truly looked forward to them every day!\n\nThe breathing exercises and Pavanmuktasana you taught were incredibly helpful during labor, especially when it came to managing the pain and pushing. I feel that your guidance was a key part of my smooth pregnancy and successful delivery.\n\nA big thank you for dedicating your time to teaching me these asanas, which made such a difference in my pregnancy!`,
    who: 'Swa-Antara · Prenatal Wellness',
  },
  {
    q: `I wanted to take a moment to express my sincere gratitude for the dedication and effort you put into our gym sessions. Your commitment to providing a well-rounded workout routine — including varied exercises for the upper body, lower body, and even incorporating yoga on Wednesdays — is truly commendable.\n\nThe variety in our workouts keeps us motivated and engaged, and I appreciate how you plan each week's schedule in advance with such care. Your hard work does not go unnoticed, and it makes a significant difference in our fitness journey.\n\nThank you for inspiring us to stay active and for making every workout session enjoyable and effective.`,
    who: 'Madhu Navlakha · Swa-Shakti',
  },
  {
    q: `All the years down the lane, exercise has been an integral part of my life — and all thanks to you for making it so exciting that we all look forward to our batch every single day.\n\nStaying fit and healthy and working out every day is what you have embedded in everyone's mind and soul. Starting a day without you is what I cannot think of for the rest of my life.\n\nThank you from the bottom of my heart.`,
    who: 'Hina Gujar · Long-standing Member',
  },
];

const HomeTestimonials = () => (
  <section className="section" style={{ background: 'var(--cream-light)', borderBlock: '1px solid var(--rule)' }}>
    <div className="container">
      <SectionLabel num="03">From the community</SectionLabel>
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


const HomeCalculatorNudge = ({ setPage }) => (
  <section style={{ background: 'var(--tan)', borderBlock: '1px solid var(--rule)', padding: '96px 0' }}>
    <div className="container" style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)' }}>
        Free tool · 30 seconds
      </span>
      <h2 className="display-1" style={{ fontStyle: 'italic', color: 'var(--green-deep)', lineHeight: 1.05, margin: '18px 0 24px' }}>
        How much should <span style={{ color: 'var(--clay)' }}>you</span> eat?
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 520, margin: '0 auto 36px' }}>
        Your daily calorie target, ideal BMI range, and protein needs — calculated to your body, age, and goals. A good place to start before anything else.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <button className="btn btn-primary" onClick={() => setPage('calculator')}>
          Calculate mine →
        </button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-soft)' }}>
          BMI · Calories · Protein
        </span>
      </div>
    </div>
  </section>
);

const Home = ({ setPage, onEnquire, onOpenProgram }) => (
  <main>
    <HomeHero setPage={setPage} onEnquire={onEnquire} />
    <HomeIntro />
    <HomeBlog />
    <HomePrograms onOpenProgram={onOpenProgram} setPage={setPage} />
    <HomeCalculatorNudge setPage={setPage} />
    <HomeTestimonials />
    <HomeFinalCTA onEnquire={onEnquire} />
  </main>
);

export default Home;
