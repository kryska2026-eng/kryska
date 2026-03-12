import { CreditCard, CheckCircle, Clock, AlertCircle, Download, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const payments = [
  { id: 'PAY001', desc: 'Plano Destaque — Fevereiro/2025', amount: 99.00, date: '01/02/2025', status: 'approved' },
  { id: 'PAY002', desc: '12 subidas/dia — 7 dias', amount: 79.00, date: '28/01/2025', status: 'approved' },
  { id: 'PAY003', desc: 'Multimídia — 15 dias', amount: 75.00, date: '15/01/2025', status: 'approved' },
  { id: 'PAY004', desc: 'Plano Destaque — Janeiro/2025', amount: 99.00, date: '01/01/2025', status: 'approved' },
  { id: 'PAY005', desc: '6 subidas/dia — 7 dias', amount: 49.00, date: '20/12/2024', status: 'refunded' },
];

const statusConfig = {
  approved: { label: 'Aprovado', color: '#16a34a', bg: '#dcfce7', icon: CheckCircle },
  pending: { label: 'Pendente', color: '#d97706', bg: '#fef3c7', icon: Clock },
  rejected: { label: 'Rejeitado', color: '#dc2626', bg: '#fee2e2', icon: AlertCircle },
  refunded: { label: 'Reembolsado', color: '#64748b', bg: '#f1f5f9', icon: AlertCircle },
};

export default function DashboardBilling() {
  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Planos & Pagamentos</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Gerencie seu plano e veja o histórico de pagamentos
          </p>
        </div>

        {/* Plano atual */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: 20, padding: '24px', marginBottom: 20,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Star size={18} color="#fbbf24" fill="#fbbf24" />
                <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: 14 }}>PLANO ATIVO</span>
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: '#fff' }}>Destaque</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: '#94a3b8' }}>
                Renovação automática em 01/03/2025
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['Badge Destaque', 'Prioridade na listagem', 'Até 8 fotos', 'Suporte por email'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={14} color="#22c55e" />
                    <span style={{ fontSize: 13, color: '#cbd5e1' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: '#fff' }}>R$ 99</p>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: '#94a3b8' }}>/mês</p>
              <Link to="/checkout?item=featured" style={{
                display: 'inline-block', padding: '8px 16px', borderRadius: 10,
                backgroundColor: '#fff', color: '#1e293b',
                textDecoration: 'none', fontSize: 13, fontWeight: 700
              }}>
                Renovar agora
              </Link>
            </div>
          </div>
        </div>

        {/* Mudar plano */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 14, marginBottom: 24
        }} className="plans-grid">
          <div style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '18px',
            border: '1px solid #f1f5f9'
          }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 16, color: '#1e293b' }}>Básico</p>
            <p style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: '#e11d48' }}>
              R$ 49<span style={{ fontSize: 14, fontWeight: 400, color: '#94a3b8' }}>/mês</span>
            </p>
            <Link to="/checkout?item=basic" style={{
              display: 'block', textAlign: 'center', padding: '8px',
              borderRadius: 10, border: '1.5px solid #e2e8f0',
              color: '#64748b', textDecoration: 'none', fontSize: 13, fontWeight: 600
            }}>
              Mudar para Básico
            </Link>
          </div>
          <div style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '18px',
            border: '2px solid #fce7f3'
          }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 16, color: '#1e293b' }}>Destaque</p>
            <p style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: '#e11d48' }}>
              R$ 99<span style={{ fontSize: 14, fontWeight: 400, color: '#94a3b8' }}>/mês</span>
            </p>
            <div style={{
              display: 'block', textAlign: 'center', padding: '8px',
              borderRadius: 10, backgroundColor: '#fff1f5',
              color: '#e11d48', fontSize: 13, fontWeight: 700
            }}>
              ✓ Plano atual
            </div>
          </div>
        </div>

        {/* Subidas ativas */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '20px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Subidas ativas</h3>
            <Link to="/dashboard/boosts" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 10,
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600
            }}>
              <Zap size={14} /> Comprar subidas
            </Link>
          </div>
          <div style={{
            padding: '14px', borderRadius: 12,
            background: 'linear-gradient(135deg, #fff1f5, #fdf2f8)',
            border: '1px solid #fce7f3'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#1e293b' }}>12 subidas/dia</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>Expira em 4 dias</p>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: 20,
                backgroundColor: '#dcfce7', color: '#16a34a',
                fontSize: 12, fontWeight: 700
              }}>ATIVO</span>
            </div>
          </div>
        </div>

        {/* Histórico */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '20px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <CreditCard size={18} color="#e11d48" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Histórico de pagamentos</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {payments.map((p) => {
              const s = statusConfig[p.status as keyof typeof statusConfig];
              return (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: 12,
                  border: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 8
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{p.desc}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{p.date} • #{p.id}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20,
                      backgroundColor: s.bg, color: s.color,
                      fontSize: 11, fontWeight: 700
                    }}>{s.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>
                      R$ {p.amount.toFixed(2)}
                    </span>
                    <button style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#94a3b8', padding: 4
                    }}>
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
