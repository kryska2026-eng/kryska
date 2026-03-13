import { useCallback } from 'react';

const LOGO_URL = 'http://www.kryska.com.br/kryskalogo.png';

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
      reader.onerror = reject;
      reader.readAsDataURL(file);

      img.onload = () => {
        logo.src = LOGO_URL;

        logo.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas não suportado'));

          // Desenha a foto original
          ctx.drawImage(img, 0, 0);

          // Calcula tamanho da logo: 25% da largura da imagem
          const logoWidth = img.width * 0.25;
          const logoHeight = (logo.height / logo.width) * logoWidth;

          // Posição: canto inferior direito com margem de 2%
          const margin = img.width * 0.02;
          const x = img.width - logoWidth - margin;
          const y = img.height - logoHeight - margin;

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
          // Se a logo falhar, retorna a imagem original sem marca d'água
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
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
