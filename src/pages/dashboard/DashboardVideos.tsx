import { useState, useRef } from 'react';
import { Upload, Trash2, Play, Info } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const mockVideos = [
  { id: 1, url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', duration: '0:45', title: 'Apresentação' },
];

export default function DashboardVideos() {
  const [videos, setVideos] = useState(mockVideos);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      setVideos(prev => [...prev, {
        id: Date.now(),
        url,
        thumb: '',
        duration: '0:00',
        title: file.name.replace(/\.[^/.]+$/, '')
      }]);
    });
  };

  const remove = (id: number) => setVideos(prev => prev.filter(v => v.id !== id));

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Meus Vídeos</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Adicione vídeos de apresentação ao seu perfil
          </p>
        </div>

        {/* Info multimídia */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '14px 16px', borderRadius: 14,
          backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
          marginBottom: 20
        }}>
          <Info size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Plano Multimídia necessário.</strong> Para adicionar vídeos ao seu perfil, você precisa do complemento Multimídia
            (R$ 5/dia). Cada vídeo pode ter até 1 minuto e apenas você deve aparecer no vídeo.
            <br />
            <a href="/checkout?item=media_7d" style={{ color: '#e11d48', fontWeight: 700 }}>
              Contratar Multimídia →
            </a>
          </div>
        </div>

        {/* Upload */}
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
            Clique ou arraste o vídeo aqui
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94a3b8' }}>
            MP4, MOV, WebM — máximo 100MB e 1 minuto
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            multiple
            style={{ display: 'none' }}
            onChange={e => handleFiles(e.target.files)}
          />
        </div>

        {/* Lista de vídeos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {videos.map(video => (
            <div key={video.id} style={{
              backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden',
              border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              {playing === video.id ? (
                <video
                  src={video.url}
                  controls
                  autoPlay
                  style={{ width: '100%', maxHeight: 300, backgroundColor: '#000', display: 'block' }}
                  onEnded={() => setPlaying(null)}
                />
              ) : (
                <div style={{ position: 'relative' }}>
                  {video.thumb ? (
                    <img src={video.thumb} alt="" style={{
                      width: '100%', height: 180, objectFit: 'cover', display: 'block'
                    }} />
                  ) : (
                    <div style={{
                      width: '100%', height: 180,
                      backgroundColor: '#1e293b',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Play size={40} color="#64748b" />
                    </div>
                  )}
                  <button
                    onClick={() => setPlaying(video.id)}
                    style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Play size={22} color="#e11d48" fill="#e11d48" />
                    </div>
                  </button>
                  <div style={{
                    position: 'absolute', bottom: 8, right: 8,
                    backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff',
                    fontSize: 11, padding: '2px 8px', borderRadius: 20
                  }}>
                    {video.duration}
                  </div>
                </div>
              )}
              <div style={{
                padding: '12px 16px', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{video.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>Aprovado • Visível no perfil</p>
                </div>
                <button
                  onClick={() => remove(video.id)}
                  style={{
                    padding: '7px', borderRadius: 10, border: 'none',
                    backgroundColor: '#fee2e2', color: '#dc2626', cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {videos.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '40px', backgroundColor: '#fff',
              borderRadius: 16, border: '1px solid #f1f5f9', color: '#94a3b8'
            }}>
              <Play size={32} style={{ marginBottom: 8 }} />
              <p style={{ margin: 0 }}>Nenhum vídeo cadastrado ainda</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
