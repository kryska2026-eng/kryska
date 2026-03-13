import { Users, CreditCard, Eye, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const stats = [
  { icon: Users, label: 'Total anunciantes', value: '142', change: '+8 este mês', color: '#3b82f6' },
  { icon: CheckCircle, label: 'Perfis ativos', value: '98', change: '69% do total', color: '#22c55e' },
  { icon: Clock, label: 'Pendentes verificação', value: '12', change: 'Aguardando revisão', color: '#f59e0b' },
  { icon: CreditCard, label: 'Receita do mês', value: 'R$ 8.420', change: '+23% vs mês anterior', color: '#e11d48' },
];

const recentUsers = [
  { name: 'Andressa Oliveira', city: 'Ribeirão Preto', plan: 'featured', status: 'active', date: '05/02/2025' },
  { name: 'Camila Santos', city: 'Sertãozinho', plan: 'basic', status: 'pending', date: '04/02/2025' },
  { name: 'Fernanda Lima', city: 'Ribeirão Preto', plan: 'featured', status: 'active', date: '03/02/2025' },
  { name: 'Juliana Costa', city: 'Cravinhos', plan: 'basic', status: 'rejected', date: '02/02/2025' },
  { name: 'Mariana Silva', city: 'Ribeirão Preto', plan: 'basic', status: 'pending', date: '01/02/2025' },
];

const recentPayments = [
  { user: 'Andressa Oliveira', desc: 'Plano Destaque', amount: 99, status: 'approved', date: '05/02' },
  { user: 'Fernanda Lima', desc: '12 subidas/dia — 7 dias', amount: 79, status: 'approved', date: '04/02' },
  { user: 'Camila Santos', desc: 'Plano Básico', amount: 49, status: 'pending', date: '04/02' },
  { user: 'Juliana Costa', desc: 'Multimídia 15 dias', amount: 75, status: 'rejected', date: '03/02' },
];

const statusBadge = (status: string) => {
  const cfg: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: 'Ativo', color: '#16a34a', bg: '#dcfce7' },
    pending: { label: 'Pendente', color: '#d97706', bg: '#fef3c7' },
    rejected: { label: 'Rejeitado', color: '#dc2626', bg: '#fee2e2' },
    approved: { label: 'Aprovado', color: '#16a34a', bg: '#dcfce7' },
    expired: { label: 'Expirado', color: '#64748b', bg: '#f1f5f9' },
  };
  const c = cfg[status] || cfg.pending;
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20,
      backgroundColor: c.bg, color: c.color,
      fontSize: 11, fontWeight: 700
    }}>{c.label}</span>
  );
};

const weekData = [32, 48, 41, 62, 55, 78, 98];
const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const maxVal = Math.max(...weekData);

export default function AdminHome() {
  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16, marginBottom: 24
        }} className="admin-stats">
          {stats.map((s) => (
            <div key={s.label} style={{
              backgroundColor: '#fff', borderRadius: 16, padding: '20px',
              border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  backgroundColor: s.color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <s.icon size={20} color={s.color} />
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{s.value}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{s.label}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: s.color, fontWeight: 600 }}>{s.change}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="admin-grid">
          {/* Ações rápidas */}
          <div style={{
            backgroundColor: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Ações rápidas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
              <Link to="/admin/verifications" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 10px', borderRadius: 14,
                backgroundColor: '#fef3c7', border: '1px solid #fde68a',
                textDecoration: 'none', cursor: 'pointer'
              }}>
                <AlertCircle size={22} color="#d97706" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#d97706', textAlign: 'center' }}>
                  12 pendentes
                </span>
                <span style={{ fontSize: 11, color: '#92400e', textAlign: 'center' }}>Verificar</span>
              </Link>
              <Link to="/admin/users" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 10px', borderRadius: 14,
                backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
                textDecoration: 'none', cursor: 'pointer'
              }}>
                <Users size={22} color="#3b82f6" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', textAlign: 'center' }}>
                  142 perfis
                </span>
                <span style={{ fontSize: 11, color: '#1e40af', textAlign: 'center' }}>Gerenciar</span>
              </Link>
              <Link to="/admin/payments" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 10px', borderRadius: 14,
                backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
                textDecoration: 'none', cursor: 'pointer'
              }}>
                <CreditCard size={22} color="#16a34a" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', textAlign: 'center' }}>
                  R$ 8.420
                </span>
                <span style={{ fontSize: 11, color: '#14532d', textAlign: 'center' }}>Pagamentos</span>
              </Link>
              <Link to="/admin/plans" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 10px', borderRadius: 14,
                backgroundColor: '#fce7f3', border: '1px solid #fbcfe8',
                textDecoration: 'none', cursor: 'pointer'
              }}>
                <Package size={22} color="#be185d" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#be185d', textAlign: 'center' }}>
                  Planos
                </span>
                <span style={{ fontSize: 11, color: '#9d174d', textAlign: 'center' }}>Preços</span>
              </Link>
            </div>
          </div>

          {/* Gráfico */}
          <div style={{
            backgroundColor: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Visitas do site (semana)</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={14} color="#94a3b8" />
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Total: 414</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
              {weekData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>{val}</span>
                  <div style={{
                    width: '100%', borderRadius: 6,
                    height: `${(val / maxVal) * 80}px`,
                    background: i === 6
                      ? 'linear-gradient(180deg, #e11d48, #be123c)'
                      : 'linear-gradient(180deg, #fda4af, #fecdd3)'
                  }} />
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Últimas anunciantes */}
          <div style={{
            backgroundColor: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Últimas anunciantes</h3>
              <Link to="/admin/users" style={{ fontSize: 13, color: '#e11d48', textDecoration: 'none', fontWeight: 600 }}>
                Ver todas
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentUsers.map((u, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 12, border: '1px solid #f1f5f9',
                  flexWrap: 'wrap', gap: 8
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #fda4af, #e11d48)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0
                    }}>
                      {u.name[0]}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{u.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{u.city} • {u.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      backgroundColor: u.plan === 'featured' ? '#fef3c7' : '#f1f5f9',
                      color: u.plan === 'featured' ? '#d97706' : '#64748b'
                    }}>
                      {u.plan === 'featured' ? 'Destaque' : 'Básico'}
                    </span>
                    {statusBadge(u.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagamentos recentes */}
          <div style={{
            backgroundColor: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Pagamentos recentes</h3>
              <Link to="/admin/payments" style={{ fontSize: 13, color: '#e11d48', textDecoration: 'none', fontWeight: 600 }}>
                Ver todos
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentPayments.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 12, border: '1px solid #f1f5f9',
                  flexWrap: 'wrap', gap: 8
                }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{p.user}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{p.desc} • {p.date}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {statusBadge(p.status)}
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>
                      R$ {p.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-stats { grid-template-columns: repeat(4, 1fr) !important; }
          .admin-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </AdminLayout>
  );
}
