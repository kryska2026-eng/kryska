import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  CreditCard, Smartphone, FileText, Shield, CheckCircle2,
  AlertCircle, Clock, ChevronRight, Lock, ArrowLeft,
  Zap, Star, TrendingUp
} from 'lucide-react'
import { PLANS, BOOST_PACKS, MEDIA_PACKS, PlanItem, useMercadoPago } from '../hooks/useMercadoPago'
import { useAuth } from '../contexts/AuthContext'
import logoKryska from '../assets/kryskalogo.png'

// ============================================
// Componente de status de pagamento
// ============================================
function PaymentStatus({ status }: { status: 'approved' | 'pending' | 'rejected' | 'cancelled' }) {
  const config = {
    approved: {
      icon: <CheckCircle2 size={64} />,
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      title: 'Pagamento aprovado!',
      subtitle: 'Seu plano foi ativado com sucesso.',
      message: 'Em breve você receberá um e-mail de confirmação. Seu perfil já está ativo na plataforma.',
      cta: 'Ir para meu perfil'
    },
    pending: {
      icon: <Clock size={64} />,
      color: '#d97706',
      bg: '#fffbeb',
      border: '#fde68a',
      title: 'Pagamento em processamento',
      subtitle: 'Seu pagamento está sendo analisado.',
      message: 'Pagamentos via boleto podem levar até 3 dias úteis. Você será notificado por e-mail assim que confirmado.',
      cta: 'Voltar ao início'
    },
    rejected: {
      icon: <AlertCircle size={64} />,
      color: '#dc2626',
      bg: '#fef2f2',
      border: '#fecaca',
      title: 'Pagamento não aprovado',
      subtitle: 'Houve um problema com seu pagamento.',
      message: 'Verifique os dados do cartão ou tente outro método de pagamento.',
      cta: 'Tentar novamente'
    },
    cancelled: {
      icon: <AlertCircle size={64} />,
      color: '#6b7280',
      bg: '#f9fafb',
      border: '#e5e7eb',
      title: 'Pagamento cancelado',
      subtitle: 'O pagamento foi cancelado.',
      message: 'Você pode tentar novamente a qualquer momento.',
      cta: 'Tentar novamente'
    }
  }

  const c = config[status]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafafa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 24,
        padding: 'clamp(32px, 8vw, 64px) clamp(24px, 5vw, 48px)',
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{ color: c.color, marginBottom: 24 }}>{c.icon}</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>{c.title}</h1>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 16 }}>{c.subtitle}</p>
        <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 40, lineHeight: 1.6 }}>{c.message}</p>
        <a href="/" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 15,
          textDecoration: 'none'
        }}>{c.cta}</a>
      </div>
    </div>
  )
}

