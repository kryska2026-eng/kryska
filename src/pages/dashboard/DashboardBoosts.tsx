import { useState } from 'react';
import { Zap, Clock, TrendingUp, CheckCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const boostPackages = [
  {
    freq: '6 subidas/dia', freqLabel: 'A cada 4 horas', color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0',
    packages: [
      { days: 1, price: 19, id: 'boost_6_1d' },
      { days: 3, price: 29, id: 'boost_6_3d' },
      { days: 7, price: 49, id: 'boost_6_7d', popular: true },
      { days: 15, price: 79, id: 'boost_6_15d' },
    ]
  },
  {
    freq: '12 subidas/dia', freqLabel: 'A cada 2 horas', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a',
    packages: [
      { days: 1, price: 29, id: 'boost_12_1d' },
      { days: 3, price: 49, id: 'boost_12_3d' },
      { days: 7, price: 79, id: 'boost_12_7d', popular: true },
      { days: 15, price: 119, id: 'boost_12_15d' },
    ]
  },
  {
    freq: '24 subidas/dia', freqLabel: 'A cada hora', color: '#e11d48', bg: '#fff1f5', border: '#fecdd3',
    packages: [
      { days: 1, price: 49, id: 'boost_24_1d' },
      { days: 3, price: 79, id: 'boost_24_3d' },
      { days: 7, price: 119, id: 'boost_24_7d', popular: true },
      { days: 15, price: 179, id: 'boost_24_15d' },
    ]
  },
];

const activeBoosts = [
  { freq: '12 subidas/dia', days: 7, daysLeft: 4, progress: 43, nextBoost: '14:00' },
];

export default function DashboardBoosts() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Pacotes de Subida</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Suba seu perfil para o topo da listagem e receba mais visitas
          </p>
        </div>

        {/* Como funciona */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12, marginBottom: 28
        }} className="how-grid">
          {[
            { icon: Zap, title: 'Sobe para o topo', desc: 'Seu perfil aparece em 1º na listagem global', color: '#e11d48' },
            { icon: Clock, title: 'Dura 1 hora', desc: 'Cada subida mantém você no topo por 1 hora', color: '#f59e0b' },
            { icon: TrendingUp, title: 'Mais visitas', desc: 'Perfis no topo recebem 5x mais cliques', color: '#22c55e' },
          ].map(item => (
            <div key={item.title} style={{
              backgroundColor: '#fff', borderRadius: 16, padding: '16px',
              border: '1px solid #f1f5f9', textAlign: 'center'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                backgroundColor: item.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px'
              }}>
                <item.icon size={22} color={item.color} />
              </div>
              <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 14, color: '#1e293b' }}>{item.title}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Subidas ativas */}
        {activeBoosts.length > 0 && (
          <div style={{
            backgroundColor: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginBottom: 28
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
              ⚡ Subidas ativas
            </h3>
            {activeBoosts.map((b, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: 14,
                background: 'linear-gradient(135deg, #fff1f5, #fdf2f8)',
                border: '1px solid #fce7f3'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1e293b' }}>{b.freq}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>
                      Próxima subida às {b.nextBoost} • Expira em {b.daysLeft} dias
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20,
                    backgroundColor: '#dcfce7', color: '#16a34a',
                    fontSize: 12, fontWeight: 700
                  }}>ATIVO</span>
                </div>
                <div style={{ backgroundColor: '#fce7f3', borderRadius: 20, height: 8 }}>
                  <div style={{
                    width: `${b.progress}%`, height: '100%', borderRadius: 20,
                    background: 'linear-gradient(90deg, #e11d48, #be123c)'
                  }} />
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 11, color: '#94a3b8' }}>
                  {Math.round(b.days * b.progress / 100)} de {b.days} dias utilizados
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pacotes */}
        {boostPackages.map((group) => (
          <div key={group.freq} style={{
            backgroundColor: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginBottom: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                padding: '6px 14px', borderRadius: 20,
                backgroundColor: group.bg, border: `1px solid ${group.border}`,
                color: group.color, fontWeight: 700, fontSize: 14
              }}>
                ⚡ {group.freq}
              </div>
              <span style={{ fontSize: 13, color: '#64748b' }}>{group.freqLabel}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }} className="pkg-grid">
              {group.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelected(pkg.id)}
                  style={{
                    padding: '14px 10px', borderRadius: 14, textAlign: 'center',
                    border: `2px solid ${selected === pkg.id ? group.color : pkg.popular ? group.border : '#f1f5f9'}`,
                    backgroundColor: selected === pkg.id ? group.bg : '#fafafa',
                    cursor: 'pointer', position: 'relative', transition: 'all 0.15s'
                  }}
                >
                  {pkg.popular && (
                    <div style={{
                      position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: group.color, color: '#fff',
                      fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap'
                    }}>Mais vendido</div>
                  )}
                  {selected === pkg.id && (
                    <CheckCircle size={16} color={group.color} style={{ position: 'absolute', top: 8, right: 8 }} />
                  )}
                  <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: '#1e293b' }}>{pkg.days}</p>
                  <p style={{ margin: '0 0 8px', fontSize: 11, color: '#64748b' }}>{pkg.days === 1 ? 'dia' : 'dias'}</p>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: group.color }}>
                    R$ {pkg.price}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 10, color: '#94a3b8' }}>
                    R$ {(pkg.price / pkg.days).toFixed(0)}/dia
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        {selected && (
          <div style={{
            position: 'sticky', bottom: 20,
            backgroundColor: '#fff', borderRadius: 20, padding: '16px 20px',
            border: '1px solid #fce7f3', boxShadow: '0 8px 32px rgba(225,29,72,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 12, flexWrap: 'wrap'
          }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Pacote selecionado</p>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#1e293b' }}>
                {boostPackages.flatMap(g => g.packages).find(p => p.id === selected)
                  ? (() => {
                    const pkg = boostPackages.flatMap(g => g.packages).find(p => p.id === selected)!;
                    const group = boostPackages.find(g => g.packages.includes(pkg))!;
                    return `${group.freq} — ${pkg.days} ${pkg.days === 1 ? 'dia' : 'dias'} — R$ ${pkg.price}`;
                  })()
                  : ''
                }
              </p>
            </div>
            <Link
              to={`/checkout?item=${selected}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15,
                boxShadow: '0 4px 12px rgba(225,29,72,0.3)'
              }}
            >
              <ShoppingCart size={18} />
              Comprar agora
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .how-grid { grid-template-columns: 1fr !important; }
          .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
