import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus, MapPin, ChevronDown, Home, Users, CreditCard, Info } from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const navLinks = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/acompanhantes', label: 'Ver Perfis', icon: Users },
    { to: '/planos', label: 'Planos', icon: CreditCard },
    { to: '/termos', label: 'Sobre', icon: Info },
  ];

  return (
    <header style={{ background: '#fff', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderBottom: '1px solid #f1f5f9' }}>

      {/* Barra topo adulto */}
      <div style={{ background: '#e11d48', color: '#fff', fontSize: 12, padding: '6px 0', textAlign: 'center', fontWeight: 500, letterSpacing: '0.03em' }}>
        🔞 Conteúdo adulto exclusivo para maiores de 18 anos &nbsp;·&nbsp; Ribeirão Preto e região
      </div>

      {/* Linha 1: Logo + ações */}
      <div className="page-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src="http://www.kryska.com.br/kryskalogo.png"
              alt="Kryska"
              style={{ height: 40, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <div style={{ flex: 1 }} />

          {/* Ações desktop */}
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link
                to="/entrar"
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, color: '#4b5563', border: '1px solid #e5e7eb', borderRadius: 12, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#e11d48'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#fda4af'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#4b5563'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; }}
              >
                <LogIn size={14} />
                Entrar
              </Link>
              <Link
                to="/anunciar"
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', fontSize: 13, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #f43f5e, #e11d48)', borderRadius: 12, textDecoration: 'none', boxShadow: '0 2px 8px rgba(225,29,72,0.25)' }}
              >
                <UserPlus size={14} />
                Anunciar
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          {!isDesktop && (
            <button
              onClick={() => setOpen(!open)}
              style={{ marginLeft: 'auto', padding: 8, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 10 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Linha 2: Menu de navegação horizontal — apenas desktop */}
      {isDesktop && (
        <div style={{ borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
          <div className="page-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 44 }}>

              {/* Links de navegação */}
              {navLinks.map((l) => {
                const Icon = l.icon;
                const active = isActive(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 8,
                      fontSize: 13, fontWeight: 500, textDecoration: 'none',
                      color: active ? '#e11d48' : '#6b7280',
                      background: active ? '#fff1f2' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.color = '#e11d48';
                        (e.currentTarget as HTMLAnchorElement).style.background = '#fff1f2';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      }
                    }}
                  >
                    <Icon size={14} />
                    {l.label}
                  </Link>
                );
              })}

              {/* Separador */}
              <div style={{ width: 1, height: 18, background: '#e5e7eb', margin: '0 8px' }} />

              {/* Dropdown de cidades */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e11d48'; (e.currentTarget as HTMLButtonElement).style.background = '#fff1f2'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#6b7280'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  <MapPin size={14} color="#f43f5e" />
                  Cidades
                  <ChevronDown size={14} style={{ transform: cityOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>
                {cityOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, width: 220, background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.12)', zIndex: 100, padding: '8px 0', maxHeight: 280, overflowY: 'auto' }}>
                    {CITIES.map((c) => (
                      <Link
                        key={c}
                        to={`/acompanhantes?city=${c}`}
                        onClick={() => setCityOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontSize: 13, color: '#4b5563', textDecoration: 'none', transition: 'all 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fff1f2'; (e.currentTarget as HTMLAnchorElement).style.color = '#e11d48'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#4b5563'; }}
                      >
                        <MapPin size={12} color="#f43f5e" />
                        {c}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Badge de perfis online */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9ca3af' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                48 perfis ativos agora
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Menu mobile */}
      {!isDesktop && open && (
        <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map((l) => {
            const Icon = l.icon;
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: active ? '#e11d48' : '#4b5563', background: active ? '#fff1f2' : 'transparent', textDecoration: 'none' }}
              >
                <Icon size={16} />
                {l.label}
              </Link>
            );
          })}
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <Link
              to="/entrar"
              onClick={() => setOpen(false)}
              style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: 13, fontWeight: 500, color: '#4b5563', border: '1px solid #e5e7eb', borderRadius: 12, textDecoration: 'none' }}
            >
              Entrar
            </Link>
            <Link
              to="/anunciar"
              onClick={() => setOpen(false)}
              style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#e11d48', borderRadius: 12, textDecoration: 'none' }}
            >
              Anunciar
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