// ============================================
// Componente principal
// ============================================
export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState<PlanItem | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<'approved' | 'pending' | 'rejected' | 'cancelled' | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('pix')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'select' | 'payment'>('select')
  const { user } = useAuth()
  const { createPreference, getCheckoutUrl, error: mpError } = useMercadoPago()

  // Lê parâmetros da URL (retorno do MP)
  useEffect(() => {
    const status = searchParams.get('status') as 'approved' | 'pending' | 'rejected' | 'cancelled'
    const itemId = searchParams.get('item')

    if (status) {
      setPaymentStatus(status)
      return
    }

    if (itemId) {
      const allItems = [...PLANS, ...BOOST_PACKS, ...MEDIA_PACKS]
      const found = allItems.find(i => i.id === itemId)
      if (found) {
        setSelectedItem(found)
        setStep('payment')
      }
    }
  }, [searchParams])

  // Mostra tela de status se veio do MP
  if (paymentStatus) return <PaymentStatus status={paymentStatus} />

  const formatCurrency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const handlePay = async () => {
    if (!selectedItem) return

    // Exigir login para associar o pagamento a um usuário
    if (!user) {
      navigate('/entrar')
      return
    }

    setLoading(true)

    const pref = await createPreference(selectedItem, user.email, user.id)

    if (pref) {
      const url = getCheckoutUrl(pref)
      // Log para ajudar a depurar em produção
      console.log('Redirecionando para Mercado Pago:', url)
      window.location.href = url
    } else {
      setLoading(false)
    }
  }

  const getItemIcon = (item: PlanItem) => {
    if (item.type === 'plan') return item.id === 'featured' ? <Star size={20} /> : <Shield size={20} />
    if (item.type === 'boost') return <TrendingUp size={20} />
    return <Zap size={20} />
  }

  const getItemColor = (item: PlanItem) => {
    if (item.type === 'plan') return item.id === 'featured' ? '#e11d48' : '#6366f1'
    if (item.type === 'boost') return '#f59e0b'
    return '#8b5cf6'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>

      {/* Navbar simples */}
      <nav className="checkout-nav" style={{
        background: '#fff',
        borderBottom: '1px solid #f1f5f9',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxSizing: 'border-box'
      }}>
        <img src={logoKryska} alt="Kryska" style={{ height: 36, width: 'auto' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
          <Lock size={14} />
          Pagamento 100% seguro
        </div>
      </nav>

      <div className="checkout-inner" style={{ paddingTop: 48, paddingBottom: 48 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, color: '#9ca3af', fontSize: 13 }}>
          <span style={{ cursor: 'pointer', color: '#f43f5e' }} onClick={() => navigate('/')}>Início</span>
          <ChevronRight size={14} />
          <span style={{ cursor: 'pointer', color: '#f43f5e' }} onClick={() => navigate('/planos')}>Planos</span>
          <ChevronRight size={14} />
          <span style={{ color: '#6b7280' }}>Checkout</span>
        </div>

        {/* Título */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1f2937', marginBottom: 8 }}>
            {step === 'select' ? 'Escolha o que deseja contratar' : 'Finalizar pagamento'}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 15 }}>
            {step === 'select'
              ? 'Selecione um plano ou pacote para continuar'
              : 'Escolha a forma de pagamento e confirme seu pedido'}
          </p>
          {/* Alerta de desconto de lançamento */}
          {step === 'select' && (
            <div style={{
              marginTop: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 999,
              background: '#fef9c3',
              border: '1px solid #facc15',
              fontSize: 12,
              color: '#854d0e',
              fontWeight: 600,
            }}>
              <Clock size={14} />
              Todos os planos estão com <span style={{ fontWeight: 800 }}>50% de desconto</span> no mês de lançamento.
            </div>
          )}
        </div>

        {/* Step: Selecionar item */}
        {step === 'select' && (
          <div>
            {/* Planos Básico e VIP */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={18} style={{ color: '#f43f5e' }} /> Planos Básico e VIP
              </h2>
              {/* Básico */}
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#4b5563', marginBottom: 10 }}>Básico</h3>
              <div className="checkout-plans-grid" style={{ marginBottom: 24 }}>
                {PLANS.filter(p => p.id.startsWith('basic')).map(plan => {
                  const original = plan.amount * 2
                  const periodLabel =
                    plan.id.includes('_week')
                      ? ' / semana'
                      : plan.id.includes('_quinzena')
                      ? ' / 15 dias'
                      : ' / mês'

                  const isFeaturedMonthly = false

                  return (
                    <div
                      key={plan.id}
                      onClick={() => { setSelectedItem(plan); setStep('payment') }}
                      style={{
                        background: '#fff',
                        borderRadius: 20,
                        border: `2px solid ${isFeaturedMonthly ? '#fecdd3' : '#e5e7eb'}`,
                        padding: '28px 32px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#f43f5e'
                        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(244,63,94,0.15)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = isFeaturedMonthly ? '#fecdd3' : '#e5e7eb'
                        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                      }}
                    >
                      {isFeaturedMonthly && (
                        <div style={{
                          position: 'absolute', top: 16, right: 16,
                          background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                          color: '#fff', fontSize: 11, fontWeight: 700,
                          padding: '4px 10px', borderRadius: 20
                        }}>Mais popular</div>
                      )}
                      <div style={{ color: getItemColor(plan), marginBottom: 12 }}>{getItemIcon(plan)}</div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>{plan.title}</h3>
                      <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>{plan.description}</p>
                      {/* Preço com original riscado e 50% OFF */}
                      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 13,
                          color: '#9ca3af',
                          textDecoration: 'line-through'
                        }}>
                          {formatCurrency(original)}
                        </span>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#b45309',
                          background: '#fef9c3',
                          borderRadius: 999,
                          padding: '2px 8px'
                        }}>
                          50% OFF lançamento
                        </span>
                      </div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: '#f43f5e' }}>
                        {formatCurrency(plan.amount)}
                        <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 400 }}>{periodLabel}</span>
                      </div>
                      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: '#f43f5e', fontWeight: 600, fontSize: 14 }}>
                        Contratar agora <ChevronRight size={16} />
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* VIP */}
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#4b5563', marginBottom: 10, marginTop: 8 }}>VIP</h3>
              <div className="checkout-plans-grid">
                {PLANS.filter(p => p.id.startsWith('featured')).map(plan => {
                  const original = plan.amount * 2
                  const periodLabel =
                    plan.id.includes('_week')
                      ? ' / semana'
                      : plan.id.includes('_quinzena')
                      ? ' / 15 dias'
                      : ' / mês'

                  const isFeaturedMonthly = plan.id === 'featured'

                  return (
                    <div
                      key={plan.id}
                      onClick={() => { setSelectedItem(plan); setStep('payment') }}
                      style={{
                        background: '#fff',
                        borderRadius: 20,
                        border: `2px solid ${isFeaturedMonthly ? '#fecdd3' : '#e5e7eb'}`,
                        padding: '28px 32px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#f43f5e'
                        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(244,63,94,0.15)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = isFeaturedMonthly ? '#fecdd3' : '#e5e7eb'
                        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                      }}
                    >
                      {isFeaturedMonthly && (
                        <div style={{
                          position: 'absolute', top: 16, right: 16,
                          background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                          color: '#fff', fontSize: 11, fontWeight: 700,
                          padding: '4px 10px', borderRadius: 20
                        }}>Mais popular</div>
                      )}
                      <div style={{ color: getItemColor(plan), marginBottom: 12 }}>{getItemIcon(plan)}</div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>{plan.title}</h3>
                      <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>{plan.description}</p>
                      {/* Preço com original riscado e 50% OFF */}
                      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 13,
                          color: '#9ca3af',
                          textDecoration: 'line-through'
                        }}>
                          {formatCurrency(original)}
                        </span>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#b45309',
                          background: '#fef9c3',
                          borderRadius: 999,
                          padding: '2px 8px'
                        }}>
                          50% OFF lançamento
                        </span>
                      </div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: '#f43f5e' }}>
                        {formatCurrency(plan.amount)}
                        <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 400 }}>{periodLabel}</span>
                      </div>
                      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: '#f43f5e', fontWeight: 600, fontSize: 14 }}>
                        Contratar agora <ChevronRight size={16} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pacotes de subida */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={18} style={{ color: '#f59e0b' }} /> Pacotes de Subida
              </h2>

              {[
                { freq: 6, label: '6 subidas/dia', color: '#16a34a', packs: BOOST_PACKS.filter(b => b.id.startsWith('boost_6')) },
                { freq: 12, label: '12 subidas/dia', color: '#f59e0b', packs: BOOST_PACKS.filter(b => b.id.startsWith('boost_12')) },
                { freq: 24, label: '24 subidas/dia', color: '#e11d48', packs: BOOST_PACKS.filter(b => b.id.startsWith('boost_24')) },
              ].map(group => (
                <div key={group.freq} style={{ marginBottom: 24 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: group.color + '15', color: group.color,
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    marginBottom: 12
                  }}>
                    <TrendingUp size={12} /> {group.label}
                  </div>
                  <div className="checkout-boost-grid">
                    {group.packs.map(pack => {
                      const days = pack.id.includes('_1d') ? '1 dia' : pack.id.includes('_3d') ? '3 dias' : pack.id.includes('_7d') ? '7 dias' : '15 dias'
                      const isBest = pack.id.includes('_7d')
                      return (
                        <div
                          key={pack.id}
                          onClick={() => { setSelectedItem(pack); setStep('payment') }}
                          style={{
                            background: '#fff',
                            borderRadius: 16,
                            border: `2px solid ${isBest ? group.color + '40' : '#e5e7eb'}`,
                            padding: '20px 16px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s',
                            position: 'relative'
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = group.color
                            ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = isBest ? group.color + '40' : '#e5e7eb'
                            ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                          }}
                        >
                          {isBest && (
                            <div style={{
                              position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                              background: group.color, color: '#fff',
                              fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                              whiteSpace: 'nowrap'
                            }}>Mais vendido</div>
                          )}
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>{days}</div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: '#1f2937' }}>{formatCurrency(pack.amount)}</div>
                          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                            {formatCurrency(pack.amount / parseInt(days))}/dia
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Pacotes Multimídia */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={18} style={{ color: '#8b5cf6' }} /> Complemento Multimídia
              </h2>
              <div className="checkout-media-grid">
                {MEDIA_PACKS.map(pack => {
                  const days = pack.id.includes('7d') ? 7 : pack.id.includes('15d') ? 15 : 30
                  return (
                    <div
                      key={pack.id}
                      onClick={() => { setSelectedItem(pack); setStep('payment') }}
                      style={{
                        background: '#fff',
                        borderRadius: 16,
                        border: '2px solid #ede9fe',
                        padding: '24px 20px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#8b5cf6'
                        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#ede9fe'
                        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                      }}
                    >
                      <Zap size={24} style={{ color: '#8b5cf6', marginBottom: 12 }} />
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>{days} dias</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: '#8b5cf6' }}>{formatCurrency(pack.amount)}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>R$ 5,00/dia</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step: Pagamento */}
        {step === 'payment' && selectedItem && (
          <div className="checkout-payment-grid">

            {/* Coluna esquerda — métodos */}
            <div>
              <button
                onClick={() => setStep('select')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'none', border: 'none', color: '#f43f5e',
                  cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  marginBottom: 32, padding: 0
                }}
              >
                <ArrowLeft size={16} /> Voltar e escolher outro
              </button>

              {/* Método de pagamento */}
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', padding: 32, marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 24 }}>Forma de pagamento</h2>

                <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
                  {[
                    { id: 'pix', label: 'PIX', icon: <Smartphone size={18} />, desc: 'Aprovação imediata' },
                    { id: 'card', label: 'Cartão', icon: <CreditCard size={18} />, desc: 'Crédito ou débito' },
                    { id: 'boleto', label: 'Boleto', icon: <FileText size={18} />, desc: 'Até 3 dias úteis' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as typeof paymentMethod)}
                      style={{
                        flex: 1, padding: '14px 12px',
                        borderRadius: 12,
                        border: `2px solid ${paymentMethod === m.id ? '#f43f5e' : '#e5e7eb'}`,
                        background: paymentMethod === m.id ? '#fff5f7' : '#fff',
                        cursor: 'pointer', transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ color: paymentMethod === m.id ? '#f43f5e' : '#9ca3af', marginBottom: 4 }}>{m.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: paymentMethod === m.id ? '#f43f5e' : '#374151' }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{m.desc}</div>
                    </button>
                  ))}
                </div>

                {/* PIX */}
                {paymentMethod === 'pix' && (
                  <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                    <div style={{
                      width: 160, height: 160, background: '#f3f4f6',
                      borderRadius: 12, margin: '0 auto 20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px dashed #d1d5db'
                    }}>
                      <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                        <Smartphone size={32} style={{ marginBottom: 8 }} />
                        <div style={{ fontSize: 11 }}>QR Code gerado<br />após confirmação</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                      Após clicar em <strong>"Pagar agora"</strong>, você será redirecionado para o<br />
                      Mercado Pago para gerar o QR Code PIX.
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: '#f0fdf4', color: '#16a34a',
                      padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      marginTop: 16
                    }}>
                      <CheckCircle2 size={14} /> Aprovação imediata após pagamento
                    </div>
                  </div>
                )}

                {/* Cartão */}
                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Número do cartão</label>
                      <input
                        placeholder="0000 0000 0000 0000"
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: 10,
                          border: '1px solid #e5e7eb', fontSize: 15,
                          outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Nome no cartão</label>
                      <input
                        placeholder="Como aparece no cartão"
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: 10,
                          border: '1px solid #e5e7eb', fontSize: 15,
                          outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Validade</label>
                        <input
                          placeholder="MM/AA"
                          style={{
                            width: '100%', padding: '12px 16px', borderRadius: 10,
                            border: '1px solid #e5e7eb', fontSize: 15,
                            outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>CVV</label>
                        <input
                          placeholder="000"
                          style={{
                            width: '100%', padding: '12px 16px', borderRadius: 10,
                            border: '1px solid #e5e7eb', fontSize: 15,
                            outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Parcelamento</label>
                      <select style={{
                        width: '100%', padding: '12px 16px', borderRadius: 10,
                        border: '1px solid #e5e7eb', fontSize: 14,
                        outline: 'none', background: '#fff', boxSizing: 'border-box'
                      }}>
                        <option>1x de {formatCurrency(selectedItem.amount)} sem juros</option>
                        <option>2x de {formatCurrency(selectedItem.amount / 2)} sem juros</option>
                        <option>3x de {formatCurrency(selectedItem.amount / 3)} sem juros</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Boleto */}
                {paymentMethod === 'boleto' && (
                  <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                    <FileText size={48} style={{ color: '#9ca3af', marginBottom: 16 }} />
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.8, marginBottom: 16 }}>
                      O boleto será gerado após a confirmação.<br />
                      O prazo de vencimento é de <strong>3 dias úteis</strong>.<br />
                      Após o pagamento, a aprovação ocorre em até <strong>3 dias úteis</strong>.
                    </p>
                    <div style={{
                      background: '#fffbeb', border: '1px solid #fde68a',
                      borderRadius: 10, padding: '12px 16px', fontSize: 12, color: '#92400e'
                    }}>
                      ⚠️ Seu perfil só será publicado após a confirmação do pagamento
                    </div>
                  </div>
                )}
              </div>

              {/* Segurança */}
              <div style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 12, padding: '14px 20px',
                display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#166534'
              }}>
                <Lock size={16} />
                <span>Pagamento processado com segurança pelo <strong>Mercado Pago</strong>. Seus dados estão protegidos.</span>
              </div>
            </div>

            {/* Coluna direita — resumo */}
            <div style={{ position: 'sticky', top: 80 }}>
              <div style={{
                background: '#fff', borderRadius: 20,
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
              }}>
                {/* Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #fff5f7, #ffe4e6)',
                  padding: '24px', borderBottom: '1px solid #fecdd3'
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Resumo do pedido
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: getItemColor(selectedItem) + '20',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: getItemColor(selectedItem)
                    }}>
                      {getItemIcon(selectedItem)}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{selectedItem.title}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{selectedItem.description}</div>
                    </div>
                  </div>
                </div>

                {/* Valores */}
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#6b7280' }}>
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedItem.amount)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#6b7280' }}>
                    <span>Taxa de processamento</span>
                    <span style={{ color: '#16a34a' }}>Grátis</span>
                  </div>
                  <div style={{
                    borderTop: '1px solid #f1f5f9', paddingTop: 16, marginTop: 8,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#1f2937' }}>Total</span>
                    <span style={{ fontSize: 28, fontWeight: 800, color: '#f43f5e' }}>{formatCurrency(selectedItem.amount)}</span>
                  </div>

                  {selectedItem.type === 'plan' && (
                    <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'right', marginTop: 4 }}>
                      cobrado mensalmente
                    </div>
                  )}

                  {/* Botão pagar */}
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    style={{
                      width: '100%', marginTop: 24,
                      padding: '16px',
                      background: loading ? '#e5e7eb' : 'linear-gradient(135deg, #009ee3, #007eb5)',
                      color: '#fff',
                      border: 'none', borderRadius: 12,
                      fontSize: 16, fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      transition: 'all 0.2s',
                      boxShadow: loading ? 'none' : '0 4px 20px rgba(0,158,227,0.35)'
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="spin" style={{ width: 18, height: 18, border: '2px solid #fff4', borderTop: '2px solid #fff', borderRadius: '50%' }} />
                        Processando...
                      </>
                    ) : (
                      <>
                        <img src="https://www.mercadopago.com.br/favicon.ico" alt="" style={{ width: 18, height: 18, borderRadius: 4 }} />
                        Pagar com Mercado Pago
                      </>
                    )}
                  </button>

                  {mpError && (
                    <div style={{
                      marginTop: 12,
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      fontSize: 12,
                      color: '#b91c1c'
                    }}>
                      {mpError}
                    </div>
                  )}

                  {/* Métodos aceitos */}
                  <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>Formas de pagamento aceitas</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {['Visa', 'Master', 'Elo', 'Pix', 'Boleto'].map(m => (
                        <span key={m} style={{
                          padding: '3px 8px', background: '#f9fafb', border: '1px solid #e5e7eb',
                          borderRadius: 6, fontSize: 10, color: '#6b7280', fontWeight: 600
                        }}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Garantia */}
              <div style={{
                marginTop: 16, padding: '16px 20px',
                background: '#fff', borderRadius: 16,
                border: '1px solid #f1f5f9',
                display: 'flex', alignItems: 'flex-start', gap: 12
              }}>
                <Shield size={18} style={{ color: '#f43f5e', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>Garantia de 7 dias</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>
                    Se não ficar satisfeita, devolvemos seu dinheiro em até 7 dias. Sem perguntas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
