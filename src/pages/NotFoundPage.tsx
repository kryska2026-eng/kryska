import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg, #fff5f7 0%, #fff0f3 40%, #fef2f2 70%, #fff8f9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        {/* Blobs */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* 404 grande */}
            <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #f43f5e, #fb7185, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
              404
            </div>
          </div>
        </div>

        {/* Logo */}
        <div style={{ marginBottom: 24 }}>
          <img src="http://www.kryska.com.br/kryskalogo.png" alt="Kryska" style={{ height: 36, objectFit: 'contain' }} />
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: '0 0 12px' }}>
          Página não encontrada
        </h1>
        <p style={{ color: '#9ca3af', fontSize: 16, margin: '0 0 40px', lineHeight: 1.6 }}>
          Ops! A página que você está procurando não existe ou foi removida.
        </p>

        {/* Ações */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(244,63,94,0.30)' }}>
            <Home size={18} />
            Ir para a home
          </Link>
          <Link to="/acompanhantes" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#fff', border: '1.5px solid #fce7f3', color: '#f43f5e', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            <Search size={18} />
            Ver perfis
          </Link>
        </div>

        {/* Voltar */}
        <button
          onClick={() => window.history.back()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '24px auto 0', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 14 }}
        >
          <ArrowLeft size={14} />
          Voltar à página anterior
        </button>
      </div>
    </div>
  );
}
