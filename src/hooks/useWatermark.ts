import { useCallback } from 'react';

// HTTPS para evitar bloqueio em site em HTTPS (mixed content)
const LOGO_URL = 'https://www.kryska.com.br/kryskalogo.png';

const MAX_DIMENSION = 2048; // Evita estouro de memória/canvas no celular

export function useWatermark() {
  const applyWatermark = useCallback((file: File): Promise<{ dataUrl: string; blob: Blob }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const logo = new Image();
      logo.crossOrigin = 'anonymous';
      img.crossOrigin = 'anonymous';

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Não foi possível ler a imagem. Use JPG ou PNG.'));
      reader.readAsDataURL(file);

      img.onload = () => {
        // Reduz tamanho no canvas para não estourar limite no celular
        let w = img.width;
        let h = img.height;
        if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
          if (w >= h) {
            h = Math.round((h * MAX_DIMENSION) / w);
            w = MAX_DIMENSION;
          } else {
            w = Math.round((w * MAX_DIMENSION) / h);
            h = MAX_DIMENSION;
          }
        }

        logo.src = LOGO_URL;

        logo.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas não suportado'));

          // Desenha a foto original (redimensionada)
          ctx.drawImage(img, 0, 0, w, h);

          // Calcula tamanho da logo: 25% da largura da imagem
          const logoWidth = w * 0.25;
          const logoHeight = (logo.height / logo.width) * logoWidth;

          // Posição: canto inferior direito com margem de 2%
          const margin = w * 0.02;
          const x = w - logoWidth - margin;
          const y = h - logoHeight - margin;

          // Aplica opacidade 40%
          ctx.globalAlpha = 0.4;

          // Sombra suave para destacar a logo
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 8;

          ctx.drawImage(logo, x, y, logoWidth, logoHeight);

          // Reset
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

          canvas.toBlob((blob) => {
            if (blob) resolve({ dataUrl, blob });
            else reject(new Error('Falha ao gerar blob'));
          }, 'image/jpeg', 0.92);
        };

        logo.onerror = () => {
          // Se a logo falhar, retorna a imagem original (redimensionada) sem marca d'água
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          canvas.toBlob((blob) => {
            if (blob) resolve({ dataUrl, blob });
            else reject(new Error('Falha ao gerar blob'));
          }, 'image/jpeg', 0.92);
        };
      };

      img.onerror = reject;
    });
  }, []);

  return { applyWatermark };
}
