import emailjs from '@emailjs/browser';

const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

let ready = false;

function init() {
  if (PUBLIC_KEY && !ready) {
    emailjs.init({ publicKey: PUBLIC_KEY });
    ready = true;
  }
}

/**
 * Send an enquiry email to amanbaid99@gmail.com.
 * Returns { ok: true } on success, { ok: false, error } on failure.
 * Silently no-ops if EmailJS env vars are not set (dev / preview builds).
 */
export async function sendEnquiry(params) {
  init();
  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) return { ok: false, error: 'not_configured' };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
    return { ok: true };
  } catch (err) {
    console.error('[EmailJS]', err);
    return { ok: false, error: err?.text ?? String(err) };
  }
}
