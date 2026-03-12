import { useState } from 'react';
import { Search, Download, Filter, TrendingUp } from 'lucide-react';
import AdminLayout from './AdminLayout';

const payments = [
  { id: 'PAY001', user: 'Andressa Oliveira', desc: 'Plano Destaque', amount: 99, status: 'approved', method: 'PIX', date: '05/02/2025' },
  { id: 'PAY002', user: 'Fernanda Lima', desc: '12 subidas/dia — 7 dias', amount: 79, status: 'approved', method: 'Cartão', date: '04/02/2025' },
  { id: 'PAY003', user: 'Camila Santos', desc: 'Plano Básico', amount: 49, status: 'pending', method: 'PIX', date: '04/02/2025' },
  { id: 'PAY004', user: 'Juliana Costa', desc: 'Multimídia 15 dias', amount: 75, status: 'rejected', method: 'Boleto', date: '03/02/2025' },
  { id: 'PAY005', user: 'Renata Souza', desc: 'Plano Destaque', amount: 99, status: 'approved', method: 'PIX', date: '03/02/2025' },
  { id: 'PAY006', user: 'Patricia Mendes', desc: '6 subidas/dia — 7 dias', amount: 49, status: 'approved', method: 'Cartão', date: '02/02/2025' },
  { id: 'PAY007', user: 'Mariana Silva', desc: 'Plano Básico', amount: 49, status: 'pending', method: 'PIX', date: '01/02/2025' },
  { id: 'PAY008', user: 'Andressa Oliveira', desc: '24 subidas/dia — 3 dias', amount: 79, status: 'approved', method: 'PIX', date: '28/01/2025' },
];

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
  approved: { label: 'Aprovado', color: '#16a34a', bg: '#dcfce7' },
  pending: { label: 'Pendente', color: '#d97706', bg: '#fef3c7' },
  rejected: { label: 'Rejeitado', color: '#dc2626', bg: '#fee2e2' },
  refunded: { label: 'Reembolsado', color: '#64748b', bg: '#f1f5f9' },
};

export default function AdminPayments() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = payments.filter(p =>
    (filterStatus === 'all' || p.status === filterStatus) &&
    (p.user.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  const totalApproved = payments.filter(p => p.status === 'approved').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Pagamentos</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Histórico completo de transações
          </p>
        </div>

        {/* Resumo */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16, marginBottom: 24
        }} className="pay-stats">
          <div style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '18px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <TrendingUp size={18} color="#22c55e" />
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>APROVADO NO MÊS</span>
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1e293b' }}>
              R$ {totalApproved.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '18px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>⏳</span>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>PENDENTE</span>
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#d97706' }}>
              R$ {totalPending.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '18px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>📊</span>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>TOTAL TRANSAÇÕES</span>
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1e293b' }}>
              {payments.length}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 16, padding: '14px 16px',
          border: '1px solid #f1f5f9', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou ID..."
              style={{
                width: '100%', padding: '7px 10px 7px 32px', borderRadius: 10,
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
                fontSize: 13, outline: 'none', backgroundColor: '#fff'
              }}
            >
              <option value="all">Todos</option>
              <option value="approved">Aprovados</option>
              <option value="pending">Pendentes</option>
              <option value="rejected">Rejeitados</option>
            </select>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 10,
            border: '1.5px solid #e2e8f0', backgroundColor: '#fff',
            color: '#64748b', fontSize: 13, cursor: 'pointer', fontWeight: 600
          }}>
            <Download size={14} /> Exportar
          </button>
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
                  {['ID', 'Anunciante', 'Descrição', 'Valor', 'Método', 'Status', 'Data', 'Ação'].map(h => (
                    <th key={h} style={{
                      padding: '11px 14px', textAlign: 'left',
                      fontSize: 11, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const s = statusCfg[p.status];
                  return (
                    <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                      <td style={{ padding: '11px 14px', fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>{p.id}</td>
                      <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{p.user}</td>
                      <td style={{ padding: '11px 14px', fontSize: 13, color: '#64748b' }}>{p.desc}</td>
                      <td style={{ padding: '11px 14px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
                        R$ {p.amount}
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{
                          padding: '2px 8px', borderRadius: 20, fontSize: 11,
                          backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: 600
                        }}>{p.method}</span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20,
                          backgroundColor: s.bg, color: s.color,
                          fontSize: 11, fontWeight: 700
                        }}>{s.label}</span>
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: 12, color: '#94a3b8' }}>{p.date}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <button style={{
                          padding: '4px 10px', borderRadius: 8,
                          backgroundColor: '#f1f5f9', border: 'none',
                          color: '#64748b', fontSize: 12, cursor: 'pointer'
                        }}>
                          <Download size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pay-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  );
}
