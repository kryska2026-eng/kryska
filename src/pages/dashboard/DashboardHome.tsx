import { Eye, MessageCircle, Phone, TrendingUp, Star, CheckCircle, Clock, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const stats = [
  { icon: Eye, label: 'Visualizações hoje', value: '147', change: '+12%', color: '#3b82f6' },
  { icon: MessageCircle, label: 'Cliques WhatsApp', value: '23', change: '+8%', color: '#22c55e' },
  { icon: Phone, label: 'Cliques Telefone', value: '7', change: '+3%', color: '#f59e0b' },
  { icon: TrendingUp, label: 'Posição média', value: '#4', change: '+2', color: '#e11d48' },
];

const weekData = [40, 65, 50, 80, 70, 95, 147];
const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const maxVal = Math.max(...weekData);

export default function DashboardHome() {
  return (
    <DashboardLayout>
      {/* Boas vindas */}
      <div style={{
        background: 'linear-gradient(135deg, #fff1f5 0%, #fdf2f8 100%)',
        borderRadius: 20, padding: '24px 28px', marginBottom: 24,
        border: '1px solid #fce7f3', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1e293b' }}>
            Olá, Andressa! 👋
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>
            Seu perfil está ativo e recebendo visitas. Confira as estatísticas de hoje.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/dashboard/boosts" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 12,
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            boxShadow: '0 4px 12px rgba(225,29,72,0.3)'
          }}>
            <Zap size={16} />
            Comprar Subidas
          </Link>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 12,
            backgroundColor: '#fff', border: '1px solid #fce7f3',
            color: '#e11d48', textDecoration: 'none', fontSize: 14, fontWeight: 600
          }}>
            Ver meu perfil
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16, marginBottom: 24
      }} className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                backgroundColor: stat.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <span style={{
                fontSize: 12, fontWeight: 600, color: '#22c55e',
                backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: 20
              }}>{stat.change}</span>
            </div>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{stat.value}</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="dashboard-grid">
        {/* Gráfico de visitas */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Visitas da semana</h3>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Últimos 7 dias</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
            {weekData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>{val}</span>
                <div style={{
                  width: '100%', borderRadius: 6,
                  height: `${(val / maxVal) * 90}px`,
                  background: i === 6
                    ? 'linear-gradient(180deg, #e11d48, #be123c)'
                    : 'linear-gradient(180deg, #fda4af, #fecdd3)',
                  transition: 'all 0.3s'
                }} />
                <span style={{ fontSize: 10, color: '#94a3b8' }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status do perfil */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Status do perfil</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Perfil verificado', ok: true },
              { label: 'Foto principal', ok: true },
              { label: 'Descrição completa', ok: true },
              { label: 'WhatsApp cadastrado', ok: true },
              { label: 'Vídeo de apresentação', ok: false },
              { label: 'Pacote de subidas ativo', ok: false },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: 12,
                backgroundColor: item.ok ? '#f0fdf4' : '#fff7ed',
                border: `1px solid ${item.ok ? '#bbf7d0' : '#fed7aa'}`
              }}>
                <span style={{ fontSize: 14, color: '#1e293b' }}>{item.label}</span>
                {item.ok
                  ? <CheckCircle size={18} color="#22c55e" />
                  : <Clock size={18} color="#f59e0b" />
                }
              </div>
            ))}
          </div>
        </div>

        {/* Subidas ativas */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Subidas ativas</h3>
            <Link to="/dashboard/boosts" style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, color: '#e11d48', textDecoration: 'none', fontWeight: 600
            }}>
              Ver tudo <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{
            padding: '16px', borderRadius: 14,
            background: 'linear-gradient(135deg, #fff1f5, #fdf2f8)',
            border: '1px solid #fce7f3', marginBottom: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#1e293b', fontSize: 15 }}>12 subidas/dia</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>Expira em 4 dias</p>
              </div>
              <div style={{
                padding: '6px 14px', borderRadius: 20,
                backgroundColor: '#dcfce7', color: '#16a34a',
                fontSize: 12, fontWeight: 700
              }}>ATIVO</div>
            </div>
            <div style={{ marginTop: 12, backgroundColor: '#fce7f3', borderRadius: 20, height: 6 }}>
              <div style={{
                width: '43%', height: '100%', borderRadius: 20,
                background: 'linear-gradient(90deg, #e11d48, #be123c)'
              }} />
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 11, color: '#94a3b8' }}>3 de 7 dias utilizados</p>
          </div>
          <Link to="/dashboard/boosts" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px', borderRadius: 12, width: '100%',
            border: '2px dashed #fce7f3', color: '#e11d48',
            textDecoration: 'none', fontSize: 14, fontWeight: 600,
            backgroundColor: 'transparent', cursor: 'pointer'
          }}>
            <Zap size={16} />
            Comprar mais subidas
          </Link>
        </div>

        {/* Plano atual */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: 20, padding: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Star size={20} color="#fbbf24" fill="#fbbf24" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>Plano Destaque</h3>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
            Seu perfil aparece destacado na listagem com badge especial e prioridade nas buscas.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Próxima cobrança</p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#fff' }}>15/02/2025 — R$ 99,00</p>
            </div>
            <Link to="/dashboard/billing" style={{
              padding: '8px 16px', borderRadius: 10,
              backgroundColor: '#fff', color: '#1e293b',
              textDecoration: 'none', fontSize: 13, fontWeight: 600
            }}>
              Gerenciar
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .dashboard-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
