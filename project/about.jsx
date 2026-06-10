/* about.jsx — About / Our Story page */

const About = ({ setPage, onEnquire }) => (
  <main>
    {/* Hero */}
    <section style={{ padding: '60px 0 80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <span className="eyebrow">Our story</span>
          <h1 className="display-1" style={{
            fontStyle: 'italic',
            marginTop: 20,
            fontSize: 'clamp(40px, 8cqw, 130px)',
          }}>
            It's you, it's me,<br/>
            <span style={{ color: 'var(--clay)' }}>it's us.</span>
          </h1>
          <p style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: 'var(--ink-soft)',
            marginTop: 32,
            maxWidth: 620,
            margin: '32px auto 0',
          }}>
            Eighteen years of practice. A community of women across ages, working towards health and wellness — together.
          </p>
        </div>
      </div>
    </section>

    {/* Founder portrait */}
    <section style={{ paddingBottom: 0 }}>
      <div className="container">
        <ImgPh label="founder portrait · full-bleed editorial" height={520} radius="var(--radius-lg)" />
      </div>
    </section>

    {/* The why */}
    <section className="section">
      <div className="container">
        <div className="about-philo" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 80,
        }}>
          <div>
            <SectionLabel num="01">Philosophy</SectionLabel>
            <h2 className="display-2">
              swa is <span className="italic" style={{ color: 'var(--clay)' }}>self</span>.<br/>
              swasthya is <span className="italic" style={{ color: 'var(--clay)' }}>health</span>.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--green-deep)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              And by finding and practicing the right balance between the physical and mental wellbeing, we are able to be closer to becoming our best self.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              The practice is not about chasing a body. It's about meeting yourself — body, breath, and mind — and building a relationship with strength that will outlast trends, seasons, and decades.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              That belief shapes every program we build. Strength training that respects hormones. Breathwork that calms the nervous system. Prenatal care that supports a woman through every trimester. Face yog that brings circulation back to the surface. All of it, integrated. All of it, sustainable.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @container site (max-width: 900px) {
          .about-philo { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>

    {/* Timeline */}
    <section className="section" style={{ background: 'var(--cream-light)', borderBlock: '1px solid var(--rule)' }}>
      <div className="container">
        <SectionLabel num="02">The journey</SectionLabel>
        <h2 className="display-2" style={{ marginBottom: 64, maxWidth: 720 }}>
          From a small room of four <span className="italic" style={{ color: 'var(--clay)' }}>to a movement</span>.
        </h2>

        <div className="timeline" style={{
          position: 'relative',
          paddingLeft: 28,
          borderLeft: '1px solid var(--rule)',
        }}>
          {[
            { year: '2007', title: 'A small room. Four women.', body: 'Started with the intention of using time productively. The first batch was four friends, a yoga mat, and a borrowed pair of dumbbells.' },
            { year: '2012', title: 'Group batches open.', body: 'The community grew slowly, mostly by word-of-mouth. Three time slots a day, six days a week. The structure that still holds today.' },
            { year: '2018', title: 'Prenatal wellness added.', body: 'After requests from members navigating pregnancy, a dedicated trimester-wise program was developed in collaboration with obstetric physiotherapists.' },
            { year: '2020', title: 'Online sessions begin.', body: 'Pandemic-era pivot. What started as a workaround became a permanent way for women across cities and countries to practice with us.' },
            { year: '2023', title: 'Six edits of the practice.', body: 'The framework crystallises into six "edits" — Shakti, Swa & I, Tej, Dhyana, Antara, and the Swa transformation capsule.' },
            { year: '2026', title: 'You are here.', body: 'Welcome. Whether you start with a single class or a six-month commitment, the door is the same one we opened in 2007.', current: true },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'relative',
              paddingBottom: 48,
              paddingLeft: 32,
            }}>
              <span style={{
                position: 'absolute',
                left: -34,
                top: 6,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: s.current ? 'var(--clay)' : 'var(--green-deep)',
                border: '3px solid var(--cream-light)',
                boxShadow: '0 0 0 1px var(--rule)',
              }} />
              <div className="mono" style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: s.current ? 'var(--clay)' : 'var(--green-soft)',
                marginBottom: 8,
              }}>
                {s.year}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 28,
                color: 'var(--green-deep)',
                marginBottom: 8,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 620 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Tanvi bio */}
    <section className="section">
      <div className="container">
        <div className="bio-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 72,
          alignItems: 'center',
        }}>
          <ImgPh label="tanvi · founder portrait" height={580} radius="var(--radius-lg)" />
          <div>
            <SectionLabel num="03">Meet Tanvi</SectionLabel>
            <h2 className="display-2" style={{ marginBottom: 28 }}>
              The teacher behind <span className="italic" style={{ color: 'var(--clay)' }}>the practice</span>.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 18 }}>
              Eighteen years of teaching. Hundreds of women coached. Tanvi blends strength training, mobility, yoga, breathwork, and lifestyle coaching into a single practice that respects how a woman's body changes through her life.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 28 }}>
              Trained across modalities. Certified in pre & postnatal fitness. A continuous learner — always returning to the mat as a student first.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 28 }}>
              {[
                ['Certified Personal Trainer', 'ACE / ACSM equivalent'],
                ['Pre & Postnatal Specialist', 'Trimester-wise expertise'],
                ['Yoga & Pranayam', 'Traditional lineage trained'],
                ['Face Yog & Lymphatic', 'Specialised practice'],
              ].map(([t, s], i) => (
                <div key={i} style={{
                  padding: '16px 0',
                  borderTop: '1px solid var(--rule)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--green-deep)', marginBottom: 2 }}>
                    {t}
                  </div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                    {s}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={onEnquire}>
              Train with Tanvi
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @container site (max-width: 900px) {
          .bio-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>

    {/* Values */}
    <section className="section" style={{ background: 'var(--green-deep)', color: 'var(--cream)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow" style={{ color: 'var(--tan)' }}>What guides us</span>
          <h2 className="display-2" style={{ color: 'var(--cream-light)', marginTop: 16 }}>
            Four <span className="italic" style={{ color: 'var(--blush)' }}>quiet</span> principles.
          </h2>
        </div>

        <div className="values-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1,
          background: 'rgba(240, 229, 207, 0.18)',
        }}>
          {[
            ['No shortcuts', 'Sustainable change takes time. We don\'t sell quick fixes because we don\'t believe in them.'],
            ['Body-aware', 'We work with hormones, life stages, and how a woman\'s body actually moves — not against it.'],
            ['Integrated', 'Strength, breath, mind, nutrition. Treated as one practice, not separate columns on a spreadsheet.'],
            ['Community-led', 'You don\'t practice alone. The women who show up beside you are part of why you keep coming back.'],
          ].map(([t, b], i) => (
            <div key={i} style={{
              background: 'var(--green-deep)',
              padding: '48px 40px',
            }}>
              <div className="mono" style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--tan)',
                marginBottom: 12,
              }}>
                / 0{i + 1}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 36,
                color: 'var(--cream-light)',
                marginBottom: 14,
              }}>
                {t}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(240, 229, 207, 0.78)', maxWidth: 440 }}>
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @container site (max-width: 700px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <HomeFinalCTA onEnquire={onEnquire} />
  </main>
);

window.About = About;
