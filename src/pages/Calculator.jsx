import React from 'react';
import { SectionLabel, HomeFinalCTA } from '../components/common.jsx';
import { PROGRAMS } from '../data/programs.js';

/* ── Formulas ── */
function calcBMR(weight, height, age, gender) {
  // Mifflin-St Jeor — most accurate for general population
  return gender === 'female'
    ? 10 * weight + 6.25 * height - 5 * age - 161
    : 10 * weight + 6.25 * height - 5 * age + 5;
}

function calcBMI(weight, height) {
  const hm = height / 100;
  return weight / (hm * hm);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'var(--clay)' };
  if (bmi < 25)   return { label: 'Healthy range', color: 'var(--green-soft)' };
  if (bmi < 30)   return { label: 'Overweight', color: 'var(--clay)' };
  return             { label: 'Obese', color: '#a03030' };
}

function idealWeightRange(height, gender) {
  // BMI 18.5–24.9 for their height
  const hm = height / 100;
  const lo = Math.round(18.5 * hm * hm);
  const hi = Math.round(24.9 * hm * hm);
  return { lo, hi };
}

function calcProtein(weight, activity, goal) {
  // Base: 0.8g/kg sedentary; up to 2.2g/kg for very active / muscle gain
  const base = {
    sedentary: 0.8,
    light:     1.2,
    moderate:  1.6,
    active:    2.0,
    very_active: 2.2,
  }[activity] || 1.2;
  const goalBoost = goal === 'gain' ? 0.2 : goal === 'lose' ? 0.1 : 0;
  const gPerKg = Math.min(base + goalBoost, 2.4);
  return {
    min: Math.round(weight * 0.8),
    optimal: Math.round(weight * gPerKg),
    gPerKg: gPerKg.toFixed(1),
  };
}

const ACTIVITY_OPTS = [
  { id: 'sedentary',   label: 'Sedentary',   sub: 'Desk job, little movement' },
  { id: 'light',       label: 'Light',        sub: '1–2 workouts / week' },
  { id: 'moderate',    label: 'Moderate',     sub: '3–5 workouts / week' },
  { id: 'active',      label: 'Active',       sub: '6–7 workouts / week' },
  { id: 'very_active', label: 'Very active',  sub: 'Training twice daily' },
];
const ACTIVITY_MULT = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };

const GOAL_OPTS = [
  { id: 'lose',     label: 'Lose fat',       sub: 'Deficit of ~300 kcal', adj: -300 },
  { id: 'maintain', label: 'Maintain',       sub: 'Sustain current weight', adj: 0 },
  { id: 'gain',     label: 'Build muscle',   sub: 'Surplus of ~300 kcal', adj: 300 },
];

function suggestedPrograms(goal, bmi) {
  if (goal === 'lose' || bmi >= 25) {
    return ['swa-shakti', 'swa'];
  }
  if (goal === 'gain') {
    return ['swa-shakti', 'swa-and-i'];
  }
  return ['swa-dhyana', 'swa-tej'];
}

/* ── Sub-components ── */
const ChipSelect = ({ options, value, onChange }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {options.map((o) => (
      <button
        key={o.id}
        type="button"
        onClick={() => onChange(o.id)}
        style={{
          padding: '10px 18px',
          border: '1px solid',
          borderColor: value === o.id ? 'var(--green-deep)' : 'var(--rule)',
          background: value === o.id ? 'var(--green-deep)' : 'transparent',
          color: value === o.id ? 'var(--cream)' : 'var(--ink)',
          borderRadius: 100,
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          lineHeight: 1.3,
        }}
      >
        <span style={{ fontWeight: 500 }}>{o.label}</span>
        {o.sub && (
          <span style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            opacity: 0.75,
            textTransform: 'uppercase',
          }}>
            {o.sub}
          </span>
        )}
      </button>
    ))}
  </div>
);

