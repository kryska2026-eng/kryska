/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_PRESET_PHOTOS: string;
  readonly VITE_CLOUDINARY_PRESET_DOCS: string;
  readonly VITE_CLOUDINARY_PRESET_VIDEOS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
