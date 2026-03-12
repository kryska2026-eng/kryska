import { Link } from 'react-router-dom';
import { Shield, ChevronRight, Lock, Eye, Database, UserCheck, Bell, Trash2 } from 'lucide-react';

const sections = [
  {
    icon: Database,
    color: '#6366f1',
    title: '1. Dados que coletamos',
    content: [
      'Nome, email e telefone para criação da conta',
      'Fotos e vídeos enviados para o perfil',
      'Documento de identidade para verificação de idade (acesso restrito ao admin)',
      'Dados de pagamento processados pelo Mercado Pago (não armazenamos dados de cartão)',
      'Logs de acesso: IP, data/hora, navegador',
      'Estatísticas de visualização do perfil',
    ],
  },
  {
    icon: Eye,
    color: '#f43f5e',
    title: '2. Como usamos seus dados',
    content: [
      'Criação e gerenciamento do seu perfil de anunciante',
      'Verificação de maioridade (18+ anos)',
      'Processamento de pagamentos via Mercado Pago',
      'Envio de notificações relacionadas ao seu anúncio',
      'Melhoria contínua da plataforma',
      'Cumprimento de obrigações legais',
    ],
  },
  {
    icon: Lock,
    color: '#10b981',
    title: '3. Segurança dos dados',
    content: [
      'Documentos de verificação armazenados em pasta privada sem acesso HTTP direto',
      'Senhas criptografadas com bcrypt',
      'Comunicação via HTTPS/SSL',
      'Tokens de autenticação com expiração automática',
      'Acesso aos documentos restrito ao administrador da plataforma',
      'Backups regulares e criptografados',
    ],
  },
  {
    icon: UserCheck,
    color: '#f59e0b',
    title: '4. Compartilhamento de dados',
    content: [
      'Não vendemos seus dados para terceiros',
      'Mercado Pago: dados de pagamento para processar transações',
      'Cloudinary: armazenamento das fotos e vídeos do perfil',
      'Autoridades: quando exigido por lei ou ordem judicial',
      'Nunca compartilhamos documentos de verificação',
    ],
  },
  {
    icon: Bell,
    color: '#8b5cf6',
    title: '5. Seus direitos (LGPD)',
    content: [
      'Acesso: solicitar cópia dos seus dados pessoais',
      'Correção: atualizar dados incorretos ou desatualizados',
      'Exclusão: solicitar a remoção dos seus dados',
      'Portabilidade: receber seus dados em formato estruturado',
      'Revogação: retirar consentimento a qualquer momento',
      'Para exercer seus direitos: contato@kryska.com.br',
    ],
  },
  {
    icon: Trash2,
    color: '#ef4444',
    title: '6. Retenção e exclusão',
    content: [
      'Dados de conta: mantidos enquanto a conta estiver ativa',
      'Após exclusão da conta: dados removidos em até 30 dias',
      'Logs de acesso: mantidos por 90 dias',
      'Dados de pagamento: 5 anos (obrigação legal fiscal)',
      'Documentos de verificação: excluídos após 90 dias da aprovação',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg, #fff5f7 0%, #fff0f3 50%, #fef2f2 100%)', padding: '80px 0 60px', textAlign: 'center', borderBottom: '1px solid #fce7f3' }}>
        <div className="page-container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.20)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
            <Shield size={14} color="#f43f5e" />
            <span style={{ color: '#f43f5e', fontSize: 13, fontWeight: 600 }}>Política de Privacidade</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1f2937', margin: '0 0 12px' }}>
            Sua privacidade é nossa{' '}
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>prioridade</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: 16, margin: '0 0 16px', lineHeight: 1.7 }}>
            Somos transparentes sobre como coletamos, usamos e protegemos seus dados em conformidade com a LGPD.
          </p>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Última atualização: Janeiro 2025</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="plans-inner" style={{ paddingTop: 60, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9ca3af', fontSize: 13, marginBottom: 40 }}>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Início</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#374151' }}>Política de Privacidade</span>
        </div>

        {/* Aviso LGPD */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '20px 24px', marginBottom: 40, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, background: '#dcfce7', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={20} color="#16a34a" />
          </div>
          <div>
            <h3 style={{ color: '#15803d', fontWeight: 700, margin: '0 0 4px', fontSize: 15 }}>Conformidade com a LGPD</h3>
            <p style={{ color: '#166534', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              A Kryska está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). 
              Ao usar nossa plataforma, você consente com a coleta e uso de dados conforme descrito abaixo.
            </p>
          </div>
        </div>

        {/* Seções */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, background: `${section.color}15`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color={section.color} />
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1f2937', margin: 0 }}>{section.title}</h2>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {section.content.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#4b5563', fontSize: 14, lineHeight: 1.6 }}>
                      <div style={{ width: 6, height: 6, background: section.color, borderRadius: '50%', flexShrink: 0, marginTop: 8 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Cookies */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', marginTop: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1f2937', margin: '0 0 16px' }}>7. Cookies</h2>
          <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.7, margin: '0 0 12px' }}>
            Utilizamos cookies essenciais para o funcionamento da plataforma (sessão, autenticação) e cookies analíticos para entender como o site é usado.
          </p>
          <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar o funcionamento de algumas funcionalidades.
          </p>
        </div>

        {/* Contato */}
        <div style={{ background: 'linear-gradient(135deg, #fff5f7, #fff0f3)', border: '1px solid #fce7f3', borderRadius: 20, padding: '32px', marginTop: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#1f2937', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>Dúvidas sobre privacidade?</h3>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 20px' }}>
            Nossa equipe está disponível para esclarecimentos sobre o uso dos seus dados.
          </p>
          <a
            href="mailto:contato@kryska.com.br"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(244,63,94,0.25)' }}
          >
            ✉️ contato@kryska.com.br
          </a>
        </div>

        {/* Links relacionados */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/termos" style={{ color: '#f43f5e', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
            → Termos de Uso
          </Link>
          <span style={{ color: '#e5e7eb' }}>|</span>
          <Link to="/" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
