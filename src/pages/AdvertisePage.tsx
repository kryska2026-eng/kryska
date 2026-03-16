import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, ChevronRight, Camera, User, MapPin, Crown,
  Mail, ShieldCheck, FileText, Lock, Video, Upload,
  AlertCircle, Cloud, ImageIcon, X
} from 'lucide-react';
import { CITIES, ETHNICITIES, BODY_TYPES, HAIR_COLORS, EYE_COLORS, SERVICES_LIST } from '../data/mockData';
import { useWatermark } from '../hooks/useWatermark';
import { useDocumentOCR } from '../hooks/useDocumentOCR';
import { uploadToCloudinary, CloudinaryResult } from '../lib/cloudinary';

const STEPS = [
  { id: 1, title: 'Dados', icon: <User className="w-4 h-4" /> },
  { id: 2, title: 'Perfil', icon: <MapPin className="w-4 h-4" /> },
  { id: 3, title: 'Fotos', icon: <Camera className="w-4 h-4" /> },
  { id: 4, title: 'Plano', icon: <Crown className="w-4 h-4" /> },
  { id: 5, title: 'Verificação', icon: <ShieldCheck className="w-4 h-4" /> },
];

interface PhotoItem {
  id: string;
  file: File;
  preview: string;
  watermarked: string;
  processing: boolean;
  uploading: boolean;
  uploadProgress: number;
  uploaded: boolean;
  cloudinaryUrl?: string;
  cloudinaryId?: string;
  error?: string;
}

interface DocItem {
  file: File;
  preview: string;
  uploading: boolean;
  uploadProgress: number;
  uploaded: boolean;
  cloudinaryUrl?: string;
  cloudinaryId?: string;
  error?: string;
}

interface VideoItem {
  file: File;
  preview: string;
  uploading: boolean;
  uploadProgress: number;
  uploaded: boolean;
  cloudinaryUrl?: string;
  cloudinaryId?: string;
  error?: string;
}

const inputClass = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all';
const labelClass = 'block text-gray-700 text-sm font-semibold mb-1.5';

// ID temporário para organizar uploads antes de criar conta
const TEMP_USER_ID = `new_${Date.now()}`;

