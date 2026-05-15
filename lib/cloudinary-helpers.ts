import { CldImage } from 'next-cloudinary';

/**
 * Formats a given URL into a Cloudinary optimized URL if it's already a Cloudinary URL.
 * Otherwise returns the original URL.
 * In a real app with next-cloudinary, you usually use the component, but sometimes you need a raw string.
 */
export function getCloudinaryOptimizedUrl(url: string, width = 800, quality = 'auto'): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  
  // Transform the URL to add transformations
  // Example original: https://res.cloudinary.com/demo/image/upload/v12345/fibercity/img.jpg
  // Example target: https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/v12345/fibercity/img.jpg
  
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;
  
  const prefix = url.substring(0, uploadIndex + 8);
  const suffix = url.substring(uploadIndex + 8);
  
  return `${prefix}f_auto,q_${quality},w_${width}/${suffix}`;
}
