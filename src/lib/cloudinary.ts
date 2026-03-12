// ============================================
// Cloudinary Upload Helper — Kryska
// ============================================
// Fotos públicas  → pasta: kryska/photos/{user_id}/
// Documentos      → pasta: kryska/private/docs/{user_id}/  (restricted)
// Vídeos          → pasta: kryska/videos/{user_id}/
// ============================================

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'kryska';
const UPLOAD_PRESET_PHOTOS = import.meta.env.VITE_CLOUDINARY_PRESET_PHOTOS || 'kryska_photos';
const UPLOAD_PRESET_DOCS = import.meta.env.VITE_CLOUDINARY_PRESET_DOCS || 'kryska_docs';
const UPLOAD_PRESET_VIDEOS = import.meta.env.VITE_CLOUDINARY_PRESET_VIDEOS || 'kryska_videos';

export type UploadType = 'photo' | 'document' | 'video';

export interface CloudinaryResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
  resource_type: string;
  created_at: string;
  folder: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
}

/**
 * Faz upload de um arquivo para o Cloudinary
 * @param file - Arquivo a ser enviado
 * @param type - Tipo: 'photo', 'document' ou 'video'
 * @param userId - ID da anunciante (para organizar em pastas)
 * @param onProgress - Callback de progresso (0-100)
 */
export async function uploadToCloudinary(
  file: File,
  type: UploadType,
  userId: string = 'new',
  onProgress?: (progress: UploadProgress) => void
): Promise<CloudinaryResult> {
  const preset =
    type === 'document'
      ? UPLOAD_PRESET_DOCS
      : type === 'video'
      ? UPLOAD_PRESET_VIDEOS
      : UPLOAD_PRESET_PHOTOS;

  const folder =
    type === 'document'
      ? `kryska/private/docs/${userId}`
      : type === 'video'
      ? `kryska/videos/${userId}`
      : `kryska/photos/${userId}`;

  const resourceType = type === 'video' ? 'video' : 'image';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);
  formData.append('folder', folder);

  // Tags para facilitar organização no painel Cloudinary
  if (type === 'document') {
    formData.append('tags', 'verification,private,document');
  } else if (type === 'photo') {
    formData.append('tags', 'profile,photo');
  } else {
    formData.append('tags', 'profile,video');
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Progresso do upload
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress({
            loaded: e.loaded,
            total: e.total,
            percent: Math.round((e.loaded / e.total) * 100),
          });
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const result = JSON.parse(xhr.responseText) as CloudinaryResult;
          resolve(result);
        } catch {
          reject(new Error('Erro ao processar resposta do servidor'));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error?.error?.message || 'Erro no upload'));
        } catch {
          reject(new Error(`Erro HTTP ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Erro de conexão')));
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelado')));

    xhr.open('POST', uploadUrl);
    xhr.send(formData);
  });
}

/**
 * Gera a URL otimizada de uma imagem Cloudinary
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    crop?: string;
    watermark?: boolean;
  } = {}
): string {
  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    crop = 'fill',
    watermark = true,
  } = options;

  const transforms: string[] = [];

  if (width || height) {
    const dims = [
      crop && `c_${crop}`,
      width && `w_${width}`,
      height && `h_${height}`,
    ]
      .filter(Boolean)
      .join(',');
    transforms.push(dims);
  }

  transforms.push(`q_${quality},f_${format}`);

  // Marca d'água da logo
  if (watermark) {
    transforms.push(
      'l_kryska:assets:kryskalogo,w_0.25,g_south_east,x_10,y_10,o_40'
    );
  }

  const transformStr = transforms.join('/');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`;
}

/**
 * Exclui uma imagem do Cloudinary (requer backend com API secret)
 * Apenas registra a intenção — exclusão real deve ser feita pelo backend
 */
export function getDeletePayload(publicId: string) {
  return { public_id: publicId, invalidate: true };
}
