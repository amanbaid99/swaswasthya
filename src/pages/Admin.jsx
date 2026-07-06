import React from 'react';
import { supabase } from '../lib/supabase.js';

/* ─── helpers ─── */
const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const fmt = (ts) =>
  ts ? new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const CATEGORIES = ['Wellness', 'Strength', 'Nutrition', 'Breathwork', 'Mindfulness', 'Community', 'Prenatal'];

/* ─── styles ─── */
const S = {
  shell: { minHeight: '100vh', background: '#f5f2ed', fontFamily: 'system-ui, sans-serif', color: '#1a2e1a' },
  header: { background: '#1a2e1a', color: '#f5f2ed', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20, letterSpacing: '0.02em' },
  main: { maxWidth: 1100, margin: '0 auto', padding: '40px 24px' },
  card: { background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  h2: { fontSize: 22, fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 24, color: '#1a2e1a' },
  btn: { padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500 },
  btnPrimary: { background: '#1a2e1a', color: '#f5f2ed' },
  btnGhost: { background: 'transparent', color: '#1a2e1a', border: '1px solid #d4c9b5' },
  btnDanger: { background: '#c0392b', color: '#fff' },
  btnSm: { padding: '6px 14px', fontSize: 12, borderRadius: 6 },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #d4c9b5', borderRadius: 8, fontSize: 14, background: '#faf8f4', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', color: '#1a2e1a' },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a6e5a', marginBottom: 6, display: 'block' },
  row: { display: 'flex', gap: 16, alignItems: 'center' },
  tag: { display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' },
  tagPublished: { background: '#d4edda', color: '#1a5e1a' },
  tagDraft: { background: '#f2e8d4', color: '#7a5a1a' },
};

/* ─── Login ─── */
const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    onLogin(data.session);
  };

  return (
    <div style={{ ...S.shell, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...S.card, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 28, color: '#1a2e1a' }}>Swa-Swasthya</div>
          <div style={{ fontSize: 13, color: '#7a8a7a', marginTop: 6 }}>Admin · Sign in</div>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={S.label}>Email</label>
            <input style={S.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 13, margin: 0 }}>{error}</p>}
          <button style={{ ...S.btn, ...S.btnPrimary, marginTop: 8 }} type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ─── Post Form ─── */
