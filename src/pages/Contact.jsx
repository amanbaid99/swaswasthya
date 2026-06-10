import React from 'react';
import { PROGRAMS } from '../data/programs.js';
import { ImgPh, SectionLabel } from '../components/common.jsx';

const ContactCard = ({ label, title, sub, cta, href, dark }) => (
  <a
    href={href}
    style={{
      padding: '28px 30px',
      background: dark ? 'var(--green-deep)' : 'var(--cream-light)',
      color: dark ? 'var(--cream)' : 'var(--ink)',
      border: dark ? 'none' : '1px solid var(--rule)',
      borderRadius: 'var(--radius-md)',
      display: 'block',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div className="mono" style={{
      fontSize: 10,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: dark ? 'var(--tan)' : 'var(--green-soft)',
      marginBottom: 8,
    }}>
      {label}
    </div>
    <div style={{
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 30,
      lineHeight: 1.15,
      color: dark ? 'var(--cream-light)' : 'var(--green-deep)',
      marginBottom: 8,
    }}>
      {title}
    </div>
    <div style={{
      fontSize: 13,
      color: dark ? 'rgba(240, 229, 207, 0.7)' : 'var(--ink-soft)',
      marginBottom: 16,
      lineHeight: 1.5,
    }}>
      {sub}
    </div>
    <div className="mono" style={{
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: dark ? 'var(--blush)' : 'var(--clay)',
    }}>
      {cta} →
    </div>
  </a>
);

const FAQList = () => {
  const faqs = [
    {
      q: "I've never trained before. Is this for me?",
      a: "Yes — most of our community started with us at \"complete beginner\". Every session has variations for all levels, and we begin with form first, always.",
    },
    {
      q: 'Online or offline — what should I pick?',
      a: 'Online works beautifully for the majority of our members (most live outside Pune). Offline is best if you want hands-on form correction and the energy of a room. You can switch between the two.',
    },
    {
      q: 'How long until I see results?',
      a: 'Strength changes show in 3–4 weeks. Visible body recomposition typically lands at 8–12 weeks of consistent practice. The Swa transformation capsule has a more accelerated timeline.',
    },
    {
      q: 'Do you accept men in the group batches?',
      a: "Our group batches are women-only — it's deliberate and part of the community feel. The 1:1 personal training program is open to all.",
    },
    {
      q: 'Cancellation and rescheduling?',
      a: 'Reschedule any session up to 4 hours before. Monthly plans are non-refundable after the first week, but unused sessions roll over with prior notice.',
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <div>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{
            borderTop: '1px solid var(--rule)',
            borderBottom: i === faqs.length - 1 ? '1px solid var(--rule)' : 'none',
          }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '24px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24,
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 22,
                color: 'var(--green-deep)',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              <span>{f.q}</span>
              <span style={{
                color: 'var(--clay)',
                fontSize: 22,
                transition: 'transform 0.25s',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                flexShrink: 0,
              }}>+</span>
            </button>
            {isOpen && (
              <div style={{
                paddingBottom: 24,
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--ink-soft)',
                maxWidth: 620,
                animation: 'fadein 0.25s ease',
              }}>
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const EnquiryModal = ({ open, onClose, initialProgram }) => {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    program: initialProgram || 'Swa-Shakti',
    mode: 'Online',
    when: 'Within a week',
    message: '',
  });

  React.useEffect(() => {
    if (open) setStep(1);
  }, [open]);

  if (!open) return null;

  const submit = () => setStep(3);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            color: 'var(--ink-soft)',
            cursor: 'pointer',
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: '50%',
          }}
        >
          ×
        </button>

        {step !== 3 && (
          <div style={{
            padding: '32px 40px 16px',
            borderBottom: '1px solid var(--rule)',
          }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--green-soft)', textTransform: 'uppercase', marginBottom: 8 }}>
              Step {step} of 2 · Free intro session
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32, color: 'var(--green-deep)', lineHeight: 1.15 }}>
              {step === 1 ? 'Tell us about yourself.' : "And a bit about what you're looking for."}
            </div>
          </div>
        )}

        <div style={{ padding: step === 3 ? '60px 40px' : '32px 40px 40px' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div className="field">
                <label>Your name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Anjali"
                  autoFocus
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label>Phone / WhatsApp</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  type="tel"
                  placeholder="+91 …"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                className="btn btn-primary"
                disabled={!form.name || !form.email}
                style={{
                  marginTop: 12,
                  opacity: (!form.name || !form.email) ? 0.5 : 1,
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div className="field">
                <label>Which program interests you?</label>
                <select
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                >
                  {PROGRAMS.map((p) => <option key={p.id}>{p.name}</option>)}
                  <option>Not sure — let's talk</option>
                </select>
              </div>

              <div className="field">
                <label>Preferred mode</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {['Online', 'Offline', 'Either'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setForm({ ...form, mode: m })}
                      type="button"
                      style={{
                        padding: '10px 18px',
                        border: '1px solid',
                        borderColor: form.mode === m ? 'var(--green-deep)' : 'var(--rule)',
                        background: form.mode === m ? 'var(--green-deep)' : 'transparent',
                        color: form.mode === m ? 'var(--cream)' : 'var(--ink)',
                        borderRadius: 100,
                        fontSize: 13,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>When would you like to start?</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                  {['This week', 'Within a month', 'Just exploring'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setForm({ ...form, when: w })}
                      type="button"
                      style={{
                        padding: '10px 18px',
                        border: '1px solid',
                        borderColor: form.when === w ? 'var(--green-deep)' : 'var(--rule)',
                        background: form.when === w ? 'var(--green-deep)' : 'transparent',
                        color: form.when === w ? 'var(--cream)' : 'var(--ink)',
                        borderRadius: 100,
                        fontSize: 13,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Anything else? (optional)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Goals, injuries, life stage…"
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button onClick={() => setStep(1)} className="btn btn-ghost">
                  ← Back
                </button>
                <button onClick={submit} className="btn btn-primary" style={{ flex: 1 }}>
                  Send enquiry
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--blush-light)',
                border: '1px solid var(--clay)',
                color: 'var(--clay)',
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                ✓
              </div>
              <h2 className="display-3" style={{ marginBottom: 12, fontSize: 36 }}>
                Sent. <span className="italic" style={{ color: 'var(--clay)' }}>Thank you</span>.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 28 }}>
                Tanvi will get back to you within 24 hours with the next steps and a calendar link for your free intro call.
              </p>
              <button onClick={onClose} className="btn btn-outline">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Contact = ({ onEnquire }) => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Swa-Shakti · Group strength',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', interest: 'Swa-Shakti · Group strength', message: '' });
    }, 4000);
  };

  return (
    <main>
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="eyebrow">Get in touch</span>
          <h1 className="display-1" style={{
            fontStyle: 'italic',
            marginTop: 20,
            fontSize: 'clamp(40px, 8cqw, 130px)',
            maxWidth: 1100,
          }}>
            Let's start a <span style={{ color: 'var(--clay)' }}>conversation</span>.
          </h1>
          <p style={{
            fontSize: 17,
            color: 'var(--ink-soft)',
            maxWidth: 600,
            lineHeight: 1.6,
            marginTop: 24,
          }}>
            Tell us what you're looking for. We'll send back a thoughtful plan within 24 hours — and the first 20-minute intro call is always free.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 56,
          }}>
            {/* Form */}
            <div style={{
              background: 'var(--cream-light)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-lg)',
              padding: '48px',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--blush-light)',
                    border: '1px solid var(--clay)',
                    color: 'var(--clay)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 36,
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}>
                    ✓
                  </div>
                  <h2 className="display-3" style={{ marginBottom: 12 }}>
                    Thank you, <span className="italic" style={{ color: 'var(--clay)' }}>truly</span>.
                  </h2>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto' }}>
                    Tanvi will write back within 24 hours. Check your inbox — and your spam folder, just in case.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 32,
                  }}>
                    <span className="section-num">↳</span>
                    <span className="eyebrow">Send an enquiry</span>
                  </div>

                  <div className="contact-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                    <div className="field">
                      <label>Your name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="e.g. Anjali"
                      />
                    </div>
                    <div className="field">
                      <label>Phone</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        type="tel"
                        placeholder="+91 …"
                      />
                    </div>
                  </div>

                  <div className="field" style={{ marginBottom: 24 }}>
                    <label>Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      type="email"
                      required
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="field" style={{ marginBottom: 24 }}>
                    <label>I'm interested in</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    >
                      {PROGRAMS.map((p) => (
                        <option key={p.id}>{p.name.replace('The ', '').replace(' Edit', '')} · {p.sub}</option>
                      ))}
                      <option>Not sure yet — let's talk</option>
                    </select>
                  </div>

                  <div className="field" style={{ marginBottom: 32 }}>
                    <label>A note (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What are you hoping to work on? Any injuries or considerations?"
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16,
                  }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-soft)' }}>
                      We respond within 24 hrs
                    </span>
                    <button type="submit" className="btn btn-primary">
                      Send enquiry →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Side info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ContactCard
                label="Phone / WhatsApp"
                title="99230 86478"
                sub="Mon–Sat · 9 AM – 7 PM"
                cta="Call now"
                href="tel:9923086478"
              />
              <ContactCard
                label="Instagram"
                title="@swaswasthya"
                sub="Daily practice, reels, community moments"
                cta="Follow"
                href="https://instagram.com/swaswasthya"
              />
              <ContactCard
                label="Studio · Offline"
                title="Pune, Maharashtra"
                sub="Exact location shared on confirmation"
                cta="Get directions"
                href="#"
              />
              <ContactCard
                label="Email"
                title="hello@swaswasthya.in"
                sub="For collaborations & longer notes"
                cta="Write to us"
                href="mailto:hello@swaswasthya.in"
                dark
              />
            </div>
          </div>

          <style>{`
            @container site (max-width: 900px) {
              .contact-grid { grid-template-columns: 1fr !important; }
            }
            @container site (max-width: 520px) {
              .contact-fields { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--cream-light)', borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          <div className="faq-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 64,
          }}>
            <div>
              <SectionLabel num="·">Common questions</SectionLabel>
              <h2 className="display-2">
                Before you <span className="italic" style={{ color: 'var(--clay)' }}>write to us</span>.
              </h2>
            </div>
            <FAQList />
          </div>
        </div>

        <style>{`
          @container site (max-width: 900px) {
            .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* Map / Location placeholder */}
      <section style={{ padding: 0 }}>
        <ImgPh label="map · pune studio location" height={420} radius="0" />
      </section>
    </main>
  );
};

export default Contact;
