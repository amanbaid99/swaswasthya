import { supabase } from './supabase.js';

const BUCKET = 'blog-images';

export const uploadBlogImage = async (blob) => {
  if (!supabase) return { error: 'Supabase is not configured.' };
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: 'image/jpeg', upsert: false });

  if (uploadError) {
    const hint = /bucket not found/i.test(uploadError.message)
      ? ` Create a public storage bucket named "${BUCKET}" in your Supabase dashboard, then try again.`
      : '';
    return { error: uploadError.message + hint };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
};
