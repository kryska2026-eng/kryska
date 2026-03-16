import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Mercado Pago — Produção
 * Variáveis obrigatórias no Vercel:
 * - MP_ACCESS_TOKEN: Access Token de produção (Credenciais > Produção no painel MP)
 * - PUBLIC_URL: URL do site (ex: https://www.kryska.com.br) para back_urls
 */

interface PlanItemPayload {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: 'plan' | 'boost' | 'media';
}

const MP_PREFERENCES_URL = 'https://api.mercadopago.com/checkout/preferences';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(500).json({ error: 'MP_ACCESS_TOKEN não configurado. Defina em Vercel > Settings > Environment Variables.' });
  }

  try {
    const { item, userEmail, userId } = req.body as {
      item?: PlanItemPayload;
      userEmail?: string;
      userId?: string | number;
    };

    if (!item || !userEmail) {
      return res.status(400).json({ error: 'Missing item or userEmail' });
    }

    const baseUrl = process.env.PUBLIC_URL || 'https://www.kryska.com.br';

    const body = {
      items: [
        {
          id: item.id,
          title: item.title,
          description: item.description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(item.amount),
        },
      ],
      payer: {
        email: userEmail,
      },
      back_urls: {
        success: `${baseUrl}/checkout?status=approved&item=${encodeURIComponent(item.id)}`,
        pending: `${baseUrl}/checkout?status=pending&item=${encodeURIComponent(item.id)}`,
        failure: `${baseUrl}/checkout?status=rejected&item=${encodeURIComponent(item.id)}`,
      },
      auto_return: 'approved',
      metadata: {
        userId,
        planId: item.id,
        type: item.type,
      },
    };

    const mpResponse = await fetch(MP_PREFERENCES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error('Mercado Pago API error', data);
      return res.status(500).json({ error: 'Erro ao criar preferência no Mercado Pago' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Unexpected error creating Mercado Pago preference', error);
    return res.status(500).json({ error: 'Erro interno ao criar preferência' });
  }
}