const PostForm = ({ post, onSave, onCancel }) => {
  const isNew = !post?.id;
  const [form, setForm] = React.useState({
    title: post?.title || '',
    slug: post?.slug || '',
    category: post?.category || CATEGORIES[0],
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image_url: post?.image_url || '',
    published: post?.published || false,
  });
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (v) => {
    set('title', v);
    if (isNew) set('slug', slugify(v));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    const payload = {
      ...form,
      updated_at: new Date().toISOString(),
      ...(form.published && !post?.published_at ? { published_at: new Date().toISOString() } : {}),
    };
    let result;
    if (isNew) {
      result = await supabase.from('blogs').insert([payload]).select().single();
    } else {
      result = await supabase.from('blogs').update(payload).eq('id', post.id).select().single();
    }
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    onSave(result.data);
  };

  const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 6 };

  return (
    <div style={S.card}>
      <div style={{ ...S.row, justifyContent: 'space-between', marginBottom: 28 }}>
        <h2 style={{ ...S.h2, marginBottom: 0 }}>{isNew ? 'New post' : 'Edit post'}</h2>
        <button style={{ ...S.btn, ...S.btnGhost }} onClick={onCancel}>← Back</button>
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={fieldStyle}>
            <label style={S.label}>Title *</label>
            <input style={S.input} value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
          </div>
          <div style={fieldStyle}>
            <label style={S.label}>Slug *</label>
            <input style={S.input} value={form.slug} onChange={(e) => set('slug', e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={fieldStyle}>
            <label style={S.label}>Category</label>
            <select style={{ ...S.input, appearance: 'none' }} value={form.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={S.label}>Cover Image URL</label>
            <input style={S.input} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={S.label}>Excerpt (shown on home page)</label>
          <textarea style={{ ...S.input, height: 80, resize: 'vertical' }} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
        </div>

        <div style={fieldStyle}>
          <label style={S.label}>Content <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#9a9a8a' }}>(Markdown supported)</span></label>
          <textarea style={{ ...S.input, height: 360, resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} value={form.content} onChange={(e) => set('content', e.target.value)} placeholder="Write your post here...&#10;&#10;## Add a heading&#10;&#10;Regular paragraph text.&#10;&#10;**Bold text** and *italic text*&#10;&#10;Add an image:&#10;![Image description](https://your-image-url.jpg)&#10;&#10;- Bullet point&#10;- Another point" />
          <div style={{ fontSize: 11, color: '#9a9a8a', lineHeight: 1.6, marginTop: 4 }}>
            <strong>Images:</strong> <code>![description](https://image-url.jpg)</code> &nbsp;·&nbsp;
            <strong>Heading:</strong> <code>## Heading</code> &nbsp;·&nbsp;
            <strong>Bold:</strong> <code>**text**</code> &nbsp;·&nbsp;
            <strong>Italic:</strong> <code>*text*</code> &nbsp;·&nbsp;
            <strong>Quote:</strong> <code>&gt; text</code>
          </div>
        </div>

        <div style={{ ...S.row, justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #e8e2d8' }}>
          <label style={{ ...S.row, cursor: 'pointer', gap: 10, userSelect: 'none' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#1a2e1a' }} />
            <span style={{ fontSize: 14, color: '#1a2e1a' }}>Publish immediately</span>
          </label>
          <div style={S.row}>
            {error && <span style={{ fontSize: 13, color: '#c0392b' }}>{error}</span>}
            <button style={{ ...S.btn, ...S.btnGhost }} type="button" onClick={onCancel}>Cancel</button>
            <button style={{ ...S.btn, ...S.btnPrimary }} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create post' : 'Save changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ─── Post List ─── */
const PostList = ({ posts, onNew, onEdit, onDelete, onTogglePublish, loading }) => (
  <div style={S.card}>
    <div style={{ ...S.row, justifyContent: 'space-between', marginBottom: 28 }}>
      <h2 style={{ ...S.h2, marginBottom: 0 }}>Blog posts</h2>
      <button style={{ ...S.btn, ...S.btnPrimary }} onClick={onNew}>+ New post</button>
    </div>

    {loading && <p style={{ color: '#7a8a7a', fontSize: 14 }}>Loading…</p>}

    {!loading && posts.length === 0 && (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#7a8a7a' }}>
        <p style={{ fontSize: 16, marginBottom: 8 }}>No posts yet.</p>
        <p style={{ fontSize: 13 }}>Create your first post to get started.</p>
      </div>
    )}

    {!loading && posts.length > 0 && (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e8e2d8' }}>
            {['Title', 'Category', 'Status', 'Date', ''].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a8a7a', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f0ece4' }}>
              <td style={{ padding: '14px 12px', color: '#1a2e1a', fontWeight: 500, maxWidth: 300 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{p.title}</div>
                <div style={{ fontSize: 11, color: '#9a9a8a', marginTop: 2 }}>{p.slug}</div>
              </td>
              <td style={{ padding: '14px 12px', color: '#5a6e5a' }}>{p.category}</td>
              <td style={{ padding: '14px 12px' }}>
                <span style={{ ...S.tag, ...(p.published ? S.tagPublished : S.tagDraft) }}>
                  {p.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td style={{ padding: '14px 12px', color: '#7a8a7a', fontSize: 13 }}>
                {p.published ? fmt(p.published_at) : fmt(p.created_at)}
              </td>
              <td style={{ padding: '14px 12px' }}>
                <div style={{ ...S.row, gap: 8, justifyContent: 'flex-end' }}>
                  <button style={{ ...S.btn, ...S.btnSm, ...S.btnGhost }} onClick={() => onTogglePublish(p)}>
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button style={{ ...S.btn, ...S.btnSm, background: '#e8e2d8', color: '#1a2e1a', border: 'none' }} onClick={() => onEdit(p)}>Edit</button>
                  <button style={{ ...S.btn, ...S.btnSm, ...S.btnDanger }} onClick={() => onDelete(p)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

/* ─── Admin root ─── */
const Admin = () => {
  const [session, setSession] = React.useState(null);
  const [checking, setChecking] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [loadingPosts, setLoadingPosts] = React.useState(false);
  const [view, setView] = React.useState('list'); // 'list' | 'new' | 'edit'
  const [editPost, setEditPost] = React.useState(null);

  React.useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const fetchPosts = React.useCallback(async () => {
    if (!supabase) return;
    setLoadingPosts(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoadingPosts(false);
  }, []);

  React.useEffect(() => {
    if (session) fetchPosts();
  }, [session, fetchPosts]);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleSave = (saved) => {
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [saved, ...prev];
    });
    setView('list');
    setEditPost(null);
  };

  const handleDelete = async (post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await supabase.from('blogs').delete().eq('id', post.id);
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  };

  const handleTogglePublish = async (post) => {
    const update = {
      published: !post.published,
      updated_at: new Date().toISOString(),
      ...(!post.published ? { published_at: new Date().toISOString() } : {}),
    };
    const { data } = await supabase.from('blogs').update(update).eq('id', post.id).select().single();
    if (data) setPosts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  };

  if (!supabase) return (
    <div style={{ ...S.shell, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...S.card, maxWidth: 480, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 12 }}>Supabase not configured</h2>
        <p style={{ color: '#7a8a7a', fontSize: 14, lineHeight: 1.6 }}>
          Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file and rebuild.
        </p>
      </div>
    </div>
  );

  if (checking) return <div style={{ ...S.shell, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7a8a7a' }}>Loading…</div>;

  if (!session) return <Login onLogin={setSession} />;

  return (
    <div style={S.shell}>
      <header style={S.header}>
        <div style={S.logo}>Swa-Swasthya · Admin</div>
        <div style={S.row}>
          <span style={{ fontSize: 13, color: '#a0b0a0' }}>{session.user.email}</span>
          <button style={{ ...S.btn, ...S.btnSm, background: 'rgba(255,255,255,0.12)', color: '#f5f2ed', border: 'none' }} onClick={logout}>Sign out</button>
        </div>
      </header>

      <main style={S.main}>
        {view === 'list' && (
          <PostList
            posts={posts}
            loading={loadingPosts}
            onNew={() => { setEditPost(null); setView('new'); }}
            onEdit={(p) => { setEditPost(p); setView('edit'); }}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
          />
        )}
        {(view === 'new' || view === 'edit') && (
          <PostForm
            post={view === 'edit' ? editPost : null}
            onSave={handleSave}
            onCancel={() => { setView('list'); setEditPost(null); }}
          />
        )}
      </main>
    </div>
  );
};

export default Admin;
