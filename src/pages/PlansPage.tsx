import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Star, Check, Zap, TrendingUp, Video, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';

// ── Pacotes de Subida ──────────────────────────────────────────────
const BOOST_GROUPS = [
  {
    id: 'freq6',
    label: '6 subidas / dia',
    sublabel: 'Sobe a cada 4 horas',
    color: '#10b981',
    colorLight: '#d1fae5',
    icon: '🟢',
    packages: [
      { days: 1,  price: 19,  bestSeller: false },
      { days: 3,  price: 29,  bestSeller: false },
      { days: 7,  price: 49,  bestSeller: true  },
      { days: 15, price: 79,  bestSeller: false },
    ],
  },
  {
    id: 'freq12',
    label: '12 subidas / dia',
    sublabel: 'Sobe a cada 2 horas',
    color: '#f59e0b',
    colorLight: '#fef3c7',
    icon: '🟡',
    packages: [
      { days: 1,  price: 29,  bestSeller: false },
      { days: 3,  price: 49,  bestSeller: false },
      { days: 7,  price: 79,  bestSeller: true  },
      { days: 15, price: 119, bestSeller: false },
    ],
  },
  {
    id: 'freq24',
    label: '24 subidas / dia',
    sublabel: 'Sobe a cada hora',
    color: '#e11d48',
    colorLight: '#ffe4e6',
    icon: '🔴',
    packages: [
      { days: 1,  price: 49,  bestSeller: false },
      { days: 3,  price: 79,  bestSeller: false },
      { days: 7,  price: 119, bestSeller: true  },
      { days: 15, price: 179, bestSeller: false },
    ],
  },
];

const FAQ = [
  {
    q: 'Como funciona a "subida"?',
    a: 'Cada subida leva seu perfil para o topo da listagem global por 1 hora. Durante esse período, você aparece antes de todas as outras anunciantes. Após 1 hora, outras anunciantes com subida ativas podem ocupar o topo também.',
  },
  {
    q: 'Posso ter mais de uma anunciante no topo ao mesmo tempo?',
    a: 'Sim. Múltiplas anunciantes podem estar com subida ativa simultaneamente. O topo da listagem exibe todas as anunciantes com subida ativa, ordenadas por horário de ativação.',
  },
  {
    q: 'O que é o complemento Multimídia?',
    a: 'Com o complemento Multimídia, seu anúncio exibe mais fotos e aceita vídeos de até 1 minuto. Apenas você pode aparecer nos vídeos. O custo é R$ 5 por dia, ativado junto com qualquer plano ou pacote de subida.',
  },
  {
    q: 'Posso cancelar a assinatura?',
    a: 'Sim. Você pode cancelar a qualquer momento. O perfil fica ativo até o final do período pago.',
  },
  {
    q: 'Como funciona a verificação?',
    a: 'Você envia uma selfie segurando um documento com seu nome. Nossa equipe analisa em até 24h e, se aprovado, você recebe o badge de verificada no perfil.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos cartão de crédito, débito, Pix e boleto bancário via Mercado Pago.',
  },
  {
    q: 'Preciso do plano mensal para comprar subidas?',
    a: 'Sim. O plano mensal (Básico ou Destaque) é necessário para manter seu perfil ativo. Os pacotes de subida são complementos para aumentar sua visibilidade.',
  },
];

