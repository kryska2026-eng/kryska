import { useState, useRef } from 'react';
import { Upload, Trash2, Star, Plus, Info } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const mockPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', main: true },
  { id: 2, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', main: false },
  { id: 3, url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', main: false },
];

export default function DashboardPhotos() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      setPhotos(prev => [...prev, { id: Date.now() + Math.random(), url, main: false }]);
    });
  };

  const setMain = (id: number) => {
    setPhotos(prev => prev.map(p => ({ ...p, main: p.id === id })));
  };

  const remove = (id: number) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Minhas Fotos</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Gerencie as fotos do seu perfil. A marca d'água kryska.com.br é aplicada automaticamente.
          </p>
        </div>

        {/* Info */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '14px 16px', borderRadius: 14,
          backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
          marginBottom: 24
        }}>
          <Info size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Dicas:</strong> Use fotos bem iluminadas e de boa qualidade.
            A primeira foto é a principal e aparece nos resultados de busca.
            Máximo de 8 fotos por perfil.
          </div>
        </div>

        {/* Upload area */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          style={{
            border: `2px dashed ${dragging ? '#e11d48' : '#fce7f3'}`,
            borderRadius: 20, padding: '32px 20px',
            backgroundColor: dragging ? '#fff1f5' : '#fafafa',
            cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.2s', marginBottom: 24
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            backgroundColor: '#fff1f5', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <Upload size={24} color="#e11d48" />
          </div>
          <p style={{ margin: 0, fontWeight: 600, color: '#1e293b', fontSize: 15 }}>
            Clique ou arraste as fotos aqui
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94a3b8' }}>
            JPG, PNG até 10MB — máximo 8 fotos
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={e => handleFiles(e.target.files)}
          />
        </div>

        {/* Grid de fotos */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12, marginBottom: 24
        }} className="photos-grid">
          {photos.map(photo => (
            <div key={photo.id} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
              <img
                src={photo.url}
                alt=""
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
              />
              {/* Badge principal */}
              {photo.main && (
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  backgroundColor: '#f59e0b', color: '#fff',
                  fontSize: 11, fontWeight: 700, padding: '3px 8px',
                  borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4
                }}>
                  <Star size={10} fill="#fff" /> Principal
                </div>
              )}
              {/* Ações */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 8px 8px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                display: 'flex', gap: 6
              }}>
                {!photo.main && (
                  <button
                    onClick={() => setMain(photo.id)}
                    style={{
                      flex: 1, padding: '6px', borderRadius: 8,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff', fontSize: 11, cursor: 'pointer',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <Star size={12} style={{ marginRight: 4 }} />
                    Principal
                  </button>
                )}
                <button
                  onClick={() => remove(photo.id)}
                  style={{
                    padding: '6px 10px', borderRadius: 8,
                    backgroundColor: 'rgba(239,68,68,0.8)',
                    border: 'none', color: '#fff', cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Add more */}
          {photos.length < 8 && (
            <div
              onClick={() => inputRef.current?.click()}
              style={{
                aspectRatio: '3/4', borderRadius: 16,
                border: '2px dashed #fce7f3',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backgroundColor: '#fafafa',
                gap: 8, color: '#e11d48', transition: 'all 0.2s'
              }}
            >
              <Plus size={28} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Adicionar</span>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
          {photos.length}/8 fotos utilizadas
        </p>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .photos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
