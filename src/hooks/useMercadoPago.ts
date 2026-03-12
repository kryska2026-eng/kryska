import { useState } from 'react'

// ============================================
// Tipos
// ============================================
export interface MPPreference {
  id: string
  init_point: string
  sandbox_init_point: string
}

export interface MPPaymentResult {
  status: 'approved' | 'pending' | 'rejected' | 'cancelled'
  payment_id?: string
  preference_id?: string
  plan?: string
  amount?: number
}

export interface PlanItem {
  id: string
  title: string
  description: string
  amount: number
  type: 'plan' | 'boost' | 'media'
}

// ============================================
// Planos disponíveis
// ============================================
export const PLANS: PlanItem[] = [
  {
    id: 'basic',
    title: 'Plano Básico',
    description: 'Anúncio mensal na Kryska',
    amount: 49.00,
    type: 'plan'
  },
  {
    id: 'featured',
    title: 'Plano Destaque',
    description: 'Anúncio em destaque mensal na Kryska',
    amount: 99.00,
    type: 'plan'
  }
]

// ============================================
// Pacotes de subida
// ============================================
export const BOOST_PACKS: PlanItem[] = [
  // 6 subidas/dia
  { id: 'boost_6_1d', title: '6 subidas/dia — 1 dia', description: '6 subidas por dia durante 1 dia', amount: 19.00, type: 'boost' },
  { id: 'boost_6_3d', title: '6 subidas/dia — 3 dias', description: '6 subidas por dia durante 3 dias', amount: 29.00, type: 'boost' },
  { id: 'boost_6_7d', title: '6 subidas/dia — 7 dias', description: '6 subidas por dia durante 7 dias', amount: 49.00, type: 'boost' },
  { id: 'boost_6_15d', title: '6 subidas/dia — 15 dias', description: '6 subidas por dia durante 15 dias', amount: 79.00, type: 'boost' },
  // 12 subidas/dia
  { id: 'boost_12_1d', title: '12 subidas/dia — 1 dia', description: '12 subidas por dia durante 1 dia', amount: 29.00, type: 'boost' },
  { id: 'boost_12_3d', title: '12 subidas/dia — 3 dias', description: '12 subidas por dia durante 3 dias', amount: 49.00, type: 'boost' },
  { id: 'boost_12_7d', title: '12 subidas/dia — 7 dias', description: '12 subidas por dia durante 7 dias', amount: 79.00, type: 'boost' },
  { id: 'boost_12_15d', title: '12 subidas/dia — 15 dias', description: '12 subidas por dia durante 15 dias', amount: 119.00, type: 'boost' },
  // 24 subidas/dia
  { id: 'boost_24_1d', title: '24 subidas/dia — 1 dia', description: '24 subidas por dia durante 1 dia', amount: 49.00, type: 'boost' },
  { id: 'boost_24_3d', title: '24 subidas/dia — 3 dias', description: '24 subidas por dia durante 3 dias', amount: 79.00, type: 'boost' },
  { id: 'boost_24_7d', title: '24 subidas/dia — 7 dias', description: '24 subidas por dia durante 7 dias', amount: 119.00, type: 'boost' },
  { id: 'boost_24_15d', title: '24 subidas/dia — 15 dias', description: '24 subidas por dia durante 15 dias', amount: 179.00, type: 'boost' },
]

// ============================================
// Pacote Multimídia (R$5/dia)
// ============================================
export const MEDIA_PACKS: PlanItem[] = [
  { id: 'media_7d', title: 'Multimídia — 7 dias', description: 'Mais fotos e vídeos no anúncio por 7 dias', amount: 35.00, type: 'media' },
  { id: 'media_15d', title: 'Multimídia — 15 dias', description: 'Mais fotos e vídeos no anúncio por 15 dias', amount: 75.00, type: 'media' },
  { id: 'media_30d', title: 'Multimídia — 30 dias', description: 'Mais fotos e vídeos no anúncio por 30 dias', amount: 150.00, type: 'media' },
]

// ============================================
// Hook principal
// ============================================
export function useMercadoPago() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preference, setPreference] = useState<MPPreference | null>(null)

  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-public-key'
  const isSandbox = import.meta.env.VITE_MP_SANDBOX === 'true'

  // Cria preferência de pagamento (deve ser feito no backend em produção)
  // Aqui simulamos a estrutura para o frontend
  const createPreference = async (_item: PlanItem, _userEmail: string, _userId: string): Promise<MPPreference | null> => {
    setLoading(true)
    setError(null)

    try {
      // Em produção, isso seria uma chamada ao seu backend:
      // const res = await fetch('/api/mp/create-preference', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ item, userEmail, userId })
      // })
      // const data = await res.json()
      // setPreference(data)
      // return data

      // Simulação para desenvolvimento
      const mockPreference: MPPreference = {
        id: `pref_${Date.now()}`,
        init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_${Date.now()}`,
        sandbox_init_point: `https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_${Date.now()}`
      }

      setPreference(mockPreference)
      return mockPreference
    } catch (err) {
      setError('Erro ao criar preferência de pagamento')
      return null
    } finally {
      setLoading(false)
    }
  }

  const getCheckoutUrl = (pref: MPPreference) => {
    return isSandbox ? pref.sandbox_init_point : pref.init_point
  }

  return {
    loading,
    error,
    preference,
    publicKey,
    isSandbox,
    createPreference,
    getCheckoutUrl,
  }
}
