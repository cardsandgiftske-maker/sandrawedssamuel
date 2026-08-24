/**
 * Cloudinary Image Upload Service
 *
 * Uploads guest photos to Cloudinary using an unsigned upload preset.
 * Stores the secure HTTPS URL on Cloudinary CDN for ultra-fast, high-resolution delivery.
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

// Get configured Cloudinary Cloud Name & Upload Preset
export function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } {
  let cloudName = '';
  let uploadPreset = '';

  // 1. Check Vite client-side environment variables
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      cloudName = (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME || '';
      uploadPreset = (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
    }
  } catch {
    // Ignore
  }

  // 2. Check Node process.env if applicable
  if (!cloudName && typeof process !== 'undefined' && process.env) {
    cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '';
    uploadPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET || '';
  }

  // 3. Check localStorage override if customized in browser
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedName = localStorage.getItem('wedding_cloudinary_cloud_name');
    const savedPreset = localStorage.getItem('wedding_cloudinary_upload_preset');
    if (savedName) cloudName = savedName;
    if (savedPreset) uploadPreset = savedPreset;
  }

  // Default fallback preset & cloud name if not set
  return {
    cloudName: cloudName.trim() || 'dphc0jlnr',
    uploadPreset: uploadPreset.trim() || 'wedding_photos'
  };
}

export const isCloudinaryConfigured = (): boolean => {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  return Boolean(cloudName && uploadPreset);
};

/**
 * Compresses an image file client-side to ensure fast uploads even on mobile connections
 */
async function compressImageIfNeeded(fileOrBlob: File | Blob, maxDimension = 1920, quality = 0.85): Promise<Blob | File> {
  // If not an image or SVG/GIF, return as is
  if (typeof window === 'undefined') return fileOrBlob;
  if (fileOrBlob.type && (!fileOrBlob.type.startsWith('image/') || fileOrBlob.type.includes('svg') || fileOrBlob.type.includes('gif'))) {
    return fileOrBlob;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileOrBlob);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Only downscale if larger than maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(fileOrBlob);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < fileOrBlob.size) {
            resolve(blob);
          } else {
            resolve(fileOrBlob);
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(fileOrBlob);
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads a photo to Cloudinary
 * Falls back to high-quality compressed data URL if network/preset issue occurs
 */
export async function uploadToCloudinary(
  fileOrDataUrl: File | Blob | string,
  customCloudName?: string,
  customPreset?: string
): Promise<string> {
  const { cloudName: defaultCloudName, uploadPreset: defaultPreset } = getCloudinaryConfig();
  const cloudName = customCloudName || defaultCloudName;
  const uploadPreset = customPreset || defaultPreset;

  try {
    const formData = new FormData();

    if (typeof fileOrDataUrl === 'string') {
      // Base64 string or remote URL
      formData.append('file', fileOrDataUrl);
    } else {
      // File or Blob
      const processedBlob = await compressImageIfNeeded(fileOrDataUrl);
      const filename = (fileOrDataUrl as File).name || 'wedding_photo.jpg';
      formData.append('file', processedBlob, filename);
    }

    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'sandra_samuel_wedding');

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data: CloudinaryUploadResponse = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    }

    // If Cloudinary returned an error, log it
    const errorJson = await response.json().catch(() => null);
    console.warn('Cloudinary upload endpoint response:', errorJson);
    
    if (typeof fileOrDataUrl === 'string') {
      return fileOrDataUrl;
    }
    return await convertFileToDataUrl(fileOrDataUrl as File);
  } catch (error) {
    console.warn('Cloudinary direct upload attempt encountered error, fallback to optimized store:', error);
    if (typeof fileOrDataUrl === 'string') {
      return fileOrDataUrl;
    }
    return await convertFileToDataUrl(fileOrDataUrl as File);
  }
}

/**
 * Helper to convert file or blob to compressed base64 data URL
 */
function convertFileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    compressImageIfNeeded(file, 1600, 0.8)
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
  });
}
