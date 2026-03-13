import { Settings } from 'lucide-react';
import AdminLayout from './AdminLayout';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#1e293b' }}>Configurações</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>
            Opções gerais do painel e do site.
          </p>
        </div>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          border: '1px solid #f1f5f9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#e11d4815',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Settings size={20} color="#e11d48" />
            </div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Em breve</h2>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
            Aqui você poderá configurar nome do site, e-mail de contato, integrações e outras opções. Por enquanto, alterações são feitas diretamente no código e no painel da Vercel (variáveis de ambiente, domínio).
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
