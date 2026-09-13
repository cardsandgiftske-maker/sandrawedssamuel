import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Camera, 
  Upload, 
  QrCode, 
  Heart, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Sparkles,
  User,
  MessageSquareQuote,
  Images,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { INITIAL_GALLERY } from '../data';
import { GalleryPhoto } from '../types';
import { saveGalleryPhoto, likeGalleryPhoto, subscribeToGalleryPhotos } from '../lib/firebase';
import { uploadToCloudinary } from '../lib/cloudinary';

interface SelectedFileItem {
  id: string;
  file: File;
  previewUrl: string;
}

export default function GuestPhotoUpload() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  
  // Multi-upload state
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileItem[]>([]);
  const [uploaderName, setUploaderName] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Live Camera Viewfinder State
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // Lightbox State
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<GalleryPhoto | null>(null);
  
  // Carousel Ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Dynamic QR Code target URL that works in live deployment, preview, and mobile browsers
  const [uploadTargetUrl, setUploadTargetUrl] = useState('https://sandraandsamuel.wedding/?action=select-photos#upload-photos');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const [isFromQrCode, setIsFromQrCode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cleanOrigin = window.location.origin;
      const cleanPath = window.location.pathname;
      const target = `${cleanOrigin}${cleanPath}?action=select-photos#upload-photos`;
      setUploadTargetUrl(target);

      // Check if user came directly via QR code or upload link
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (search.includes('select-photos') || search.includes('upload') || hash.includes('upload') || hash.includes('select')) {
        setIsFromQrCode(true);

        // Scroll directly to upload section
        setTimeout(() => {
          if (dropzoneRef.current) {
            dropzoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          // Attempt automatic trigger of file picker
          try {
            fileInputRef.current?.click();
          } catch {
            // Mobile browser security may require explicit tap
          }
        }, 500);
      }

      // Clean up any legacy sample photos from previous sessions
      try {
        const saved = localStorage.getItem('sandra_samuel_guest_photos');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.some((p: GalleryPhoto) => p.id && p.id.startsWith('photo-'))) {
            const filtered = parsed.filter((p: GalleryPhoto) => !p.id.startsWith('photo-'));
            localStorage.setItem('sandra_samuel_guest_photos', JSON.stringify(filtered));
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(uploadTargetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Live Camera Control Methods
  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCameraStream = async (targetFacingMode: 'environment' | 'user') => {
    setIsCameraLoading(true);
    setCameraError(null);
    stopCameraStream();

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Live camera streaming is not supported by this browser. Please use the device camera button below.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: targetFacingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraLoading(false);
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setIsCameraLoading(false);
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setCameraError('Camera access was denied. Please allow camera permissions in your browser, or tap the button below to use your device camera.');
      } else {
        setCameraError(err?.message || 'Unable to open camera stream. Please use your device camera.');
      }
    }
  };

  const handleOpenLiveCamera = () => {
    setIsCameraModalOpen(true);
    startCameraStream(facingMode);
  };

  const handleCloseLiveCamera = () => {
    stopCameraStream();
    setIsCameraModalOpen(false);
    setCameraError(null);
  };

  const handleToggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCameraStream(nextMode);
  };

  const handleCaptureLivePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    // Visual shutter flash effect
    setIsShutterFlashing(true);
    setTimeout(() => setIsShutterFlashing(false), 200);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if front selfie camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `wedding-snap-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const previewUrl = URL.createObjectURL(file);

      const newItem: SelectedFileItem = {
        id: 'file-' + Math.random().toString(36).substring(2, 9),
        file,
        previewUrl
      };

      setSelectedFiles((prev) => [...prev, newItem]);
      handleCloseLiveCamera();
    }, 'image/jpeg', 0.95);
  };

  // Ensure camera streams are stopped on component unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  // Subscribe to real-time photo stream
  useEffect(() => {
    const unsubscribe = subscribeToGalleryPhotos((updatedPhotos) => {
      setPhotos(updatedPhotos || []);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Multi-file selection handler
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    const newItems: SelectedFileItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: 'file-' + Math.random().toString(36).substring(2, 9),
        file,
        previewUrl
      });
    }

    setSelectedFiles((prev) => [...prev, ...newItems]);
    // Reset file input value to allow selecting same files if desired
    e.target.value = '';
  };

  const handleRemoveSelectedFile = (id: string) => {
    setSelectedFiles((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleBatchUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setUploadError('Please choose at least one photo to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress({ current: 0, total: selectedFiles.length });

    try {
      const guestName = uploaderName.trim() || 'Honored Guest';
      const userCaption = caption.trim() || 'Wedding Celebration Moment ✨';

      for (let i = 0; i < selectedFiles.length; i++) {
        const item = selectedFiles[i];
        setUploadProgress({ current: i + 1, total: selectedFiles.length });

        // 1. Upload each photo to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(item.file);

        // 2. Save metadata to Firestore
        const newPhoto: GalleryPhoto = {
          id: 'guest-photo-' + Date.now() + '-' + i,
          url: cloudinaryUrl,
          caption: userCaption,
          uploaderName: guestName,
          deviceInfo: 'Mobile Upload',
          likes: 1,
          uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        await saveGalleryPhoto(newPhoto);
      }

      setIsUploading(false);
      setUploadSuccess(true);

      // Clean up previews
      selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      setSelectedFiles([]);
      setCaption('');
      setUploaderName('');
      setUploadProgress(null);

      setTimeout(() => {
        setUploadSuccess(false);
        // Scroll carousel to start
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 3000);
    } catch (err: any) {
      console.error('Failed to upload photos:', err);
      setIsUploading(false);
      setUploadError(err?.message || 'Upload failed. Please try again.');
    }
  };

  // Download handler
  const handleDownloadPhoto = async (e: React.MouseEvent, url: string, filename?: string) => {
    e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || `sandra_samuel_wedding_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = filename || `sandra_samuel_wedding_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLike = async (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    await likeGalleryPhoto(photoId);
  };

  // Carousel Scroll Controls
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 md:py-24 bg-[#FFF5F7] text-stone-900 overflow-hidden" id="upload-photos">
      {/* Soft Background Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#E892A2]/15 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#E892A2]/40 text-[#722F37] text-xs font-semibold tracking-widest uppercase mb-3 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#722F37]" />
            <span>Guest Photos</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mb-3 tracking-tight">
            Share Your Wedding Snaps
          </h2>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#722F37]/50 to-transparent mx-auto mb-3" />
          
          <p className="text-stone-700 text-sm md:text-base max-w-xl mx-auto italic font-serif">
            Scan the QR code with your phone camera or upload snaps directly from your device.
          </p>
        </div>

        {/* 1. SCAN QR CODE CARD */}
        <div className="bg-white border border-[#E892A2]/30 rounded-3xl p-6 sm:p-8 shadow-lg max-w-md mx-auto text-center mb-8 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F3] text-[#722F37] text-xs font-bold font-sans uppercase tracking-wider mb-4 border border-[#E892A2]/30">
            <QrCode className="w-4 h-4 text-[#722F37]" />
            <span>Scan to Open on Mobile</span>
          </div>

          <div className="w-56 h-56 bg-white border border-stone-200 p-3 rounded-2xl shadow-sm mx-auto flex items-center justify-center">
            <QRCodeSVG
              value={uploadTargetUrl}
              size={200}
              level="M"
              bgColor="#FFFFFF"
              fgColor="#722F37"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-xs font-serif text-stone-600 mt-3">
            Point your smartphone camera at the QR code to open this upload portal directly on your phone.
          </p>

          <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0F3] hover:bg-[#FFE4E8] text-[#722F37] text-xs font-sans font-semibold rounded-lg transition-colors cursor-pointer active:scale-95"
              title="Copy link to clipboard"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Upload Link'}</span>
            </button>

            <a
              href={uploadTargetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-sans font-medium rounded-lg transition-colors"
            >
              <span>Test Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 2. DIRECT UPLOAD SECTION (Beneath QR Code) */}
        <div className="bg-white border border-[#E892A2]/30 rounded-3xl p-6 sm:p-8 shadow-lg mb-14">
          <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF0F3] border border-[#E892A2]/40 flex items-center justify-center text-[#722F37]">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Direct Photo Upload</h3>
                <p className="text-xs text-stone-500 font-sans">Select one or several photos at once</p>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <span className="px-3 py-1 bg-[#FFF0F3] text-[#722F37] border border-[#E892A2]/40 rounded-full text-xs font-sans font-bold">
                {selectedFiles.length} {selectedFiles.length === 1 ? 'photo' : 'photos'} chosen
              </span>
            )}
          </div>

          <form onSubmit={handleBatchUpload} className="space-y-5">
            {/* QR Prompt Banner if direct opened */}
            {isFromQrCode && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F3] to-[#FCE4EC] border border-[#E892A2] text-[#5A1827] flex items-center justify-between gap-3 animate-pulse">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">
                    Welcome! Ready to upload your wedding snaps. Choose from gallery or take a live photo:
                  </span>
                </div>
              </div>
            )}

            {/* Direct Action Quick Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-4 rounded-xl bg-[#5A1827] hover:bg-[#430F1B] text-white font-sans font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <Images className="w-4 h-4 text-[#D4AF37]" />
                <span>Choose Photos from Gallery</span>
              </button>

              <button
                type="button"
                onClick={handleOpenLiveCamera}
                className="py-3 px-4 rounded-xl bg-white hover:bg-pink-50 border-2 border-[#5A1827] text-[#5A1827] font-sans font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-98"
              >
                <Camera className="w-4 h-4 text-[#5A1827]" />
                <span>Snap Live Photo with Camera</span>
              </button>
            </div>

            {/* Multi-File Dropzone */}
            <div 
              ref={dropzoneRef}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#E892A2] hover:border-[#722F37] bg-[#FCFAF7] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-pink-50/50 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFF0F3] text-[#722F37] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Images className="w-6 h-6" />
              </div>
              <p className="font-serif text-base font-bold text-stone-900">
                Click to Select Photos or Drop Here
              </p>
              <p className="text-xs text-stone-500 font-sans mt-1">
                You can select multiple photos at once (JPG, PNG, HEIC)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesSelect}
                className="hidden"
                disabled={isUploading}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFilesSelect}
                className="hidden"
                disabled={isUploading}
              />
            </div>

            {/* Selected Photos Thumbnails Strip */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans text-stone-600">
                  <span className="font-semibold">Selected Snaps ({selectedFiles.length})</span>
                  <button
                    type="button"
                    onClick={() => {
                      selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
                      setSelectedFiles([]);
                    }}
                    className="text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                  {selectedFiles.map((item, idx) => (
                    <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group bg-stone-200 border border-stone-300">
                      <img
                        src={item.previewUrl}
                        alt={`Selected snap ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSelectedFile(item.id)}
                        className="absolute top-1 right-1 p-1 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full transition-all cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Name and Caption Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-sans font-bold text-stone-700 tracking-wider flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grace &amp; Brian"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  disabled={isUploading}
                  className="w-full bg-stone-50/70 border border-stone-200 focus:border-[#722F37] rounded-xl px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-sans font-bold text-stone-700 tracking-wider flex items-center gap-1">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-stone-400" />
                  <span>Photo Note / Wish</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Beautiful couple! ❤️"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  disabled={isUploading}
                  className="w-full bg-stone-50/70 border border-stone-200 focus:border-[#722F37] rounded-xl px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Errors display */}
            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-250 text-rose-700 rounded-xl text-xs">
                {uploadError}
              </div>
            )}

            {/* Success display */}
            {uploadSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All photos uploaded successfully and added to the live gallery below!</span>
              </div>
            )}

            {/* Submit Upload Button */}
            <button
              type="submit"
              disabled={selectedFiles.length === 0 || isUploading}
              className="w-full py-3.5 bg-[#722F37] hover:bg-[#5C242C] disabled:opacity-40 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>
                    Uploading {uploadProgress ? `${uploadProgress.current} of ${uploadProgress.total}` : '...'}
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>
                    {selectedFiles.length > 0 
                      ? `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? 'Photo' : 'Photos'}`
                      : 'Upload Photos'}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* 3. LIVE PHOTO CAROUSEL / CLEAN EMPTY STATE (Beneath Direct Upload with Download Option) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#722F37]" />
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                Live Uploaded Photos ({photos.length})
              </h3>
            </div>

            {/* Carousel Navigation Arrows */}
            {photos.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-9 h-9 rounded-full bg-white border border-[#E892A2]/40 hover:bg-[#FFF0F3] text-[#722F37] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-9 h-9 rounded-full bg-white border border-[#E892A2]/40 hover:bg-[#FFF0F3] text-[#722F37] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {photos.length > 0 ? (
            /* Carousel Track */
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#E892A2]/40 scrollbar-track-transparent select-none"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white border border-[#E892A2]/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col snap-start shrink-0 group"
                >
                  {/* Photo Image */}
                  <div
                    className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => setActiveLightboxPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay Action Buttons */}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleDownloadPhoto(e, photo.url, `wedding_${photo.id}.jpg`)}
                        className="p-2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full shadow-md transition-all cursor-pointer"
                        title="Download Photo"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <p className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                        {photo.caption}
                      </p>
                      <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                        By <span className="font-semibold text-[#722F37]">{photo.uploaderName}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => handleDownloadPhoto(e, photo.url, `wedding_${photo.id}.jpg`)}
                        className="text-[#722F37] hover:text-[#5C242C] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={(e) => handleLike(e, photo.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF0F3] hover:bg-[#FFE4E8] text-[#722F37] font-semibold text-xs transition-colors cursor-pointer active:scale-90"
                      >
                        <Heart className="w-3.5 h-3.5 fill-[#722F37] text-[#722F37]" />
                        <span>{photo.likes || 1}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 border border-[#E892A2]/30 rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] text-[#722F37] flex items-center justify-center mb-3 border border-[#E892A2]/40">
                <Camera className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                No Guest Photos Uploaded Yet
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 font-sans max-w-md leading-relaxed">
                Be the first to share your celebration memories! Scan the QR code or select photos above to add them to Sandra &amp; Samuel's live wedding gallery.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* FULL HIGH-RES LIGHTBOX MODAL (WITH DOWNLOAD) */}
      <AnimatePresence>
        {activeLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div 
              className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-stone-950/80 hover:bg-stone-950 text-white rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative flex-1 flex items-center justify-center bg-black min-h-[50vh]">
                <img
                  src={activeLightboxPhoto.url}
                  alt={activeLightboxPhoto.caption}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-t border-stone-800">
                <div>
                  <h4 className="font-serif text-base font-bold text-pink-100">
                    {activeLightboxPhoto.caption}
                  </h4>
                  <p className="text-xs text-stone-400 font-sans">
                    Uploaded by <span className="text-white font-semibold">{activeLightboxPhoto.uploaderName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleDownloadPhoto(e, activeLightboxPhoto.url, `wedding_${activeLightboxPhoto.id}.jpg`)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs cursor-pointer shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={(e) => handleLike(e, activeLightboxPhoto.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#722F37] text-white font-semibold text-xs cursor-pointer hover:bg-[#8F3B43] transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                    <span>{activeLightboxPhoto.likes || 1}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIVE CAMERA VIEWFINDER MODAL */}
      <AnimatePresence>
        {isCameraModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          >
            <div 
              className="relative w-full max-w-lg bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="p-4 bg-stone-900/90 text-white flex items-center justify-between border-b border-stone-800 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-sans font-bold text-white">Live Camera</h3>
                    <p className="text-[11px] text-stone-400 font-serif italic">Snap a wedding memory for Sandra &amp; Sam</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Flip camera button */}
                  <button
                    type="button"
                    onClick={handleToggleFacingMode}
                    disabled={isCameraLoading || !!cameraError}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                    title="Flip camera (Front / Back)"
                  >
                    <RefreshCw className={`w-4 h-4 ${isCameraLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline font-sans text-xs">
                      {facingMode === 'environment' ? 'Selfie' : 'Back'}
                    </span>
                  </button>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={handleCloseLiveCamera}
                    className="p-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl transition-colors cursor-pointer"
                    title="Close camera"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Viewfinder Screen */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-black overflow-hidden flex items-center justify-center">
                {/* Live video */}
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    facingMode === 'user' ? '-scale-x-100' : ''
                  }`}
                />

                {/* Shutter flash animation overlay */}
                {isShutterFlashing && (
                  <div className="absolute inset-0 bg-white pointer-events-none z-30 transition-opacity" />
                )}

                {/* Grid Overlay for framing */}
                <div className="absolute inset-0 pointer-events-none border border-white/15 grid grid-cols-3 grid-rows-3 z-10">
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div />
                </div>

                {/* Loading state */}
                {isCameraLoading && (
                  <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20 gap-3">
                    <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                    <p className="text-xs font-sans text-stone-300">Starting device camera...</p>
                  </div>
                )}

                {/* Error state with fallback option */}
                {cameraError && (
                  <div className="absolute inset-0 bg-stone-950/95 p-6 flex flex-col items-center justify-center text-center text-white z-20">
                    <AlertCircle className="w-10 h-10 text-amber-400 mb-2" />
                    <h4 className="font-serif text-base font-bold text-stone-100 mb-1">Camera Notice</h4>
                    <p className="text-xs text-stone-300 font-sans max-w-xs mb-5 leading-relaxed">
                      {cameraError}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseLiveCamera();
                          cameraInputRef.current?.click();
                        }}
                        className="w-full py-2.5 px-4 bg-[#722F37] hover:bg-[#8F3B43] text-white font-sans text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Use Device Camera App</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => startCameraStream(facingMode)}
                        className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-sans text-xs font-medium rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Viewfinder Controls Bar */}
              <div className="p-4 sm:p-5 bg-stone-950 flex items-center justify-between border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleToggleFacingMode}
                  disabled={isCameraLoading || !!cameraError}
                  className="w-12 h-12 rounded-full bg-stone-900 border border-stone-700 text-stone-200 flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer disabled:opacity-40"
                  title="Switch Camera (Front/Back)"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                {/* Big Shutter Button */}
                <button
                  type="button"
                  onClick={handleCaptureLivePhoto}
                  disabled={isCameraLoading || !!cameraError}
                  className="group relative w-18 h-18 rounded-full border-4 border-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 disabled:opacity-40 shadow-lg"
                  title="Snap Photo"
                >
                  <div className="w-14 h-14 rounded-full bg-[#E892A2] group-hover:bg-[#d87c8f] transition-colors flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleCloseLiveCamera();
                    cameraInputRef.current?.click();
                  }}
                  className="w-12 h-12 rounded-full bg-stone-900 border border-stone-700 text-stone-200 flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Use native device camera / photo picker"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
