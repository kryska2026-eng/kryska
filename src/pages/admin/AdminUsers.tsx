import { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const users = [
  { id: 1, name: 'Andressa Oliveira', city: 'Ribeirão Preto', plan: 'featured', status: 'active', verified: true, views: 1240, whatsapp: 87, date: '28/01/2025' },
  { id: 2, name: 'Camila Santos', city: 'Sertãozinho', plan: 'basic', status: 'pending', verified: false, views: 0, whatsapp: 0, date: '04/02/2025' },
  { id: 3, name: 'Fernanda Lima', city: 'Ribeirão Preto', plan: 'featured', status: 'active', verified: true, views: 890, whatsapp: 54, date: '03/02/2025' },
  { id: 4, name: 'Juliana Costa', city: 'Cravinhos', plan: 'basic', status: 'rejected', verified: false, views: 0, whatsapp: 0, date: '02/02/2025' },
  { id: 5, name: 'Mariana Silva', city: 'Ribeirão Preto', plan: 'basic', status: 'pending', verified: false, views: 0, whatsapp: 0, date: '01/02/2025' },
  { id: 6, name: 'Patricia Mendes', city: 'Pontal', plan: 'basic', status: 'active', verified: true, views: 320, whatsapp: 18, date: '15/01/2025' },
  { id: 7, name: 'Renata Souza', city: 'Jardinópolis', plan: 'featured', status: 'active', verified: true, views: 2100, whatsapp: 143, date: '10/01/2025' },
];

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Ativo', color: '#16a34a', bg: '#dcfce7' },
  pending: { label: 'Pendente', color: '#d97706', bg: '#fef3c7' },
  rejected: { label: 'Rejeitado', color: '#dc2626', bg: '#fee2e2' },
  expired: { label: 'Expirado', color: '#64748b', bg: '#f1f5f9' },
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  const filtered = users.filter(u =>
    (filterStatus === 'all' || u.status === filterStatus) &&
    (filterPlan === 'all' || u.plan === filterPlan) &&
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Anunciantes</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            {users.length} anunciantes cadastradas no total
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
              placeholder="Buscar por nome..."
              style={{
                width: '100%', padding: '8px 12px 8px 36px', borderRadius: 10,
                border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={14} color="#94a3b8" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{
                padding: '7px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                fontSize: 13, outline: 'none', backgroundColor: '#fff', color: '#374151'
              }}
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="pending">Pendentes</option>
              <option value="rejected">Rejeitados</option>
            </select>
            <select
              value={filterPlan}
              onChange={e => setFilterPlan(e.target.value)}
              style={{
                padding: '7px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                fontSize: 13, outline: 'none', backgroundColor: '#fff', color: '#374151'
              }}
            >
              <option value="all">Todos os planos</option>
              <option value="basic">Básico</option>
              <option value="featured">Destaque</option>
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, border: '1px solid #f1f5f9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                  {['Anunciante', 'Cidade', 'Plano', 'Status', 'Verificada', 'Visitas', 'WhatsApp', 'Ações'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontSize: 12, fontWeight: 700, color: '#64748b',
                      whiteSpace: 'nowrap'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => {
                  const s = statusCfg[u.status];
                  return (
                    <tr key={u.id} style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
                      transition: 'background-color 0.1s'
                    }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #fda4af, #e11d48)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0
                          }}>{u.name[0]}</div>
                          <div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{u.name}</p>
                            <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{u.date}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>{u.city}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                          backgroundColor: u.plan === 'featured' ? '#fef3c7' : '#f1f5f9',
                          color: u.plan === 'featured' ? '#d97706' : '#64748b'
                        }}>
                          {u.plan === 'featured' ? '⭐ Destaque' : 'Básico'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                          backgroundColor: s.bg, color: s.color
                        }}>{s.label}</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        {u.verified
                          ? <CheckCircle size={18} color="#22c55e" />
                          : <XCircle size={18} color="#e2e8f0" />
                        }
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                        {u.views.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#22c55e' }}>
                        {u.whatsapp}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Link to={`/profile/${u.id}`} style={{
                            padding: '5px 10px', borderRadius: 8,
                            backgroundColor: '#f1f5f9', border: 'none',
                            color: '#64748b', fontSize: 12, cursor: 'pointer',
                            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
                          }}>
                            <Eye size={13} /> Ver
                          </Link>
                          {u.status === 'pending' && (
                            <button style={{
                              padding: '5px 10px', borderRadius: 8,
                              backgroundColor: '#dcfce7', border: 'none',
                              color: '#16a34a', fontSize: 12, cursor: 'pointer', fontWeight: 600
                            }}>Aprovar</button>
                          )}
                          {u.status === 'active' && (
                            <button style={{
                              padding: '5px 10px', borderRadius: 8,
                              backgroundColor: '#fee2e2', border: 'none',
                              color: '#dc2626', fontSize: 12, cursor: 'pointer', fontWeight: 600
                            }}>Bloquear</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              Nenhuma anunciante encontrada
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
