import { CreditCard, TrendingUp, Film } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { PLANS, BOOST_PACKS, MEDIA_PACKS, type PlanItem } from '../../hooks/useMercadoPago';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

function PlanTable({
  title,
  icon: Icon,
  items,
  typeLabel,
}: {
  title: string;
  icon: React.ElementType;
  items: PlanItem[];
  typeLabel: string;
}) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
      border: '1px solid #f1f5f9',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: '#e11d4815',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={20} color="#e11d48" />
        </div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>{title}</h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '10px 12px', color: '#64748b', fontWeight: 600 }}>ID</th>
              <th style={{ textAlign: 'left', padding: '10px 12px', color: '#64748b', fontWeight: 600 }}>Título</th>
              <th style={{ textAlign: 'left', padding: '10px 12px', color: '#64748b', fontWeight: 600 }}>Descrição</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', color: '#64748b', fontWeight: 600 }}>Valor</th>
              <th style={{ textAlign: 'left', padding: '10px 12px', color: '#64748b', fontWeight: 600 }}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 12px', color: '#475569', fontFamily: 'monospace', fontSize: 12 }}>{p.id}</td>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>{p.title}</td>
                <td style={{ padding: '10px 12px', color: '#64748b' }}>{p.description}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#1e293b' }}>
                  {formatCurrency(p.amount)}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: typeLabel === 'Plano' ? '#dbeafe' : typeLabel === 'Subida' ? '#fef3c7' : '#dcfce7',
                    color: typeLabel === 'Plano' ? '#1e40af' : typeLabel === 'Subida' ? '#b45309' : '#166534',
                  }}>
                    {typeLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ margin: '12px 0 0', fontSize: 12, color: '#94a3b8' }}>
        Estes valores são usados no checkout e na página de planos. Para alterar, edite o arquivo{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>src/hooks/useMercadoPago.ts</code> e faça um novo deploy.
      </p>
    </div>
  );
}

export default function AdminPlans() {
  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#1e293b' }}>Planos e preços</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>
            Visão dos planos mensais, pacotes de subida e multimídia exibidos no site e no checkout.
          </p>
        </div>

        <PlanTable title="Planos mensais" icon={CreditCard} items={PLANS} typeLabel="Plano" />
        <PlanTable title="Pacotes de subida" icon={TrendingUp} items={BOOST_PACKS} typeLabel="Subida" />
        <PlanTable title="Pacotes multimídia" icon={Film} items={MEDIA_PACKS} typeLabel="Multimídia" />
      </div>
    </AdminLayout>
  );
}