const MetricCard = ({ label, value, unit, sub, accent = false, bar }) => (
  <div style={{
    background: accent ? 'var(--green-deep)' : 'var(--cream-light)',
    border: accent ? 'none' : '1px solid var(--rule)',
    borderRadius: 'var(--radius-lg)',
    padding: '36px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }}>
    <div className="mono" style={{
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: accent ? 'var(--tan)' : 'var(--green-soft)',
    }}>
      {label}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(40px, 5cqw, 72px)',
        lineHeight: 1,
        color: accent ? 'var(--cream-light)' : 'var(--green-deep)',
        letterSpacing: '-0.02em',
      }}>
        {value}
      </div>
      {unit && (
        <div className="mono" style={{
          fontSize: 14,
          color: accent ? 'var(--tan)' : 'var(--ink-soft)',
          letterSpacing: '0.08em',
        }}>
          {unit}
        </div>
      )}
    </div>
    {bar && (
      <div style={{
        height: 4,
        borderRadius: 100,
        background: accent ? 'rgba(240,229,207,0.2)' : 'var(--cream-deep)',
        overflow: 'hidden',
        marginTop: 4,
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min(bar.pct, 100)}%`,
          background: bar.color || 'var(--clay)',
          borderRadius: 100,
          transition: 'width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }} />
      </div>
    )}
    {sub && (
      <div style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: accent ? 'rgba(240,229,207,0.75)' : 'var(--ink-soft)',
        marginTop: 4,
      }}>
        {sub}
      </div>
    )}
  </div>
);

/* ── Main component ── */
const VEG_SOURCES = [
  { food: 'Soya chunks (dry)', amount: '52g', per: '100g', note: 'Highest plant protein' },
  { food: 'Paneer', amount: '18g', per: '100g', note: 'Staple, easy to cook' },
  { food: 'Chana / Chickpeas', amount: '19g', per: '100g dry', note: 'Chole, chaat, curries' },
  { food: 'Moong dal', amount: '24g', per: '100g dry', note: 'Easiest to digest' },
  { food: 'Rajma', amount: '9g', per: '100g cooked', note: 'Great with rice' },
  { food: 'Peanuts', amount: '26g', per: '100g', note: 'Snack or chutney' },
  { food: 'Hung curd / Greek yogurt', amount: '10g', per: '100g', note: 'Breakfast or raita' },
  { food: 'Tofu', amount: '8g', per: '100g', note: 'Works like paneer' },
  { food: 'Almonds', amount: '21g', per: '100g', note: 'Soaked or as milk' },
  { food: 'Quinoa', amount: '14g', per: '100g dry', note: 'Complete amino profile' },
];

const NONVEG_SOURCES = [
  { food: 'Chicken breast (cooked)', amount: '31g', per: '100g', note: 'Leanest meat choice' },
  { food: 'Eggs (whole)', amount: '13g', per: '2 eggs', note: 'Most bioavailable protein' },
  { food: 'Egg whites', amount: '11g', per: '100g', note: 'Zero fat option' },
  { food: 'Rohu / Katla fish', amount: '17g', per: '100g', note: 'Common in Indian homes' },
  { food: 'Tuna (canned)', amount: '25g', per: '100g', note: 'Quick, no cooking needed' },
  { food: 'Prawns', amount: '24g', per: '100g', note: 'Low fat, high protein' },
  { food: 'Mutton (lean)', amount: '26g', per: '100g', note: 'Rich in iron too' },
];

const PROTEIN_TIPS = [
  { tip: 'Start your day with protein', detail: 'Eggs, hung curd with nuts, or moong chilla — a high-protein breakfast reduces cravings all day.' },
  { tip: 'Add dal to every meal', detail: 'Even a small katori of dal adds 6–9g protein. Rotate moong, chana, masoor, and toor for variety.' },
  { tip: 'Snack smarter', detail: 'Swap biscuits for a handful of roasted chana or peanuts — the same volume adds 10× more protein.' },
  { tip: 'Make curd your ally', detail: 'Swap regular curd with Greek/hung curd (strain overnight). Same taste, 3× the protein.' },
  { tip: 'Spread intake across meals', detail: 'Your body can only use ~30–40g of protein at once. Aim for 4 balanced meals rather than loading at dinner.' },
];

const ProteinSourceRow = ({ food, amount, per, note, accent }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 16,
    padding: '12px 0',
    borderBottom: '1px solid var(--rule)',
    alignItems: 'center',
  }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{food}</div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>{note}</div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 20,
        color: accent || 'var(--green-deep)',
        lineHeight: 1,
      }}>{amount}</div>
      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginTop: 2 }}>{per}</div>
    </div>
  </div>
);

const Calculator = ({ onEnquire, setPage }) => {
  const [form, setForm] = React.useState({
    gender: 'female',
    age: '',
    heightCm: '',
    weightKg: '',
    activity: 'moderate',
    goal: 'maintain',
    unit: 'metric',
  });
  const [results, setResults] = React.useState(null);
  const resultsRef = React.useRef(null);
  const proteinGuideRef = React.useRef(null);

  // Convert ft+in to cm
  const [heightFt, setHeightFt] = React.useState('');
  const [heightIn, setHeightIn] = React.useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const isMetric = form.unit === 'metric';

  const getHeightCm = () => {
    if (isMetric) return parseFloat(form.heightCm);
    return Math.round((parseFloat(heightFt || 0) * 30.48) + (parseFloat(heightIn || 0) * 2.54));
  };

  const getWeightKg = () => {
    if (isMetric) return parseFloat(form.weightKg);
    return Math.round(parseFloat(form.weightKg) * 0.453592);
  };

  const canSubmit = () => {
    const h = getHeightCm();
    const w = getWeightKg();
    const a = parseInt(form.age);
    return h > 0 && w > 0 && a > 0 && a < 120;
  };

  const calculate = (e) => {
    e.preventDefault();
    const h = getHeightCm();
    const w = getWeightKg();
    const a = parseInt(form.age);

    const bmr = calcBMR(w, h, a, form.gender);
    const tdee = bmr * ACTIVITY_MULT[form.activity];
    const goalAdj = GOAL_OPTS.find((g) => g.id === form.goal)?.adj || 0;
    const dailyCal = Math.round(tdee + goalAdj);

    const bmi = calcBMI(w, h);
    const bmiCat = bmiCategory(bmi);
    const { lo, hi } = idealWeightRange(h, form.gender);

    const protein = calcProtein(w, form.activity, form.goal);

    setResults({
      dailyCal,
      bmr: Math.round(bmr),
      bmi: bmi.toFixed(1),
      bmiCat,
      idealLo: lo,
      idealHi: hi,
      currentWeight: w,
      protein,
      suggestedIds: suggestedPrograms(form.goal, bmi),
    });

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const activityLabel = ACTIVITY_OPTS.find((a) => a.id === form.activity)?.label || '';

  return (
    <main>
      {/* Hero */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="eyebrow">Health calculators</span>
          <h1 className="display-1" style={{
            fontStyle: 'italic',
            marginTop: 20,
            fontSize: 'clamp(40px, 8cqw, 130px)',
            maxWidth: 1100,
          }}>
            Know your <span style={{ color: 'var(--clay)' }}>numbers</span>.
          </h1>
          <p style={{
            fontSize: 17,
            color: 'var(--ink-soft)',
            maxWidth: 580,
            lineHeight: 1.6,
            marginTop: 24,
          }}>
            Your daily calorie target, ideal BMI range, and protein needs — personalised to your body, age, and goals. Takes 30 seconds.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '20px 0 80px' }}>
        <div className="container">
          <form onSubmit={calculate}>
            <div className="calc-layout" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 40,
              alignItems: 'start',
            }}>

              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

                {/* Gender */}
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 14 }}>
                    I am
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[{ id: 'female', label: 'Female' }, { id: 'male', label: 'Male' }].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => set('gender', g.id)}
                        style={{
                          padding: '12px 28px',
                          border: '1px solid',
                          borderColor: form.gender === g.id ? 'var(--green-deep)' : 'var(--rule)',
                          background: form.gender === g.id ? 'var(--green-deep)' : 'transparent',
                          color: form.gender === g.id ? 'var(--cream)' : 'var(--ink)',
                          borderRadius: 100,
                          fontSize: 14,
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                        }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div className="field">
                  <label>Age</label>
                  <input
                    type="number"
                    min="10" max="100"
                    placeholder="e.g. 35"
                    value={form.age}
                    onChange={(e) => set('age', e.target.value)}
                    style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  />
                </div>

                {/* Unit toggle */}
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 14 }}>
                    Units
                  </div>
                  <div style={{ display: 'flex', background: 'var(--cream-deep)', borderRadius: 100, padding: 3, width: 'fit-content' }}>
                    {[{ id: 'metric', label: 'Metric (kg / cm)' }, { id: 'imperial', label: 'Imperial (lbs / ft)' }].map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => set('unit', u.id)}
                        style={{
                          padding: '8px 18px',
                          border: 'none',
                          borderRadius: 100,
                          fontSize: 12,
                          fontFamily: 'var(--font-body)',
                          background: form.unit === u.id ? 'var(--green-deep)' : 'transparent',
                          color: form.unit === u.id ? 'var(--cream)' : 'var(--ink-soft)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height */}
                {isMetric ? (
                  <div className="field">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      min="100" max="250"
                      placeholder="e.g. 163"
                      value={form.heightCm}
                      onChange={(e) => set('heightCm', e.target.value)}
                      style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
                      Height
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div className="field" style={{ flex: 1 }}>
                        <label>Feet</label>
                        <input
                          type="number" min="3" max="8" placeholder="5"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                        />
                      </div>
                      <div className="field" style={{ flex: 1 }}>
                        <label>Inches</label>
                        <input
                          type="number" min="0" max="11" placeholder="4"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Weight */}
                <div className="field">
                  <label>Weight ({isMetric ? 'kg' : 'lbs'})</label>
                  <input
                    type="number"
                    min="20" max="300"
                    placeholder={isMetric ? 'e.g. 65' : 'e.g. 143'}
                    value={form.weightKg}
                    onChange={(e) => set('weightKg', e.target.value)}
                    style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  />
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

                {/* Activity */}
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 14 }}>
                    Activity level
                  </div>
                  <ChipSelect options={ACTIVITY_OPTS} value={form.activity} onChange={(v) => set('activity', v)} />
                </div>

                {/* Goal */}
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 14 }}>
                    My goal
                  </div>
                  <ChipSelect options={GOAL_OPTS} value={form.goal} onChange={(v) => set('goal', v)} />
                </div>

                {/* CTA */}
                <div style={{ marginTop: 8 }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!canSubmit()}
                    style={{
                      width: '100%',
                      fontSize: 14,
                      padding: '18px 32px',
                      opacity: canSubmit() ? 1 : 0.45,
                    }}
                  >
                    Calculate my numbers →
                  </button>
                  <p className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-soft)', marginTop: 12, textAlign: 'center', textTransform: 'uppercase' }}>
                    All calculations stay on your device — nothing is stored
                  </p>
                </div>
              </div>
            </div>
          </form>

          <style>{`
            @container site (max-width: 760px) {
              .calc-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Results */}
      {results && (
        <div ref={resultsRef}>
          <section style={{
            background: 'var(--green-deep)',
            padding: '80px 0',
            borderTop: '1px solid var(--rule)',
          }}>
            <div className="container">
              <div style={{ marginBottom: 48 }}>
                <span className="eyebrow" style={{ color: 'var(--tan)' }}>Your results</span>
                <h2 className="display-2" style={{ color: 'var(--cream-light)', marginTop: 12, maxWidth: 800 }}>
                  Here's what your body <span style={{ color: 'var(--blush)', fontStyle: 'italic' }}>needs daily</span>.
                </h2>
              </div>

              <div className="results-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
              }}>
                {/* Calories */}
                <div style={{
                  background: 'var(--cream-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 40px',
                  gridColumn: 'span 1',
                }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 12 }}>
                    Daily calories
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 5cqw, 80px)', lineHeight: 1, color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                      {results.dailyCal.toLocaleString()}
                    </div>
                    <div className="mono" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>kcal</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span>Resting (BMR)</span>
                      <span className="mono" style={{ fontSize: 12 }}>{results.bmr.toLocaleString()} kcal</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span>Activity level</span>
                      <span className="mono" style={{ fontSize: 12 }}>{activityLabel}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span>Goal adjustment</span>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--clay)' }}>
                        {GOAL_OPTS.find((g) => g.id === form.goal)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BMI */}
                <div style={{
                  background: 'var(--cream-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 40px',
                }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 12 }}>
                    Your BMI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 5cqw, 80px)', lineHeight: 1, color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                      {results.bmi}
                    </div>
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 12px',
                    borderRadius: 100,
                    border: `1px solid ${results.bmiCat.color}`,
                    color: results.bmiCat.color,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}>
                    {results.bmiCat.label}
                  </div>
                  {/* BMI scale bar */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ height: 6, borderRadius: 100, background: 'var(--cream-deep)', overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${Math.min(((parseFloat(results.bmi) - 10) / 30) * 100, 100)}%`,
                        height: '100%',
                        background: results.bmiCat.color,
                        borderRadius: 100,
                        transition: 'width 0.8s cubic-bezier(0.2,0.8,0.2,1)',
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      {['10', '18.5', '25', '30', '40'].map((n) => (
                        <span key={n} className="mono" style={{ fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>{n}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 6 }}>
                      Ideal weight for your height
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--green-deep)' }}>
                      {results.idealLo} – {results.idealHi} kg
                    </div>
                  </div>
                </div>

                {/* Protein */}
                <div style={{
                  background: 'var(--blush-light)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 40px',
                }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-soft)', marginBottom: 12 }}>
                    Daily protein
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 5cqw, 80px)', lineHeight: 1, color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                      {results.protein.optimal}
                    </div>
                    <div className="mono" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>g/day</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span>Minimum (sedentary)</span>
                      <span className="mono" style={{ fontSize: 12 }}>{results.protein.min} g</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span>Target for your activity</span>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--clay)' }}>{results.protein.optimal} g</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span>Per meal (÷ 4)</span>
                      <span className="mono" style={{ fontSize: 12 }}>~{Math.round(results.protein.optimal / 4)} g</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTimeout(() => proteinGuideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)}
                    style={{
                      marginTop: 20,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: 'var(--green-deep)',
                      fontSize: 13,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                    }}
                  >
                    Best ways to meet your protein target →
                  </button>
                </div>
              </div>

              <style>{`
                @container site (max-width: 900px) {
                  .results-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
            </div>
          </section>

          {/* Protein Guide */}
          <section ref={proteinGuideRef} style={{ padding: '80px 0', borderBottom: '1px solid var(--rule)', background: 'var(--cream)' }}>
            <div className="container">
              <SectionLabel num="✦">Protein Guide</SectionLabel>
              <h2 className="display-2" style={{ marginBottom: 16, maxWidth: 760 }}>
                How to hit <span className="italic" style={{ color: 'var(--clay)' }}>{results.protein.optimal}g</span> every day.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 620, marginBottom: 60 }}>
                Meeting your protein target doesn't mean shakes and supplements. Here are the best sources available in most Indian kitchens — and a few habits that make it effortless.
              </p>

              {/* Tips strip */}
              <div className="protein-tips-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                marginBottom: 64,
              }}>
                {PROTEIN_TIPS.map((t, i) => (
                  <div key={i} style={{
                    background: i === 0 ? 'var(--green-deep)' : 'var(--cream-light)',
                    border: '1px solid var(--rule)',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px 28px',
                  }}>
                    <div className="mono" style={{
                      fontSize: 9,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: i === 0 ? 'var(--tan)' : 'var(--green-soft)',
                      marginBottom: 10,
                    }}>
                      Tip {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 18,
                      color: i === 0 ? 'var(--cream-light)' : 'var(--green-deep)',
                      lineHeight: 1.3,
                      marginBottom: 10,
                    }}>
                      {t.tip}
                    </div>
                    <p style={{
                      fontSize: 13,
                      lineHeight: 1.65,
                      color: i === 0 ? 'rgba(240,229,207,0.75)' : 'var(--ink-soft)',
                    }}>
                      {t.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sources tables */}
              <div className="protein-tables-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 40,
                alignItems: 'start',
              }}>
                {/* Vegetarian */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--green-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 16 }}>🌿</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--green-deep)', lineHeight: 1 }}>
                        Vegetarian sources
                      </h3>
                      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 4 }}>
                        Common in Indian households
                      </div>
                    </div>
                  </div>
                  {VEG_SOURCES.map((s, i) => (
                    <ProteinSourceRow key={i} {...s} accent="var(--green-deep)" />
                  ))}
                </div>

                {/* Non-vegetarian */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--clay)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 16 }}>🍗</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--green-deep)', lineHeight: 1 }}>
                        Non-veg sources
                      </h3>
                      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 4 }}>
                        Per 100g unless noted
                      </div>
                    </div>
                  </div>
                  {NONVEG_SOURCES.map((s, i) => (
                    <ProteinSourceRow key={i} {...s} accent="var(--clay)" />
                  ))}
                </div>
              </div>

              <div className="mono" style={{
                fontSize: 10,
                letterSpacing: '0.12em',
                color: 'var(--ink-soft)',
                lineHeight: 1.8,
                maxWidth: 720,
                textTransform: 'uppercase',
                borderTop: '1px solid var(--rule)',
                paddingTop: 24,
                marginTop: 48,
              }}>
                ✦ Protein values are approximate and may vary by brand, cooking method, and source. Numbers sourced from ICMR–NIN Indian food composition tables.
              </div>

              <style>{`
                @container site (max-width: 900px) {
                  .protein-tips-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @container site (max-width: 640px) {
                  .protein-tips-grid { grid-template-columns: 1fr !important; }
                  .protein-tables-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
            </div>
          </section>

          {/* Program recommendations */}
          <section className="section" style={{ background: 'var(--cream-light)', borderBottom: '1px solid var(--rule)' }}>
            <div className="container">
              <SectionLabel num="→">Based on your numbers</SectionLabel>
              <h2 className="display-2" style={{ marginBottom: 40, maxWidth: 760 }}>
                Programs that <span className="italic" style={{ color: 'var(--clay)' }}>match your goals</span>.
              </h2>

              <div className="reco-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 20,
                marginBottom: 40,
              }}>
                {results.suggestedIds.map((id) => {
                  const p = PROGRAMS.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} style={{
                      background: 'var(--cream)',
                      border: '1px solid var(--rule)',
                      borderRadius: 'var(--radius-md)',
                      padding: '28px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--green-soft)', letterSpacing: '0.14em' }}>{p.num} / 06</span>
                        <span className="tag">{p.format}</span>
                      </div>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 4 }}>{p.sub}</div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--green-deep)', lineHeight: 1.1 }}>
                          {p.name}
                        </h3>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{p.short}</p>
                      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                        <button onClick={onEnquire} className="btn btn-primary btn-sm">Enquire →</button>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--clay)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center' }}>{p.pricing}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setPage('programs')} className="btn btn-outline">
                  See all programs →
                </button>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 480 }}>
                  Not sure where to start? Book a free 20-minute intro call and Tanvi will guide you personally.
                </p>
              </div>

              <style>{`
                @container site (max-width: 640px) {
                  .reco-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
            </div>
          </section>

          {/* Disclaimer */}
          <section style={{ padding: '32px 0', borderBottom: '1px solid var(--rule)' }}>
            <div className="container">
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-soft)', lineHeight: 1.8, maxWidth: 860, textTransform: 'uppercase' }}>
                ✦ These numbers are estimates based on population-level formulas (Mifflin-St Jeor for calories, standard BMI scale, evidence-based protein guidelines). Individual metabolism varies. Consult a healthcare professional before making significant dietary changes. Swa-Swasthya is not a medical service.
              </p>
            </div>
          </section>
        </div>
      )}

      <HomeFinalCTA onEnquire={onEnquire} />
    </main>
  );
};

export default Calculator;
