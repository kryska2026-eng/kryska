import { Link } from 'react-router-dom';
import { Shield, ChevronRight, FileText, AlertTriangle, CreditCard, UserCheck, Ban, Scale } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    color: '#6366f1',
    title: '1. Aceitação dos Termos',
    content: 'Ao acessar e usar a plataforma Kryska (kryska.com.br), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nosso serviço. Este site é destinado exclusivamente a maiores de 18 anos.',
  },
  {
    icon: Shield,
    color: '#10b981',
    title: '2. Descrição do Serviço',
    content: 'A Kryska é uma plataforma de anúncios classificados para adultos, funcionando exclusivamente como intermediária de publicação. Não organizamos, intermediamos, facilitamos ou prestamos qualquer tipo de serviço de natureza sexual. O site serve como espaço de publicação de anúncios de acompanhamento social e entretenimento para adultos.',
  },
  {
    icon: UserCheck,
    color: '#f43f5e',
    title: '3. Elegibilidade e Verificação',
    content: 'Para usar este site ou anunciar, você deve ter pelo menos 18 anos. Exigimos verificação de identidade com selfie e documento para todos os anunciantes. Ao usar nosso serviço, você declara que tem 18 anos ou mais. Qualquer uso por menores de 18 anos é estritamente proibido e resultará em cancelamento imediato e possível notificação às autoridades.',
  },
  {
    icon: AlertTriangle,
    color: '#f59e0b',
    title: '4. Responsabilidade dos Anunciantes',
    content: 'Os anunciantes são os únicos responsáveis pelo conteúdo de seus anúncios, incluindo fotos, vídeos, textos e informações de contato. A Kryska não se responsabiliza pela veracidade, legalidade ou adequação dos anúncios publicados. O anunciante garante que possui os direitos sobre todo o conteúdo enviado e que este não viola direitos de terceiros.',
  },
  {
    icon: Ban,
    color: '#ef4444',
    title: '5. Conteúdo Proibido',
    content: 'É estritamente proibido publicar conteúdo que envolva: menores de idade em qualquer contexto, exploração sexual ou tráfico humano, atividades ilegais, fotos de terceiros sem consentimento, conteúdo que viole a legislação brasileira. Violações resultarão em remoção imediata, banimento permanente e notificação às autoridades competentes.',
  },
  {
    icon: CreditCard,
    color: '#8b5cf6',
    title: '6. Planos e Pagamentos',
    content: 'Os pagamentos são processados de forma segura pelo Mercado Pago. Os valores são: Plano Básico R$49/mês e Plano Destaque R$99/mês, além de pacotes de subida e multimídia conforme a página de Planos. Não há reembolso após a ativação do plano. Cancelamentos podem ser feitos a qualquer momento, com acesso mantido até o fim do período pago.',
  },
  {
    icon: Scale,
    color: '#0ea5e9',
    title: '7. Moderação e Remoção',
    content: 'A Kryska reserva-se o direito de remover qualquer anúncio, suspender ou banir qualquer conta que viole estes termos, sem aviso prévio e sem reembolso. A decisão de moderação é final. Anúncios podem ser reprovados se as fotos forem de baixa qualidade, enganosas ou violarem as diretrizes da plataforma.',
  },
  {
    icon: Shield,
    color: '#14b8a6',
    title: '8. Privacidade e LGPD',
    content: 'Coletamos apenas as informações necessárias para o funcionamento da plataforma, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Documentos de verificação ficam em área restrita com acesso exclusivo do administrador. Para mais detalhes, consulte nossa Política de Privacidade.',
  },
  {
    icon: FileText,
    color: '#f43f5e',
    title: '9. Limitação de Responsabilidade',
    content: 'A Kryska não se responsabiliza por: encontros, negociações ou serviços realizados entre usuários e anunciantes, veracidade das informações dos anúncios, danos decorrentes do uso ou impossibilidade de uso da plataforma, conteúdo de sites de terceiros linkados na plataforma.',
  },
  {
    icon: Scale,
    color: '#6366f1',
    title: '10. Foro e Legislação',
    content: 'Estes Termos são regidos pela legislação brasileira. Quaisquer disputas serão resolvidas no foro da Comarca de Ribeirão Preto, Estado de São Paulo. A Kryska pode atualizar estes termos a qualquer momento, comunicando os usuários por email.',
  },
];

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg, #fff5f7 0%, #fff0f3 50%, #fef2f2 100%)', padding: '80px 0 60px', textAlign: 'center', borderBottom: '1px solid #fce7f3' }}>
        <div className="page-container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.20)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
            <FileText size={14} color="#f43f5e" />
            <span style={{ color: '#f43f5e', fontSize: 13, fontWeight: 600 }}>Termos de Uso</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1f2937', margin: '0 0 12px' }}>
            Termos de{' '}
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Uso</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: 16, margin: '0 0 16px', lineHeight: 1.7 }}>
            Leia atentamente antes de usar a plataforma Kryska.
          </p>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Última atualização: Janeiro 2025 • Ribeirão Preto, SP</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="plans-inner" style={{ paddingTop: 60, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9ca3af', fontSize: 13, marginBottom: 40 }}>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Início</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#374151' }}>Termos de Uso</span>
        </div>

        {/* Aviso importante */}
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 16, padding: '20px 24px', marginBottom: 40, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, background: '#ffedd5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={20} color="#ea580c" />
          </div>
          <div>
            <h3 style={{ color: '#c2410c', fontWeight: 700, margin: '0 0 4px', fontSize: 15 }}>Conteúdo exclusivo para maiores de 18 anos</h3>
            <p style={{ color: '#9a3412', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              A Kryska é uma plataforma para adultos. Ao continuar, você declara ter 18 anos ou mais e estar ciente do conteúdo adulto presente na plataforma. A Kryska não se responsabiliza pelo conteúdo dos anúncios.
            </p>
          </div>
        </div>

        {/* Seções */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, background: `${section.color}15`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color={section.color} />
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1f2937', margin: 0 }}>{section.title}</h2>
                </div>
                <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.8, margin: 0, paddingLeft: 58 }}>{section.content}</p>
              </div>
            );
          })}
        </div>

        {/* Contato */}
        <div style={{ background: 'linear-gradient(135deg, #fff5f7, #fff0f3)', border: '1px solid #fce7f3', borderRadius: 20, padding: '32px', marginTop: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#1f2937', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>Dúvidas sobre os termos?</h3>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 20px' }}>
            Entre em contato com nossa equipe pelo email abaixo.
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
          <Link to="/privacidade" style={{ color: '#f43f5e', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
            → Política de Privacidade
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