export default function PlansPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [multimidiaDays, setMultimidiaDays] = useState(7);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #fff1f2 0%, #fff5f7 50%, #fce7f3 100%)',
        borderBottom: '1px solid #fecdd3',
        padding: '60px 50px 50px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 999,
          background: '#fff0f2', border: '1px solid #fecdd3',
          color: '#e11d48', fontSize: 12, fontWeight: 600, marginBottom: 20,
        }}>
          <Zap style={{ width: 13, height: 13 }} />
          Planos e Pacotes de Visibilidade
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1a0a10', marginBottom: 12, lineHeight: 1.2 }}>
          Apareça mais. Receba mais.
        </h1>
        <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
          Escolha seu plano mensal e turbine sua visibilidade com pacotes de subida ao topo da listagem.
        </p>
      </div>

      <div className="plans-inner" style={{ paddingTop: 60, paddingBottom: 60 }}>

        {/* ── PLANOS MENSAIS ──────────────────────────────── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff0f2', border: '1px solid #fecdd3',
              borderRadius: 999, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, color: '#e11d48',
              textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
            }}>
              <Star style={{ width: 11, height: 11 }} /> Plano Mensal
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a0a10', marginBottom: 8 }}>
              Mantenha seu perfil sempre ativo
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 14 }}>
              Necessário para anunciar na plataforma
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 680, margin: '0 auto' }}>

            {/* Plano Básico */}
            <div style={{
              background: '#fff', borderRadius: 20, overflow: 'hidden',
              border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                padding: '28px 24px',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <Star style={{ width: 20, height: 20, color: '#fff' }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Básico</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Perfil ativo na plataforma</p>
                <div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>R$</span>
                  <span style={{ fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 4px' }}>49</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>/mês</span>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                {[
                  'Perfil completo ativo',
                  'Até 5 fotos no perfil',
                  'Badge de verificada',
                  'Estatísticas básicas',
                  'Listagem normal',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 999,
                      background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Check style={{ width: 10, height: 10, color: '#059669' }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#374151' }}>{f}</span>
                  </div>
                ))}
                <Link to="/checkout?item=basic" style={{
                  display: 'block', textAlign: 'center', marginTop: 20,
                  padding: '12px', borderRadius: 12,
                  background: '#f1f5f9', color: '#1e293b',
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}>
                  Assinar Básico
                </Link>
              </div>
            </div>

            {/* Plano Destaque */}
            <div style={{
              background: '#fff', borderRadius: 20, overflow: 'hidden',
              border: '2px solid #e11d48', boxShadow: '0 8px 32px rgba(225,29,72,0.15)',
              position: 'relative',
            }}>
              <div style={{
                background: '#e11d48', color: '#fff',
                fontSize: 11, fontWeight: 700, textAlign: 'center',
                padding: '6px', textTransform: 'uppercase', letterSpacing: 1,
              }}>
                ⭐ Mais popular
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                padding: '28px 24px',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <Crown style={{ width: 20, height: 20, color: '#fff' }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Destaque</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Máxima visibilidade</p>
                <div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>R$</span>
                  <span style={{ fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 4px' }}>99</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>/mês</span>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                {[
                  'Tudo do plano Básico',
                  'Até 8 fotos no perfil',
                  'Badge VIP Destaque',
                  'Prioridade na listagem',
                  'Estatísticas completas',
                  'Suporte prioritário',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 999,
                      background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Check style={{ width: 10, height: 10, color: '#e11d48' }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#374151' }}>{f}</span>
                  </div>
                ))}
                <Link to="/checkout?item=featured" style={{
                  display: 'block', textAlign: 'center', marginTop: 20,
                  padding: '12px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(225,29,72,0.35)',
                }}>
                  Assinar Destaque
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── COMO FUNCIONA A SUBIDA ─────────────────────── */}
        <div style={{
          background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9',
          padding: '40px', marginBottom: 80,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff7ed', border: '1px solid #fed7aa',
              borderRadius: 999, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, color: '#ea580c',
              textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
            }}>
              <TrendingUp style={{ width: 11, height: 11 }} /> Como funciona
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a0a10', marginBottom: 8 }}>
              🚀 O que é uma "Subida"?
            </h2>
            <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 520, margin: '0 auto' }}>
              Cada subida leva seu perfil para o <strong>1º lugar</strong> da listagem global por <strong>1 hora</strong>, gerando muito mais visitas e contatos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: <TrendingUp style={{ width: 22, height: 22, color: '#e11d48' }} />, title: 'Topo garantido', desc: 'Seu perfil aparece antes de todos durante 1 hora' },
              { icon: <Users style={{ width: 22, height: 22, color: '#e11d48' }} />, title: 'Visibilidade global', desc: 'Aparece no topo para todas as cidades da plataforma' },
              { icon: <Clock style={{ width: 22, height: 22, color: '#e11d48' }} />, title: 'Automático', desc: 'As subidas são distribuídas automaticamente ao longo do dia' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#fff5f7', borderRadius: 16, padding: '24px 20px', textAlign: 'center',
                border: '1px solid #fecdd3',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: '#fff', border: '1px solid #fecdd3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                  boxShadow: '0 2px 8px rgba(225,29,72,0.1)',
                }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1a0a10', marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PACOTES DE SUBIDA ──────────────────────────── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff0f2', border: '1px solid #fecdd3',
              borderRadius: 999, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, color: '#e11d48',
              textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
            }}>
              <Zap style={{ width: 11, height: 11 }} /> Pacotes de Subida
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a0a10', marginBottom: 8 }}>
              Escolha sua frequência de subidas
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 14 }}>
              Quanto mais subidas, mais vezes você aparece no topo por dia
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {BOOST_GROUPS.map((group) => (
              <div key={group.id} style={{
                background: '#fff', borderRadius: 20,
                border: `1.5px solid ${group.colorLight}`,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                {/* Header do grupo */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '18px 28px',
                  background: group.colorLight,
                  borderBottom: `1px solid ${group.colorLight}`,
                }}>
                  <span style={{ fontSize: 20 }}>{group.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1a0a10', marginBottom: 2 }}>
                      {group.label}
                    </h3>
                    <p style={{ fontSize: 12, color: '#6b7280' }}>{group.sublabel}</p>
                  </div>
                </div>

                {/* Cards dos pacotes */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 0,
                }}>
                  {group.packages.map((pkg, i) => (
                    <div key={i} style={{
                      padding: '24px 20px',
                      borderRight: i < 3 ? '1px solid #f1f5f9' : 'none',
                      position: 'relative',
                      textAlign: 'center',
                      background: pkg.bestSeller ? `${group.colorLight}80` : '#fff',
                    }}>
                      {pkg.bestSeller && (
                        <div style={{
                          position: 'absolute', top: 0, left: '50%',
                          transform: 'translateX(-50%)',
                          background: group.color, color: '#fff',
                          fontSize: 9, fontWeight: 700,
                          padding: '3px 10px', borderRadius: '0 0 8px 8px',
                          textTransform: 'uppercase', letterSpacing: 0.5,
                          whiteSpace: 'nowrap',
                        }}>
                          Mais vendido
                        </div>
                      )}
                      <div style={{
                        fontSize: 28, fontWeight: 900, color: '#1a0a10',
                        marginBottom: 2, marginTop: pkg.bestSeller ? 12 : 0,
                      }}>
                        {pkg.days}
                      </div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 14 }}>
                        {pkg.days === 1 ? 'dia' : 'dias'}
                      </div>
                      <div style={{
                        fontSize: 22, fontWeight: 900,
                        color: group.color, marginBottom: 4,
                      }}>
                        R$ {pkg.price}
                      </div>
                      <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 16 }}>
                        R$ {(pkg.price / pkg.days).toFixed(2).replace('.', ',')}/dia
                      </div>
                      <Link to={`/checkout?item=boost_${group.id.replace('freq','')}_${pkg.days}d`} style={{
                        display: 'block', padding: '9px 12px',
                        borderRadius: 10, textDecoration: 'none',
                        fontSize: 12, fontWeight: 700,
                        background: pkg.bestSeller ? group.color : 'transparent',
                        color: pkg.bestSeller ? '#fff' : group.color,
                        border: `1.5px solid ${group.color}`,
                        transition: 'all 0.2s',
                      }}>
                        Contratar
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMPLEMENTO MULTIMÍDIA ─────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          borderRadius: 24, padding: '44px 44px',
          marginBottom: 80, position: 'relative', overflow: 'hidden',
        }}>
          {/* Decoração */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(139,92,246,0.2)',
          }} />
          <div style={{
            position: 'absolute', bottom: -30, left: 100,
            width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(99,102,241,0.15)',
          }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: 999, padding: '4px 14px',
                fontSize: 11, fontWeight: 700, color: '#c4b5fd',
                textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
              }}>
                <Video style={{ width: 11, height: 11 }} /> Complemento
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 10 }}>
                📹 Multimídia
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                Mostre mais de você! Com o complemento Multimídia, seu anúncio exibe <strong style={{ color: '#fff' }}>mais fotos</strong> e aceita <strong style={{ color: '#fff' }}>vídeos de até 1 minuto</strong>.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {[
                  '📸 Galeria ampliada com mais fotos',
                  '🎬 Vídeos de até 1 minuto',
                  '👤 Apenas você no vídeo',
                  '▶️ Player direto no card da listagem',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#a78bfa', flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculadora */}
            <div style={{
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
              borderRadius: 20, border: '1px solid rgba(255,255,255,0.15)',
              padding: '28px', minWidth: 240, textAlign: 'center',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
                R$ 5 / dia
              </div>
              <div style={{ fontSize: 13, color: '#c4b5fd', marginBottom: 20 }}>
                Calcule seu período:
              </div>

              {/* Seletor de dias */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {[7, 15, 30].map(d => (
                  <button key={d} onClick={() => setMultimidiaDays(d)} style={{
                    padding: '8px 16px', borderRadius: 10,
                    border: multimidiaDays === d ? '1.5px solid #a78bfa' : '1.5px solid rgba(255,255,255,0.15)',
                    background: multimidiaDays === d ? 'rgba(139,92,246,0.3)' : 'transparent',
                    color: multimidiaDays === d ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    {d} dias
                  </button>
                ))}
              </div>

              <div style={{
                background: 'rgba(139,92,246,0.3)', borderRadius: 12,
                padding: '14px', marginBottom: 16,
              }}>
                <div style={{ fontSize: 11, color: '#c4b5fd', marginBottom: 4 }}>Total</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>
                  R$ {(5 * multimidiaDays).toFixed(2).replace('.', ',')}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  por {multimidiaDays} dias
                </div>
              </div>

              <Link to={`/checkout?item=media_${multimidiaDays}d`} style={{
                display: 'block', padding: '11px',
                borderRadius: 12, textDecoration: 'none',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff', fontWeight: 700, fontSize: 13,
                boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
              }}>
                Adicionar Multimídia
              </Link>
            </div>
          </div>
        </div>

        {/* ── TABELA COMPARATIVA ─────────────────────────── */}
        <div style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid #f1f5f9',
          overflow: 'hidden', marginBottom: 80,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <div style={{ padding: '28px 32px', borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a0a10' }}>
              Comparativo de planos
            </h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#fafafa' }}>
                  <th style={{ padding: '14px 24px', textAlign: 'left', color: '#6b7280', fontWeight: 600, borderBottom: '1px solid #f1f5f9' }}>
                    Recurso
                  </th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', color: '#1e293b', fontWeight: 700, borderBottom: '1px solid #f1f5f9' }}>
                    Básico
                  </th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', color: '#e11d48', fontWeight: 700, borderBottom: '1px solid #f1f5f9' }}>
                    Destaque ⭐
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Perfil ativo', '✅', '✅'],
                  ['Fotos no perfil', '5 fotos', '8 fotos'],
                  ['Badge de verificada', '✅', '✅'],
                  ['Badge VIP Destaque', '—', '✅'],
                  ['Prioridade na listagem', '—', '✅'],
                  ['Estatísticas', 'Básicas', 'Completas'],
                  ['Suporte', 'Email', 'Prioritário'],
                  ['Pacotes de subida', '✅ Disponível', '✅ Disponível'],
                  ['Complemento Multimídia', '✅ + R$ 5/dia', '✅ + R$ 5/dia'],
                ].map(([feature, basic, dest], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                    <td style={{ padding: '12px 24px', color: '#374151', fontWeight: 500 }}>{feature}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', color: basic === '—' ? '#d1d5db' : '#374151' }}>{basic}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', color: dest === '—' ? '#d1d5db' : '#e11d48', fontWeight: dest !== '—' && dest !== '✅' ? 600 : 400 }}>{dest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ ────────────────────────────────────────── */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a0a10', marginBottom: 8 }}>
              Dúvidas frequentes
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 14 }}>Tudo que você precisa saber antes de anunciar</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14,
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
                boxShadow: openFaq === i ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1a0a10' }}>{item.q}</span>
                  {openFaq === i
                    ? <ChevronUp style={{ width: 16, height: 16, color: '#e11d48', flexShrink: 0 }} />
                    : <ChevronDown style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} />
                  }
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 18px', fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #fff1f2, #fce7f3)',
          border: '1px solid #fecdd3', borderRadius: 20,
          padding: '40px', textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', marginBottom: 8 }}>
            Pronta para começar?
          </h3>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
            Crie seu perfil agora e comece a receber contatos hoje mesmo.
          </p>
          <Link to="/anunciar" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 14,
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#fff', fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(225,29,72,0.3)',
          }}>
            <Zap style={{ width: 16, height: 16 }} />
            Criar meu anúncio
          </Link>
          <div style={{ marginTop: 20, fontSize: 12, color: '#9ca3af' }}>
            Dúvidas?{' '}
            <a href="mailto:contato@kryska.com.br" style={{ color: '#e11d48', textDecoration: 'none', fontWeight: 600 }}>
              contato@kryska.com.br
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
