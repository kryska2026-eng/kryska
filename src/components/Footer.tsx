import { Link } from 'react-router-dom';
import { MessageCircle, Shield, Instagram, Twitter, Crown, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #f1f5f9', marginTop: 80 }}>

      {/* CTA strip */}
      <div style={{ background: 'linear-gradient(90deg, #f43f5e, #e11d48, #be123c)' }}>
        <div className="footer-cta-inner">
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: 0 }}>
              Quer anunciar seu perfil?
            </p>
            <p style={{ color: '#fecdd3', fontSize: 14, margin: '4px 0 0' }}>
              Planos a partir de R$ 49/mês. Cadastro rápido e seguro.
            </p>
          </div>
          <Link
            to="/anunciar"
            className="footer-cta-link"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 24px', background: '#fff', color: '#e11d48',
              fontWeight: 700, borderRadius: 12, fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flexShrink: 0
            }}
          >
            <Crown style={{ width: 16, height: 16 }} /> Criar perfil agora
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-grid">

          {/* Coluna 1: Marca */}
          <div className="footer-col">
            <Link to="/" style={{ display: 'inline-block', marginBottom: 16 }}>
              <img
                src="http://www.kryska.com.br/kryskalogo.png"
                alt="Kryska"
                style={{ height: 40, width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              O maior site de acompanhantes de Ribeirão Preto e região.
              Perfis verificados, fotos reais e contato direto.
            </p>
            <a
              href="mailto:contato@kryska.com.br"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', background: '#f43f5e', color: '#fff',
                fontSize: 13, fontWeight: 600, borderRadius: 12,
                textDecoration: 'none', marginBottom: 20
              }}
            >
              <MessageCircle style={{ width: 16, height: 16 }} /> contato@kryska.com.br
            </a>
            <div className="footer-social">
              {[Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36, height: 36, background: '#f8fafc',
                    border: '1px solid #e2e8f0', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none'
                  }}
                >
                  <Icon style={{ width: 16, height: 16, color: '#94a3b8' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegar */}
          <div className="footer-col">
            <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: 14, marginBottom: 20 }}>
              Navegar
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/', label: 'Início' },
                { to: '/acompanhantes', label: 'Ver acompanhantes' },
                { to: '/planos', label: 'Planos & Preços' },
                { to: '/anunciar', label: 'Anunciar' },
                { to: '/entrar', label: 'Área da anunciante' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Legal */}
          <div className="footer-col">
            <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: 14, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Shield style={{ width: 14, height: 14, color: '#10b981' }} /> Legal & Segurança
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/termos', label: 'Termos de Uso' },
                { to: '/privacidade', label: 'Política de Privacidade' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contato@kryska.com.br"
                  style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                >
                  ✉️ contato@kryska.com.br
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Aviso 18+ */}
      <div style={{ borderTop: '1px solid #fecdd3', background: '#fff1f2' }}>
        <div className="footer-legal-inner">
          🔞 Conteúdo exclusivo para maiores de 18 anos. A Kryska não se responsabiliza pelo conteúdo dos anúncios.
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}>
        <div className="footer-bottom-inner">
          <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
            © 2025 kryska.com.br · Todos os direitos reservados · Ribeirão Preto – SP – Brasil
          </p>
          <p style={{ color: '#cbd5e1', fontSize: 12, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
            Feito com <Heart style={{ width: 12, height: 12, color: '#fda4af' }} /> para Ribeirão Preto
          </p>
        </div>
      </div>

    </footer>
  );
}
