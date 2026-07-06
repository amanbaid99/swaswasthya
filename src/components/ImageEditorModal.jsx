import React from 'react';
import Cropper from 'react-easy-crop';
import { loadImageFromFile, cropAndResize, makeBlurPlaceholder } from '../lib/imageProcessing.js';
import { uploadBlogImage } from '../lib/storage.js';

const ASPECTS = [
  { label: 'Original', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];

const WIDTHS = [
  { label: 'Small', value: 480 },
  { label: 'Medium', value: 900 },
  { label: 'Large', value: 1600 },
];

const ALIGNS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Full width', value: 'full' },
];

const btn = { padding: '8px 16px', borderRadius: 8, border: '1px solid #d4c9b5', background: '#fff', cursor: 'pointer', fontSize: 13 };
const btnActive = { ...btn, background: '#1a2e1a', color: '#fff', borderColor: '#1a2e1a' };

/**
 * mode: 'content' (post body — offers size + alignment) | 'cover' (post cover image — fixed 16:9, full width)
 * onInsert({ url, blurDataUrl, width, align }) is called once upload finishes.
 */
export default function ImageEditorModal({ mode = 'content', onInsert, onClose }) {
  const [file, setFile] = React.useState(null);
  const [imgEl, setImgEl] = React.useState(null);
  const [objectUrl, setObjectUrl] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [aspect, setAspect] = React.useState(mode === 'cover' ? 16 / 9 : null);
  const [croppedPixels, setCroppedPixels] = React.useState(null);
  const [targetWidth, setTargetWidth] = React.useState(mode === 'cover' ? 1600 : 900);
  const [align, setAlign] = React.useState('center');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState('');

  const onFileChange = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setError('');
    const { img, url } = await loadImageFromFile(f);
    setFile(f);
    setImgEl(img);
    setObjectUrl(url);
  };

  React.useEffect(() => () => { if (objectUrl) URL.revokeObjectURL(objectUrl); }, [objectUrl]);

  const onCropComplete = React.useCallback((_area, areaPixels) => {
    setCroppedPixels(areaPixels);
  }, []);

  const submit = async () => {
    if (!imgEl || !croppedPixels) return;
    setBusy(true);
    setError('');
    try {
      const { blob } = await cropAndResize(imgEl, croppedPixels, targetWidth);
      const blurDataUrl = await makeBlurPlaceholder(imgEl, croppedPixels);
      const { url, error: uploadErr } = await uploadBlogImage(blob);
      if (uploadErr) { setError(uploadErr); setBusy(false); return; }
      onInsert({ url, blurDataUrl, width: targetWidth, align });
    } catch (err) {
      setError(err.message || 'Something went wrong processing the image.');
      setBusy(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,20,15,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 14, width: '100%', maxWidth: 640, maxHeight: '90vh', overflow: 'auto', padding: 28, fontFamily: 'system-ui, sans-serif', color: '#1a2e1a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20 }}>
            {mode === 'cover' ? 'Cover image' : 'Insert image'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#7a8a7a', lineHeight: 1 }}>×</button>
        </div>

        {!imgEl && (
          <label style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: 200, border: '2px dashed #d4c9b5', borderRadius: 10, cursor: 'pointer', color: '#7a8a7a', gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>Click to choose an image</span>
            <span style={{ fontSize: 12 }}>JPG or PNG</span>
            <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
          </label>
        )}

        {imgEl && (
          <>
            <div style={{ position: 'relative', width: '100%', height: 320, background: '#222', borderRadius: 10, overflow: 'hidden' }}>
              <Cropper
                image={objectUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect || imgEl.width / imgEl.height}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a6e5a', marginBottom: 8 }}>Crop shape</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {ASPECTS.map((a) => (
                  <button key={a.label} type="button" style={aspect === a.value ? btnActive : btn} onClick={() => setAspect(a.value)}>{a.label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a6e5a', margin: '12px 0 8px' }}>Zoom</div>
              <input type="range" min={1} max={3} step={0.05} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a6e5a', marginBottom: 8 }}>Size</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {WIDTHS.map((w) => (
                  <button key={w.value} type="button" style={targetWidth === w.value ? btnActive : btn} onClick={() => setTargetWidth(w.value)}>{w.label}</button>
                ))}
              </div>
            </div>

            {mode === 'content' && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a6e5a', marginBottom: 8 }}>Placement</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ALIGNS.map((a) => (
                    <button key={a.value} type="button" style={align === a.value ? btnActive : btn} onClick={() => setAlign(a.value)}>{a.label}</button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {error && <p style={{ color: '#c0392b', fontSize: 13, marginTop: 16 }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid #e8e2d8' }}>
          <button type="button" style={btn} onClick={onClose}>Cancel</button>
          <button
            type="button"
            style={{ ...btnActive, opacity: !imgEl || busy ? 0.5 : 1 }}
            disabled={!imgEl || busy}
            onClick={submit}
          >
            {busy ? 'Uploading…' : mode === 'cover' ? 'Set cover image' : 'Insert image'}
          </button>
        </div>
      </div>
    </div>
  );
}
