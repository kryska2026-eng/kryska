import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Clock, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';

const verifications = [
  { id: 1, name: 'Camila Santos', city: 'Sertãozinho', date: '04/02/2025', status: 'pending', age: 23, selfie: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', doc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200', ocrResult: 'Aprovado pelo OCR — 23 anos' },
  { id: 2, name: 'Mariana Silva', city: 'Ribeirão Preto', date: '01/02/2025', status: 'pending', age: 19, selfie: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', doc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200', ocrResult: 'Aprovado pelo OCR — 19 anos' },
  { id: 3, name: 'Patricia Mendes', city: 'Pontal', date: '31/01/2025', status: 'pending', age: 0, selfie: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200', doc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200', ocrResult: 'OCR não identificou data — revisão manual necessária' },
  { id: 4, name: 'Andressa Oliveira', city: 'Ribeirão Preto', date: '28/01/2025', status: 'approved', age: 25, selfie: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', doc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200', ocrResult: 'Aprovado pelo OCR — 25 anos' },
  { id: 5, name: 'Juliana Costa', city: 'Cravinhos', date: '25/01/2025', status: 'rejected', age: 17, selfie: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', doc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200', ocrResult: 'OCR identificou menor de idade — 17 anos' },
];

export default function AdminVerifications() {
  const [filter, setFilter] = useState('pending');
  const [selected, setSelected] = useState<typeof verifications[0] | null>(null);
  const [note, setNote] = useState('');
  const [items, setItems] = useState(verifications);
  const [search, setSearch] = useState('');

  const filtered = items.filter(v =>
    (filter === 'all' || v.status === filter) &&
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  const approve = (id: number) => {
    setItems(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
    setSelected(null);
  };

  const reject = (id: number) => {
    setItems(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' } : v));
    setSelected(null);
  };

  const statusCfg = {
    pending: { label: 'Pendente', color: '#d97706', bg: '#fef3c7' },
    approved: { label: 'Aprovado', color: '#16a34a', bg: '#dcfce7' },
    rejected: { label: 'Rejeitado', color: '#dc2626', bg: '#fee2e2' },
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Verificações</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Analise selfies e documentos enviados pelas anunciantes
          </p>
        </div>

        {/* Filtros */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 16, padding: '16px',
          border: '1px solid #f1f5f9', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar anunciante..."
              style={{
                width: '100%', padding: '8px 12px 8px 36px', borderRadius: 10,
                border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  backgroundColor: filter === f ? '#e11d48' : '#f1f5f9',
                  color: filter === f ? '#fff' : '#64748b'
                }}
              >
                {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendentes' : f === 'approved' ? 'Aprovados' : 'Rejeitados'}
                {f === 'pending' && <span style={{
                  marginLeft: 6, backgroundColor: '#fff', color: '#e11d48',
                  borderRadius: 20, padding: '1px 6px', fontSize: 11
                }}>{items.filter(v => v.status === 'pending').length}</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>
          {/* Lista */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((v) => {
              const s = statusCfg[v.status as keyof typeof statusCfg];
              return (
                <div
                  key={v.id}
                  onClick={() => setSelected(selected?.id === v.id ? null : v)}
                  style={{
                    backgroundColor: '#fff', borderRadius: 16, padding: '14px 16px',
                    border: `2px solid ${selected?.id === v.id ? '#e11d48' : '#f1f5f9'}`,
                    cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img
                        src={v.selfie}
                        alt=""
                        style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{v.name}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{v.city} • {v.date}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20,
                        backgroundColor: s.bg, color: s.color,
                        fontSize: 11, fontWeight: 700
                      }}>{s.label}</span>
                      <Eye size={16} color="#94a3b8" />
                    </div>
                  </div>
                  <div style={{
                    marginTop: 10, padding: '8px 10px', borderRadius: 8,
                    backgroundColor: v.ocrResult.includes('menor') ? '#fef2f2' :
                      v.ocrResult.includes('necessária') ? '#fffbeb' : '#f0fdf4',
                    border: `1px solid ${v.ocrResult.includes('menor') ? '#fecaca' :
                      v.ocrResult.includes('necessária') ? '#fde68a' : '#bbf7d0'}`
                  }}>
                    <p style={{
                      margin: 0, fontSize: 11, fontWeight: 600,
                      color: v.ocrResult.includes('menor') ? '#dc2626' :
                        v.ocrResult.includes('necessária') ? '#d97706' : '#16a34a'
                    }}>
                      🤖 OCR: {v.ocrResult}
                    </p>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '40px', backgroundColor: '#fff',
                borderRadius: 16, border: '1px solid #f1f5f9', color: '#94a3b8'
              }}>
                <Clock size={32} style={{ marginBottom: 8 }} />
                <p style={{ margin: 0 }}>Nenhuma verificação encontrada</p>
              </div>
            )}
          </div>

          {/* Detalhe */}
          {selected && (
            <div style={{
              backgroundColor: '#fff', borderRadius: 20, padding: '20px',
              border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              height: 'fit-content', position: 'sticky', top: 80
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
                {selected.name}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: '#64748b' }}>SELFIE COM DOCUMENTO</p>
                  <img src={selected.selfie} alt="" style={{
                    width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 12
                  }} />
                </div>
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: '#64748b' }}>DOCUMENTO</p>
                  <img src={selected.doc} alt="" style={{
                    width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 12
                  }} />
                </div>
              </div>

              <div style={{
                padding: '10px 12px', borderRadius: 10, marginBottom: 16,
                backgroundColor: selected.ocrResult.includes('menor') ? '#fef2f2' :
                  selected.ocrResult.includes('necessária') ? '#fffbeb' : '#f0fdf4',
                border: `1px solid ${selected.ocrResult.includes('menor') ? '#fecaca' :
                  selected.ocrResult.includes('necessária') ? '#fde68a' : '#bbf7d0'}`
              }}>
                <p style={{
                  margin: 0, fontSize: 12, fontWeight: 600,
                  color: selected.ocrResult.includes('menor') ? '#dc2626' :
                    selected.ocrResult.includes('necessária') ? '#d97706' : '#16a34a'
                }}>🤖 {selected.ocrResult}</p>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  Observação (opcional)
                </label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Motivo da aprovação ou rejeição..."
                  rows={3}
                  style={{
                    width: '100%', padding: '8px 12px', borderRadius: 10,
                    border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
                    resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit'
                  }}
                />
              </div>

              {selected.status === 'pending' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    onClick={() => approve(selected.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px', borderRadius: 12, border: 'none',
                      backgroundColor: '#22c55e', color: '#fff',
                      fontWeight: 700, fontSize: 14, cursor: 'pointer'
                    }}
                  >
                    <CheckCircle size={16} /> Aprovar
                  </button>
                  <button
                    onClick={() => reject(selected.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px', borderRadius: 12, border: 'none',
                      backgroundColor: '#dc2626', color: '#fff',
                      fontWeight: 700, fontSize: 14, cursor: 'pointer'
                    }}
                  >
                    <XCircle size={16} /> Rejeitar
                  </button>
                </div>
              )}
              {selected.status !== 'pending' && (
                <div style={{
                  textAlign: 'center', padding: '10px', borderRadius: 12,
                  backgroundColor: selected.status === 'approved' ? '#f0fdf4' : '#fef2f2',
                  color: selected.status === 'approved' ? '#16a34a' : '#dc2626',
                  fontWeight: 700, fontSize: 14
                }}>
                  {selected.status === 'approved' ? '✓ Verificação aprovada' : '✗ Verificação rejeitada'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
