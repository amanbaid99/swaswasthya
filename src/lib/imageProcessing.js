// Client-side image helpers: crop to a pixel area, resize, and generate a tiny
// blurred placeholder used for blur-up (low-res-first) loading.

export const loadImageFromFile = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => resolve({ img, url });
  img.onerror = reject;
  img.src = url;
});

const drawCrop = (img, cropPixels, outWidth) => {
  const scale = outWidth / cropPixels.width;
  const outHeight = Math.round(cropPixels.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = outWidth;
  canvas.height = outHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    img,
    cropPixels.x, cropPixels.y, cropPixels.width, cropPixels.height,
    0, 0, outWidth, outHeight
  );
  return canvas;
};

const canvasToBlob = (canvas, quality) => new Promise((resolve) => {
  canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
});

// Full-resolution export, resized down to targetWidth (never upscaled).
export const cropAndResize = async (img, cropPixels, targetWidth) => {
  const outWidth = Math.min(targetWidth, Math.round(cropPixels.width));
  const canvas = drawCrop(img, cropPixels, outWidth);
  const blob = await canvasToBlob(canvas, 0.85);
  return { blob, width: canvas.width, height: canvas.height };
};

// Tiny (24px-wide) heavily-compressed placeholder, returned as a base64 data URI
// small enough to inline directly (no network round-trip needed to show it).
export const makeBlurPlaceholder = async (img, cropPixels) => {
  const canvas = drawCrop(img, cropPixels, 24);
  return canvas.toDataURL('image/jpeg', 0.4);
};
