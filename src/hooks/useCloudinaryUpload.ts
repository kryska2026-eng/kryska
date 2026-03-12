import { useState, useCallback } from 'react';
import { uploadToCloudinary, CloudinaryResult, UploadType, UploadProgress } from '../lib/cloudinary';

export interface UploadItem {
  id: string;
  file: File;
  preview: string;
  watermarked?: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  cloudinaryResult?: CloudinaryResult;
  error?: string;
}

export interface DocUploadItem {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  cloudinaryResult?: CloudinaryResult;
  error?: string;
}

export function useCloudinaryUpload(userId: string = 'new') {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPhoto = useCallback(
    async (
      item: UploadItem,
      watermarkedDataUrl: string,
      onUpdate: (updated: Partial<UploadItem>) => void
    ): Promise<CloudinaryResult | null> => {
      onUpdate({ status: 'uploading', progress: 0 });

      try {
        // Converte o dataUrl da marca d'água de volta para File
        const blob = await (await fetch(watermarkedDataUrl)).blob();
        const watermarkedFile = new File([blob], item.file.name, { type: 'image/jpeg' });

        const result = await uploadToCloudinary(
          watermarkedFile,
          'photo',
          userId,
          (p: UploadProgress) => onUpdate({ progress: p.percent })
        );

        onUpdate({ status: 'done', progress: 100, cloudinaryResult: result });
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro no upload';
        onUpdate({ status: 'error', error: msg });
        return null;
      }
    },
    [userId]
  );

  const uploadDocument = useCallback(
    async (
      file: File,
      type: UploadType,
      onProgress: (p: number) => void
    ): Promise<CloudinaryResult | null> => {
      setUploading(true);
      setError(null);
      try {
        const result = await uploadToCloudinary(file, type, userId, (p) =>
          onProgress(p.percent)
        );
        setUploading(false);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro no upload';
        setError(msg);
        setUploading(false);
        return null;
      }
    },
    [userId]
  );

  const uploadVideo = useCallback(
    async (
      file: File,
      onProgress: (p: number) => void
    ): Promise<CloudinaryResult | null> => {
      setUploading(true);
      setError(null);
      try {
        const result = await uploadToCloudinary(file, 'video', userId, (p) =>
          onProgress(p.percent)
        );
        setUploading(false);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro no upload';
        setError(msg);
        setUploading(false);
        return null;
      }
    },
    [userId]
  );

  return { uploadPhoto, uploadDocument, uploadVideo, uploading, error };
}
