import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { supabase } from '../lib/supabase.js';
import { ImgPh, SectionLabel, HomeFinalCTA } from '../components/common.jsx';

marked.setOptions({ breaks: true, gfm: true });

const fmtDate = (ts) => ts
  ? new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  : '';

/* ─── Post listing ─── */
const BlogList = ({ onEnquire }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('blogs')
      .select('id, title, slug, category, excerpt, image_url, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, []);

  return (
    <main>
      <section style={{ padding: '60px 0 48px' }}>
        <div className="container">
          <span className="eyebrow">Journal</span>
          <h1 className="display-1" style={{ fontStyle: 'italic', marginTop: 20, fontSize: 'clamp(40px, 6cqw, 100px)' }}>
            From the <span style={{ color: 'var(--clay)' }}>practice</span>.
          </h1>
        </div>
      </section>

      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          {loading && <p style={{ color: 'var(--ink-soft)' }}>Loading…</p>}

          {!loading && posts.length === 0 && (
            <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>No posts yet — check back soon.</p>
          )}

          {!loading && posts.length > 0 && (
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="card"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', background: 'var(--cream-light)' }}
                >
                  {post.image_url
                    ? <img src={post.image_url} alt={post.title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
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
          )}
        </div>
      </section>

      <style>{`
        @container site (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        @container site (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <HomeFinalCTA onEnquire={onEnquire} />
    </main>
  );
};

/* ─── Single post ─── */
const BlogPost = ({ onEnquire }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data }) => { setPost(data); setLoading(false); });
  }, [slug]);

  if (loading) return <main style={{ padding: '120px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>Loading…</main>;
  if (!post) return (
    <main style={{ padding: '120px 0', textAlign: 'center' }}>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>Post not found.</p>
      <button className="btn btn-ghost" onClick={() => navigate('/blog')}>← Back to journal</button>
    </main>
  );

  return (
    <main>
      <section style={{ padding: '60px 0 0' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <button
            onClick={() => navigate('/blog')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--ink-soft)', letterSpacing: '0.04em', marginBottom: 40, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            ← Journal
          </button>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clay)' }}>{post.category}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--rule)', display: 'inline-block' }} />
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-soft)' }}>{fmtDate(post.published_at)}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(32px, 5cqw, 64px)', color: 'var(--green-deep)', lineHeight: 1.2, marginBottom: 24 }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: 40, borderBottom: '1px solid var(--rule)', paddingBottom: 40 }}>
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {post.image_url && (
        <section style={{ padding: '0 0 48px' }}>
          <div className="container">
            <img src={post.image_url} alt={post.title} style={{ width: '100%', maxHeight: 520, objectFit: 'cover', borderRadius: 'var(--radius-lg)', display: 'block' }} />
          </div>
        </section>
      )}

      <section style={{ paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: marked(post.content || '') }}
          />
        </div>
      </section>

      <style>{`
        .blog-content { font-size: 17px; line-height: 1.85; color: var(--ink); }
        .blog-content p { margin-bottom: 1.4em; }
        .blog-content h1, .blog-content h2, .blog-content h3 {
          font-family: var(--font-display); font-style: italic;
          color: var(--green-deep); line-height: 1.25; margin: 2em 0 0.6em;
        }
        .blog-content h1 { font-size: 2em; }
        .blog-content h2 { font-size: 1.5em; }
        .blog-content h3 { font-size: 1.2em; }
        .blog-content strong { font-weight: 600; color: var(--green-deep); }
        .blog-content em { font-style: italic; }
        .blog-content ul, .blog-content ol { padding-left: 1.5em; margin-bottom: 1.4em; }
        .blog-content li { margin-bottom: 0.4em; }
        .blog-content img {
          width: 100%; border-radius: var(--radius-md);
          margin: 2em 0; display: block; object-fit: cover;
        }
        .blog-content blockquote {
          border-left: 3px solid var(--clay); margin: 2em 0;
          padding: 16px 24px; background: var(--cream-light);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-style: italic; color: var(--ink-soft);
        }
        .blog-content hr { border: none; border-top: 1px solid var(--rule); margin: 2.5em 0; }
        .blog-content a { color: var(--clay); text-decoration: underline; }
      `}</style>

      <HomeFinalCTA onEnquire={onEnquire} />
    </main>
  );
};

/* ─── Router ─── */
const Blog = ({ onEnquire }) => {
  const { slug } = useParams();
  return slug ? <BlogPost onEnquire={onEnquire} /> : <BlogList onEnquire={onEnquire} />;
};

export default Blog;