export default function AdvertisePage() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [selfie, setSelfie] = useState<DocItem | null>(null);
  const [docPhoto, setDocPhoto] = useState<DocItem | null>(null);
  const [videoItem, setVideoItem] = useState<VideoItem | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const { applyWatermark } = useWatermark();
  const { analyzeDocument, result: ocrResult, progress: ocrProgress, reset: ocrReset } = useDocumentOCR();
  const [ocrProcessing, setOcrProcessing] = useState(false);

  const canSubmit =
    !!selfie && !!docPhoto &&
    !ocrProcessing &&
    ocrResult?.status !== 'underage' &&
    !submitting;

  const toggleService = (s: string) => {
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  // ── Fotos ──
  const processPhotos = async (files: FileList | File[]) => {
    const arr = Array.from(files).slice(0, 8 - photos.length);
    const newItems: PhotoItem[] = arr.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
      watermarked: '',
      processing: true,
      uploading: false,
      uploadProgress: 0,
      uploaded: false,
    }));
    setPhotos((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      // 1. Aplica marca d'água
      let watermarkedUrl = item.preview;
      try {
        const { dataUrl } = await applyWatermark(item.file);
        watermarkedUrl = dataUrl;
      } catch { /* usa preview original */ }

      setPhotos((prev) => prev.map((p) =>
        p.id === item.id ? { ...p, watermarked: watermarkedUrl, processing: false, uploading: true } : p
      ));

      // 2. Upload para Cloudinary
      try {
        const blob = await (await fetch(watermarkedUrl)).blob();
        const wFile = new File([blob], item.file.name, { type: 'image/jpeg' });

        const result: CloudinaryResult = await uploadToCloudinary(
          wFile, 'photo', TEMP_USER_ID,
          (p) => setPhotos((prev) => prev.map((ph) =>
            ph.id === item.id ? { ...ph, uploadProgress: p.percent } : ph
          ))
        );

        setPhotos((prev) => prev.map((p) =>
          p.id === item.id ? {
            ...p, uploading: false, uploaded: true,
            cloudinaryUrl: result.secure_url, cloudinaryId: result.public_id,
          } : p
        ));
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro no upload';
        setPhotos((prev) => prev.map((p) =>
          p.id === item.id ? { ...p, uploading: false, error: msg } : p
        ));
      }
    }
  };

  const handlePhotoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processPhotos(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files) processPhotos(e.dataTransfer.files);
  };

  const removePhoto = (id: string) => setPhotos((prev) => prev.filter((p) => p.id !== id));

  // ── Vídeo ──
  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const item: VideoItem = {
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      uploadProgress: 0,
      uploaded: false,
    };
    setVideoItem(item);

    try {
      const result = await uploadToCloudinary(
        file, 'video', TEMP_USER_ID,
        (p) => setVideoItem((prev) => prev ? { ...prev, uploadProgress: p.percent } : prev)
      );
      setVideoItem((prev) => prev ? {
        ...prev, uploading: false, uploaded: true,
        cloudinaryUrl: result.secure_url, cloudinaryId: result.public_id,
      } : prev);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro no upload';
      setVideoItem((prev) => prev ? { ...prev, uploading: false, error: msg } : prev);
    }
  };

  // ── Selfie ──
  const handleSelfie = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const item: DocItem = {
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      uploadProgress: 0,
      uploaded: false,
    };
    setSelfie(item);

    try {
      const result = await uploadToCloudinary(
        file, 'document', TEMP_USER_ID,
        (p) => setSelfie((prev) => prev ? { ...prev, uploadProgress: p.percent } : prev)
      );
      setSelfie((prev) => prev ? {
        ...prev, uploading: false, uploaded: true,
        cloudinaryUrl: result.secure_url, cloudinaryId: result.public_id,
      } : prev);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro no upload';
      setSelfie((prev) => prev ? { ...prev, uploading: false, error: msg } : prev);
    }
  };

  // ── Documento + OCR ──
  const handleDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const item: DocItem = {
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      uploadProgress: 0,
      uploaded: false,
    };
    setDocPhoto(item);
    ocrReset();

    // Upload para Cloudinary (pasta privada) + OCR em paralelo
    const [, ] = await Promise.all([
      // Upload
      uploadToCloudinary(file, 'document', TEMP_USER_ID, (p) =>
        setDocPhoto((prev) => prev ? { ...prev, uploadProgress: p.percent } : prev)
      ).then((result) => {
        setDocPhoto((prev) => prev ? {
          ...prev, uploading: false, uploaded: true,
          cloudinaryUrl: result.secure_url, cloudinaryId: result.public_id,
        } : prev);
      }).catch((err) => {
        const msg = err instanceof Error ? err.message : 'Erro no upload';
        setDocPhoto((prev) => prev ? { ...prev, uploading: false, error: msg } : prev);
      }),

      // OCR
      (async () => {
        setOcrProcessing(true);
        await analyzeDocument(file);
        setOcrProcessing(false);
      })(),
    ]);
  };

  // ── Submit final ──
  const handleSubmit = async () => {
    setSubmitting(true);
    // Aqui você enviaria os dados para o backend:
    // - IDs do Cloudinary das fotos, selfie, documento, vídeo
    // - Dados do formulário
    // - Plano escolhido
    await new Promise((r) => setTimeout(r, 1500)); // simula envio ao backend
    setSubmitting(false);
    setSubmitted(true);
  };

  const plans = [
    {
      id: 'basic', name: 'Básico', price: 'R$ 49', period: '/mês',
      desc: 'Tudo que você precisa para começar a aparecer.',
      features: ['Até 5 fotos', 'Perfil completo', 'Aparecer na listagem', 'Contato via email'],
      color: '#3b82f6', badge: null,
    },
    {
      id: 'featured', name: 'Destaque', price: 'R$ 99', period: '/mês',
      desc: 'Máxima visibilidade. Apareça antes de todas!',
      features: ['Até 8 fotos + vídeos', 'Badge de destaque', 'Topo da listagem', 'Prioridade na busca', 'Contato via email'],
      color: '#e11d48', badge: 'Mais popular',
    },
  ];

  // ── Tela de sucesso ──
  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: 520, width: '100%', backgroundColor: '#fff', borderRadius: 24, border: '1px solid #f1f5f9', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '2px solid #bbf7d0' }}>
            <Check size={36} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#1a0a10', marginBottom: 12 }}>Cadastro enviado! 🎉</h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>
            Sua solicitação foi recebida. Nossa equipe irá analisar seus documentos e ativar seu perfil em até <strong>24 horas</strong>. Você receberá uma confirmação por e-mail.
          </p>

          {/* Status dos uploads */}
          <div style={{ textAlign: 'left', padding: '16px 20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 10 }}>📁 Arquivos enviados ao Cloudinary:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 12, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={12} /> <span>{photos.filter(p => p.uploaded).length} foto(s) com marca d'água</span>
              </div>
              {videoItem?.uploaded && (
                <div style={{ fontSize: 12, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={12} /> <span>1 vídeo</span>
                </div>
              )}
              <div style={{ fontSize: 12, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={12} /> <span>Selfie com documento (pasta privada)</span>
              </div>
              <div style={{ fontSize: 12, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={12} /> <span>Foto do documento (pasta privada)</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 20px', backgroundColor: '#fff5f7', border: '1px solid #fecdd3', borderRadius: 14, marginBottom: 28 }}>
            <p style={{ fontSize: 13, color: '#be123c', fontWeight: 600 }}>📧 Fique de olho no seu e-mail — inclusive na caixa de spam.</p>
          </div>
          <Link to="/" style={{ display: 'block', padding: '14px', background: 'linear-gradient(135deg, #e11d48, #f43f5e)', color: '#fff', fontWeight: 800, fontSize: 15, borderRadius: 14, textDecoration: 'none', boxShadow: '0 6px 20px rgba(225,29,72,0.30)' }}>
            Voltar para a home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="advertise-hero-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/">
            <img src="http://www.kryska.com.br/kryskalogo.png" alt="Kryska" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
              Já tenho conta
            </Link>
            <a href="mailto:contato@kryska.com.br" style={{ fontSize: 13, color: '#e11d48', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Mail size={14} /> contato@kryska.com.br
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #fff5f7 0%, #fff0f3 50%, #fef2f2 100%)', borderBottom: '1px solid #fecdd3', padding: '48px 50px 40px' }}>
        <div className="advertise-hero-inner" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#fff', border: '1px solid #fecdd3', borderRadius: 50, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: '#e11d48', fontWeight: 600 }}>✨ Anuncie seu perfil</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a0a10', marginBottom: 10, lineHeight: 1.2 }}>
            Comece a receber contatos{' '}
            <span style={{ background: 'linear-gradient(90deg, #e11d48, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>hoje mesmo</span>
          </h1>
          <p style={{ fontSize: 15, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            Crie seu perfil em minutos e apareça para milhares de pessoas na sua região.
          </p>

          {/* Cloudinary badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 50, padding: '6px 16px' }}>
            <Cloud size={14} color="#3b82f6" />
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Fotos armazenadas com segurança no Cloudinary</span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="advertise-form-inner" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40, backgroundColor: '#fff', borderRadius: 16, padding: '20px 24px', border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <button
                onClick={() => step > s.id && setStep(s.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: step > s.id ? 'pointer' : 'default', background: 'none', border: 'none', padding: 0 }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
                  backgroundColor: s.id < step ? '#10b981' : s.id === step ? '#e11d48' : '#e2e8f0',
                  color: s.id < step || s.id === step ? '#fff' : '#94a3b8',
                  boxShadow: s.id === step ? '0 4px 12px rgba(225,29,72,0.25)' : 'none',
                }}>
                  {s.id < step ? <Check size={15} /> : s.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: s.id === step ? '#e11d48' : s.id < step ? '#10b981' : '#94a3b8', whiteSpace: 'nowrap' }}>
                  {s.title}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 18, backgroundColor: s.id < step ? '#10b981' : '#e2e8f0', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 1 — Dados pessoais ── */}
        {step === 1 && (
          <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: 32 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', marginBottom: 6 }}>Dados pessoais</h2>
              <p style={{ fontSize: 14, color: '#94a3b8' }}>Seus dados são protegidos e nunca compartilhados.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className={labelClass}>Nome artístico *</label>
                <input type="text" placeholder="Como quer ser chamada" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>E-mail *</label>
                <input type="email" placeholder="seu@email.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp *</label>
                <input type="tel" placeholder="(16) 99999-9999" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Senha *</label>
                <input type="password" placeholder="Mínimo 6 caracteres" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Confirmar senha *</label>
                <input type="password" placeholder="Repita a senha" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Idade *</label>
                <input type="number" min="18" max="70" placeholder="Sua idade" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Telefone (opcional)</label>
                <input type="tel" placeholder="(16) 3333-3333" className={inputClass} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', backgroundColor: '#fff5f7', border: '1px solid #fecdd3', borderRadius: 12, marginTop: 20 }}>
              <span style={{ fontSize: 16 }}>🔒</span>
              <p style={{ fontSize: 13, color: '#be123c', lineHeight: 1.5 }}>
                Ao continuar você confirma ter 18 anos ou mais e concorda com os{' '}
                <Link to="/termos" style={{ fontWeight: 700, color: '#e11d48' }}>Termos de Uso</Link>.
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              style={{ width: '100%', marginTop: 24, padding: '15px', background: 'linear-gradient(135deg, #e11d48, #f43f5e)', color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(225,29,72,0.30)' }}
            >
              Próximo passo <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 2 — Perfil & serviços ── */}
        {step === 2 && (
          <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: 32 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', marginBottom: 6 }}>Perfil & serviços</h2>
              <p style={{ fontSize: 14, color: '#94a3b8' }}>Quanto mais detalhes, mais clientes você atrai.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className={labelClass}>Cidade *</label>
                <select className={inputClass} style={{ cursor: 'pointer' }}>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Bairro *</label>
                <input type="text" placeholder="Seu bairro" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Etnia</label>
                <select className={inputClass} style={{ cursor: 'pointer' }}>
                  <option value="">Selecione</option>
                  {ETHNICITIES.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Tipo físico</label>
                <select className={inputClass} style={{ cursor: 'pointer' }}>
                  <option value="">Selecione</option>
                  {BODY_TYPES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Cabelo</label>
                <select className={inputClass} style={{ cursor: 'pointer' }}>
                  <option value="">Selecione</option>
                  {HAIR_COLORS.map((h) => <option key={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Olhos</label>
                <select className={inputClass} style={{ cursor: 'pointer' }}>
                  <option value="">Selecione</option>
                  {EYE_COLORS.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Altura</label>
                <input type="text" placeholder="Ex: 1,65m" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Valor (por hora)</label>
                <input type="text" placeholder="Ex: R$ 200" className={inputClass} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className={labelClass}>Horários de atendimento</label>
                <input type="text" placeholder="Ex: Seg–Sex das 14h às 22h" className={inputClass} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className={labelClass}>Descrição</label>
                <textarea
                  rows={4}
                  placeholder="Fale sobre você, seus diferenciais e como se apresenta..."
                  className={inputClass}
                  style={{ resize: 'none', lineHeight: 1.6 }}
                />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <label className={labelClass}>Serviços oferecidos</label>
              <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>Selecione todos que se aplicam</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SERVICES_LIST.map((s) => (
                  <button
                    key={s} type="button" onClick={() => toggleService(s)}
                    style={{
                      padding: '8px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                      backgroundColor: services.includes(s) ? '#e11d48' : '#f8fafc',
                      color: services.includes(s) ? '#fff' : '#64748b',
                      border: services.includes(s) ? '1.5px solid #e11d48' : '1.5px solid #e2e8f0',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: 14, border: '1.5px solid #e2e8f0', borderRadius: 14, cursor: 'pointer' }}>
                ← Voltar
              </button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '14px', background: 'linear-gradient(135deg, #e11d48, #f43f5e)', color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(225,29,72,0.25)' }}>
                Próximo <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3 — Fotos & Vídeos ── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Card de fotos */}
            <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: 32 }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', marginBottom: 6 }}>Fotos do perfil</h2>
                <p style={{ fontSize: 14, color: '#94a3b8' }}>Mínimo 1 foto, máximo 8. Use JPG ou PNG. No iPhone, escolha “Mais opções” e selecione uma foto em JPG se der erro.</p>
              </div>

              {/* Info marca d'água + Cloudinary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                <div style={{ padding: '12px 14px', backgroundColor: '#fff5f7', border: '1px solid #fecdd3', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <ImageIcon size={14} color="#e11d48" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: '#be123c', lineHeight: 1.5 }}>
                    <strong>Marca d'água automática</strong> — A logo kryska.com.br é adicionada em todas as fotos
                  </p>
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Cloud size={14} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: '#1d4ed8', lineHeight: 1.5 }}>
                    <strong>Upload automático</strong> — Fotos salvas no Cloudinary com segurança e CDN global
                  </p>
                </div>
              </div>

              {/* Área de drop */}
              {photos.length < 8 && (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragging ? '#e11d48' : '#fecdd3'}`,
                    borderRadius: 16, padding: '32px 24px', textAlign: 'center', cursor: 'pointer',
                    backgroundColor: dragging ? '#fff5f7' : '#fdfafa', transition: 'all 0.2s', marginBottom: 20,
                  }}
                >
                  <Upload size={28} color="#e11d48" style={{ margin: '0 auto 10px' }} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1a0a10', marginBottom: 4 }}>
                    Arraste as fotos ou clique para selecionar
                  </p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>JPG, PNG · Máximo 10MB por foto · {photos.length}/8 fotos</p>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handlePhotoInput} />
                </div>
              )}

              {/* Grid de fotos */}
              {photos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {photos.map((photo) => (
                    <div key={photo.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                      <img
                        src={photo.watermarked || photo.preview}
                        alt="foto"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      {/* Overlay de processamento */}
                      {photo.processing && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          <div style={{ width: 24, height: 24, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                          <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>Aplicando marca d'água...</span>
                        </div>
                      )}

                      {/* Overlay de upload */}
                      {photo.uploading && !photo.processing && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10 }}>
                          <Cloud size={20} color="#fff" />
                          <div style={{ width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${photo.uploadProgress}%`, backgroundColor: '#3b82f6', borderRadius: 4, transition: 'width 0.2s' }} />
                          </div>
                          <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{photo.uploadProgress}%</span>
                        </div>
                      )}

                      {/* Badge de sucesso */}
                      {photo.uploaded && (
                        <div style={{ position: 'absolute', top: 6, left: 6, backgroundColor: '#10b981', borderRadius: 50, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Check size={10} color="#fff" />
                          <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>Enviado</span>
                        </div>
                      )}

                      {/* Badge de erro + mensagem */}
                      {photo.error && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(239,68,68,0.92)', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <AlertCircle size={20} color="#fff" />
                          <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, textAlign: 'center' }}>Erro no envio</span>
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.95)', textAlign: 'center', lineHeight: 1.3 }}>{photo.error}</span>
                        </div>
                      )}

                      {/* Botão remover */}
                      {!photo.uploading && !photo.processing && (
                        <button
                          onClick={() => removePhoto(photo.id)}
                          style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <X size={12} color="#fff" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card de vídeo */}
            <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: 32 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a0a10' }}>Vídeo do perfil</h2>
                  <span style={{ fontSize: 11, padding: '2px 10px', backgroundColor: '#f3e8ff', color: '#7c3aed', borderRadius: 50, fontWeight: 700 }}>Opcional</span>
                </div>
                <p style={{ fontSize: 14, color: '#94a3b8' }}>Vídeos aumentam muito o engajamento. Máx. 1 minuto. Apenas você deve aparecer.</p>
              </div>

              {!videoItem ? (
                <label
                  style={{ display: 'block', border: '2px dashed #e9d5ff', borderRadius: 16, padding: '28px 24px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#faf5ff', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f3e8ff'; (e.currentTarget as HTMLElement).style.borderColor = '#7c3aed'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#faf5ff'; (e.currentTarget as HTMLElement).style.borderColor = '#e9d5ff'; }}
                >
                  <Video size={28} color="#7c3aed" style={{ margin: '0 auto 10px' }} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1a0a10', marginBottom: 4 }}>Clique para enviar seu vídeo</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>MP4, MOV ou WebM · Máximo 100MB · 1 minuto</p>
                  <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
                </label>
              ) : (
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <video src={videoItem.preview} controls style={{ width: '100%', maxHeight: 220, display: 'block', backgroundColor: '#000' }} />
                  <div style={{ padding: '12px 16px' }}>
                    {videoItem.uploading && (
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <Cloud size={14} color="#3b82f6" />
                          <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>Enviando para Cloudinary... {videoItem.uploadProgress}%</span>
                        </div>
                        <div style={{ height: 6, backgroundColor: '#dbeafe', borderRadius: 10, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${videoItem.uploadProgress}%`, backgroundColor: '#3b82f6', borderRadius: 10, transition: 'width 0.2s' }} />
                        </div>
                      </div>
                    )}
                    {videoItem.uploaded && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Check size={14} color="#10b981" />
                        <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Vídeo enviado com sucesso!</span>
                      </div>
                    )}
                    {videoItem.error && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AlertCircle size={14} color="#ef4444" />
                        <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>Erro: {videoItem.error}</span>
                      </div>
                    )}
                    {!videoItem.uploading && (
                      <button onClick={() => setVideoItem(null)} style={{ marginTop: 8, fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        Remover vídeo
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: 14, border: '1.5px solid #e2e8f0', borderRadius: 14, cursor: 'pointer' }}>← Voltar</button>
              <button
                onClick={() => setStep(4)}
                disabled={photos.length === 0}
                style={{ flex: 2, padding: '15px', background: photos.length > 0 ? 'linear-gradient(135deg, #e11d48, #f43f5e)' : '#e2e8f0', color: photos.length > 0 ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 14, cursor: photos.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: photos.length > 0 ? '0 6px 20px rgba(225,29,72,0.25)' : 'none' }}
              >
                Próximo <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4 — Plano ── */}
        {step === 4 && (
          <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: 32 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', marginBottom: 6 }}>Escolha seu plano</h2>
              <p style={{ fontSize: 14, color: '#94a3b8' }}>Você pode mudar de plano a qualquer momento.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 16,
                    border: `2px solid ${selectedPlan === plan.id ? plan.color : '#e2e8f0'}`,
                    backgroundColor: selectedPlan === plan.id ? (plan.id === 'featured' ? '#fff5f7' : '#f0f9ff') : '#fafafa',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', position: 'relative',
                    boxShadow: selectedPlan === plan.id ? `0 4px 20px ${plan.color}20` : 'none',
                  }}
                >
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -10, right: 20, backgroundColor: plan.color, color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 50 }}>
                      {plan.badge}
                    </div>
                  )}
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2.5px solid ${selectedPlan === plan.id ? plan.color : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {selectedPlan === plan.id && <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: plan.color }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#1a0a10' }}>{plan.name}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>{plan.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {plan.features.map((f) => (
                        <span key={f} style={{ fontSize: 11, padding: '3px 10px', backgroundColor: selectedPlan === plan.id ? `${plan.color}15` : '#f1f5f9', color: selectedPlan === plan.id ? plan.color : '#64748b', borderRadius: 50, fontWeight: 600 }}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 26, fontWeight: 900, color: plan.color, lineHeight: 1 }}>{plan.price}</p>
                    <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{plan.period}</p>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ padding: '16px 20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#15803d', marginBottom: 6 }}>🚀 Quer aparecer primeiro? Adicione pacotes de subida!</p>
              <p style={{ fontSize: 12, color: '#16a34a', lineHeight: 1.6 }}>
                Após criar seu perfil, você pode comprar pacotes de subida na área da anunciante. Cada subida leva seu perfil para o 1º lugar por 1 hora.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(3)} style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: 14, border: '1.5px solid #e2e8f0', borderRadius: 14, cursor: 'pointer' }}>← Voltar</button>
              <button onClick={() => setStep(5)} style={{ flex: 2, padding: '15px', background: 'linear-gradient(135deg, #e11d48, #f43f5e)', color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(225,29,72,0.25)' }}>
                Próximo <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5 — Verificação de identidade ── */}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, backgroundColor: '#f0fdf4', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={26} color="#16a34a" />
                </div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', marginBottom: 4 }}>Verificação de identidade</h2>
                  <p style={{ fontSize: 14, color: '#94a3b8' }}>Etapa obrigatória para ativar seu perfil.</p>
                </div>
              </div>

              {/* Aviso Cloudinary privado */}
              <div style={{ padding: '18px 20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <Lock size={18} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#15803d', marginBottom: 6 }}>Suas fotos são 100% privadas e seguras</p>
                    <ul style={{ fontSize: 13, color: '#16a34a', lineHeight: 1.9, paddingLeft: 0, listStyle: 'none' }}>
                      <li>✓ Armazenadas no Cloudinary em pasta restrita <strong>kryska/private/docs/</strong></li>
                      <li>✓ Acesso exclusivo da administração — nunca exibidas publicamente</li>
                      <li>✓ Protegidas com upload preset privado — sem URL pública</li>
                      <li>✓ Excluídas mediante solicitação após verificação</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upload 1 — Selfie */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, backgroundColor: '#e11d48', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>1</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#1a0a10' }}>Selfie segurando o documento</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>Seu rosto e o documento visíveis e legíveis na mesma foto</p>
                  </div>
                </div>

                {!selfie ? (
                  <label
                    style={{ display: 'block', border: '2px dashed #fecdd3', borderRadius: 16, padding: '28px 24px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fdfafa', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fff5f7'; (e.currentTarget as HTMLElement).style.borderColor = '#e11d48'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fdfafa'; (e.currentTarget as HTMLElement).style.borderColor = '#fecdd3'; }}
                  >
                    <Camera size={26} color="#e11d48" style={{ margin: '0 auto 10px' }} />
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1a0a10', marginBottom: 4 }}>Clique para enviar a selfie</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>JPG ou PNG · Máximo 10MB</p>
                    <input ref={selfieInputRef} type="file" accept="image/*" className="hidden" onChange={handleSelfie} />
                  </label>
                ) : (
                  <div style={{ borderRadius: 16, overflow: 'hidden', border: `2px solid ${selfie.uploaded ? '#bbf7d0' : selfie.uploading ? '#bfdbfe' : '#fecdd3'}` }}>
                    <img src={selfie.preview} alt="selfie" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '10px 16px', backgroundColor: '#f8fafc' }}>
                      {selfie.uploading && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <Cloud size={14} color="#3b82f6" />
                            <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>Enviando para pasta privada... {selfie.uploadProgress}%</span>
                          </div>
                          <div style={{ height: 5, backgroundColor: '#dbeafe', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${selfie.uploadProgress}%`, backgroundColor: '#3b82f6', borderRadius: 10, transition: 'width 0.2s' }} />
                          </div>
                        </div>
                      )}
                      {selfie.uploaded && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Check size={14} color="#16a34a" />
                            <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>Selfie enviada com segurança ✓</span>
                          </div>
                          <button onClick={() => setSelfie(null)} style={{ fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Trocar</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Upload 2 — Documento + OCR */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, backgroundColor: '#e11d48', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>2</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#1a0a10' }}>Foto legível do documento</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>RG, CNH ou Passaporte — frente com data de nascimento visível</p>
                  </div>
                </div>

                {!docPhoto ? (
                  <label
                    style={{ display: 'block', border: '2px dashed #fecdd3', borderRadius: 16, padding: '28px 24px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fdfafa', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fff5f7'; (e.currentTarget as HTMLElement).style.borderColor = '#e11d48'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fdfafa'; (e.currentTarget as HTMLElement).style.borderColor = '#fecdd3'; }}
                  >
                    <FileText size={26} color="#e11d48" style={{ margin: '0 auto 10px' }} />
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1a0a10', marginBottom: 4 }}>Clique para enviar o documento</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>JPG ou PNG · Máximo 10MB</p>
                    <input ref={documentInputRef} type="file" accept="image/*" className="hidden" onChange={handleDocument} />
                  </label>
                ) : (
                  <div style={{ borderRadius: 16, overflow: 'hidden', border: `2px solid ${docPhoto.uploaded ? '#bbf7d0' : docPhoto.uploading ? '#bfdbfe' : '#fecdd3'}` }}>
                    <img src={docPhoto.preview} alt="documento" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '10px 16px', backgroundColor: '#f8fafc' }}>
                      {docPhoto.uploading && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <Cloud size={14} color="#3b82f6" />
                            <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>Enviando para pasta privada... {docPhoto.uploadProgress}%</span>
                          </div>
                          <div style={{ height: 5, backgroundColor: '#dbeafe', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${docPhoto.uploadProgress}%`, backgroundColor: '#3b82f6', borderRadius: 10, transition: 'width 0.2s' }} />
                          </div>
                        </div>
                      )}
                      {docPhoto.uploaded && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Check size={14} color="#16a34a" />
                            <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>Documento enviado com segurança ✓</span>
                          </div>
                          <button onClick={() => { setDocPhoto(null); ocrReset(); }} style={{ fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Trocar</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* OCR Result */}
                {docPhoto && (
                  <div style={{ marginTop: 14 }}>
                    {ocrProcessing && (
                      <div style={{ padding: '16px 20px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #3b82f6', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#1d4ed8', marginBottom: 4 }}>🔍 Analisando documento automaticamente...</p>
                          <div style={{ height: 6, backgroundColor: '#dbeafe', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${ocrProgress}%`, backgroundColor: '#3b82f6', borderRadius: 10, transition: 'width 0.3s' }} />
                          </div>
                          <p style={{ fontSize: 12, color: '#3b82f6', marginTop: 4 }}>{ocrProgress}% concluído</p>
                        </div>
                      </div>
                    )}

                    {!ocrProcessing && ocrResult && (
                      <div style={{
                        padding: '16px 20px', borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 12,
                        backgroundColor: ocrResult.status === 'success' ? '#f0fdf4' : ocrResult.status === 'underage' ? '#fef2f2' : '#fffbeb',
                        border: `1px solid ${ocrResult.status === 'success' ? '#bbf7d0' : ocrResult.status === 'underage' ? '#fecaca' : '#fde68a'}`,
                      }}>
                        <div style={{ fontSize: 22, flexShrink: 0 }}>
                          {ocrResult.status === 'success' ? '✅' : ocrResult.status === 'underage' ? '🚫' : '⚠️'}
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: ocrResult.status === 'success' ? '#15803d' : ocrResult.status === 'underage' ? '#dc2626' : '#92400e' }}>
                            {ocrResult.status === 'success' ? 'Idade confirmada automaticamente!' :
                             ocrResult.status === 'underage' ? 'Idade não permitida' :
                             ocrResult.status === 'no_date' ? 'Data não identificada — revisão manual' : 'Erro na leitura — revisão manual'}
                          </p>
                          <p style={{ fontSize: 13, lineHeight: 1.6, color: ocrResult.status === 'success' ? '#16a34a' : ocrResult.status === 'underage' ? '#ef4444' : '#b45309' }}>
                            {ocrResult.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dicas */}
              <div style={{ padding: '16px 20px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 14, marginTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 8 }}>📸 Dicas para a verificação:</p>
                <ul style={{ fontSize: 12, color: '#b45309', lineHeight: 1.9, paddingLeft: 16 }}>
                  <li>Tire a foto em local bem iluminado</li>
                  <li>Garanta que o documento esteja legível — sem reflexo ou desfoque</li>
                  <li>Segure o documento próximo ao rosto na selfie</li>
                  <li>Aceito: RG, CNH, Passaporte ou Carteira de Trabalho</li>
                </ul>
              </div>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(4)} style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: 14, border: '1.5px solid #e2e8f0', borderRadius: 14, cursor: 'pointer' }}>← Voltar</button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  flex: 2, padding: '15px',
                  background: canSubmit ? 'linear-gradient(135deg, #e11d48, #f43f5e)' : '#e2e8f0',
                  color: canSubmit ? '#fff' : '#94a3b8',
                  fontWeight: 800, fontSize: 16, border: 'none', borderRadius: 14,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: canSubmit ? '0 6px 24px rgba(225,29,72,0.35)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {submitting ? '⏳ Enviando...' : ocrProcessing ? '⏳ Verificando documento...' : '🚀 Enviar cadastro'}
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
              🔒 Arquivos enviados ao Cloudinary com segurança · Revisão em até 24h
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
