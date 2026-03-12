import { useState } from 'react';
import Tesseract from 'tesseract.js';

export type OCRStatus = 'idle' | 'processing' | 'success' | 'failed' | 'underage' | 'no_date';

export interface OCRResult {
  status: OCRStatus;
  birthDate: string | null;
  age: number | null;
  rawText: string;
  confidence: number;
  message: string;
}

function extractBirthDate(text: string): { date: string | null; age: number | null } {
  // Normaliza o texto
  const normalized = text
    .replace(/[oO]/g, '0')
    .replace(/[lI]/g, '1')
    .replace(/\s+/g, ' ')
    .toUpperCase();

  const patterns = [
    // DD/MM/AAAA
    /\b(\d{2})[\/\-\.](\d{2})[\/\-\.](\d{4})\b/g,
    // AAAA/MM/DD
    /\b(\d{4})[\/\-\.](\d{2})[\/\-\.](\d{2})\b/g,
    // DD MM AAAA (com espaço)
    /\b(\d{2})\s(\d{2})\s(\d{4})\b/g,
    // NASCIMENTO: ou DATA NASC
    /(?:NASC(?:IMENTO)?|DATA\s*NASC)[^\d]*(\d{2})[\/\-\.\s](\d{2})[\/\-\.\s](\d{4})/g,
  ];

  const candidates: Date[] = [];

  for (const pattern of patterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(normalized)) !== null) {
      let day: number, month: number, year: number;

      if (match[1].length === 4) {
        // AAAA/MM/DD
        year = parseInt(match[1]);
        month = parseInt(match[2]);
        day = parseInt(match[3]);
      } else {
        // DD/MM/AAAA
        day = parseInt(match[1]);
        month = parseInt(match[2]);
        year = parseInt(match[3]);
      }

      // Valida data razoável
      if (
        year >= 1920 && year <= new Date().getFullYear() - 10 &&
        month >= 1 && month <= 12 &&
        day >= 1 && day <= 31
      ) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          candidates.push(date);
        }
      }
    }
  }

  if (candidates.length === 0) return { date: null, age: null };

  // Pega a data mais provável (a mais antiga entre as encontradas, que é provavelmente a de nascimento)
  const birthDate = candidates.reduce((oldest, current) => current < oldest ? current : oldest);

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const dateStr = `${String(birthDate.getDate()).padStart(2, '0')}/${String(birthDate.getMonth() + 1).padStart(2, '0')}/${birthDate.getFullYear()}`;

  return { date: dateStr, age };
}

export function useDocumentOCR() {
  const [result, setResult] = useState<OCRResult | null>(null);
  const [progress, setProgress] = useState(0);

  const analyzeDocument = async (file: File): Promise<OCRResult> => {
    setResult(null);
    setProgress(0);

    try {
      const { data } = await Tesseract.recognize(file, 'por+eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round((m.progress || 0) * 100));
          }
        },
      });

      const rawText = data.text || '';
      const confidence = data.confidence || 0;
      const { date, age } = extractBirthDate(rawText);

      let status: OCRStatus;
      let message: string;

      if (!date || age === null) {
        status = 'no_date';
        message = 'Não conseguimos identificar a data de nascimento automaticamente. O documento será analisado manualmente pela equipe.';
      } else if (age < 18) {
        status = 'underage';
        message = `Data de nascimento encontrada: ${date}. Infelizmente, apenas maiores de 18 anos podem se cadastrar.`;
      } else {
        status = 'success';
        message = `✓ Documento válido! Data de nascimento: ${date} — ${age} anos confirmados.`;
      }

      const ocr: OCRResult = { status, birthDate: date, age, rawText, confidence, message };
      setResult(ocr);
      return ocr;

    } catch (err) {
      const failed: OCRResult = {
        status: 'failed',
        birthDate: null,
        age: null,
        rawText: '',
        confidence: 0,
        message: 'Erro ao processar o documento. Tente uma foto mais nítida ou envie em boa resolução.',
      };
      setResult(failed);
      return failed;
    }
  };

  const reset = () => {
    setResult(null);
    setProgress(0);
  };

  return { analyzeDocument, result, progress, reset };
}
