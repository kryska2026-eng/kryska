import heroKryska from '../assets/kryska.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, BadgeCheck, Crown, ChevronRight,
  Shield, Flame, TrendingUp, Star, Play, Sparkles, UserPlus,
} from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import { MOCK_USERS, CITIES } from '../data/mockData';

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const featured = MOCK_USERS.filter((u) => u.plan === 'featured' && u.isActive);
  const recent   = MOCK_USERS.filter((u) => u.isActive);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity) params.set('city', selectedCity);
    if (search) params.set('q', search);
    navigate(`/acompanhantes?${params.toString()}`);
  };

  return (
    <div style={{ backgroundColor: '#fafafa', width: '100%', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════
          HERO — fundo claro, rosa suave
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          background: 'linear-gradient(150deg, #fff5f7 0%, #fff0f3 30%, #fef2f2 60%, #fff8f9 100%)',
        }}
      >
        {/* ── Imagem de fundo — hero ── */}
        <img
          src={heroKryska}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.28,
            filter: 'grayscale(20%) brightness(0.85) sepia(0.3) hue-rotate(310deg) saturate(1.2)',
            zIndex: 0,
          }}
        />

        {/* Blobs decorativos rosa claro */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            width: '60vw', maxWidth: 500,
            height: '60vw', maxHeight: 500,
            top: '-20%', left: '-10%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.10) 0%, rgba(251,113,133,0.05) 50%, transparent 70%)',
            filter: 'blur(60px)', borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute',
            width: '50vw', maxWidth: 400,
            height: '50vw', maxHeight: 400,
            top: '-10%', right: '-8%',
            background: 'radial-gradient(circle, rgba(253,164,175,0.13) 0%, transparent 65%)',
            filter: 'blur(50px)', borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute',
            width: '40vw', maxWidth: 300,
            height: '40vw', maxHeight: 300,
            bottom: '-10%', left: '38%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)',
            filter: 'blur(45px)', borderRadius: '50%',
          }} />
          {/* Grade decorativa sutil */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(244,63,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Conteúdo do hero */}
        <div className="relative max-w-5xl mx-auto text-center page-container" style={{ paddingTop: 'clamp(48px, 10vw, 120px)', paddingBottom: 'clamp(48px, 10vw, 120px)' }}>

          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-rose-500 text-xs font-semibold mb-7"
            style={{
              backgroundColor: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.18)',
            }}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            +200 perfis ativos em Ribeirão Preto e região
          </div>

          {/* Título */}
          <h1
            className="hero-title font-black leading-[1.08] tracking-tight mb-5"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 4.2rem)', color: '#1a0a10' }}
          >
            Acompanhantes em{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #fb7185 0%, #f43f5e 45%, #e11d48 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ribeirão Preto
            </span>
          </h1>

          <p
            className="hero-desc mb-8 leading-relaxed max-w-md mx-auto text-gray-500"
            style={{ fontSize: '1.05rem' }}
          >
            Perfis verificados, fotos reais e contato direto com as melhores
            acompanhantes da região.
          </p>

          {/* Search form */}
          <div className="flex justify-center mb-8">
            <form
              onSubmit={handleSearch}
              style={{ width: '100%', maxWidth: 420 }}
            >
              {/* Card da busca */}
              <div
                className="bg-white rounded-2xl p-1.5 flex items-center gap-1.5"
                style={{
                  boxShadow: '0 8px 32px rgba(244,63,94,0.13), 0 2px 8px rgba(0,0,0,0.06)',
                  border: '1.5px solid rgba(244,63,94,0.12)',
                }}
              >
                {/* Select cidade */}
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs focus:outline-none appearance-none cursor-pointer font-medium text-gray-600 bg-gray-50 hover:bg-rose-50 transition-colors shrink-0"
                  style={{
                    border: '1px solid rgba(244,63,94,0.12)',
                    maxWidth: 130,
                  }}
                >
                  <option value="">📍 Cidade</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Divisor vertical */}
                <div
                  className="w-px self-stretch my-1 shrink-0"
                  style={{ backgroundColor: 'rgba(244,63,94,0.12)' }}
                />

                {/* Input nome */}
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
                />

                {/* Botão buscar */}
                <button
                  type="submit"
                  className="px-4 py-2 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all active:scale-95 text-white shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                    boxShadow: '0 4px 14px rgba(225,29,72,0.3)',
                  }}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Buscar</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick chips — cidades populares */}
          <div className="flex city-chips justify-center gap-2 mb-2">
            {CITIES.slice(0, 8).map((city) => (
              <Link
                key={city}
                to={`/acompanhantes?city=${city}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 text-gray-500 hover:text-rose-600 bg-white hover:bg-rose-50"
                style={{
                  border: '1px solid rgba(244,63,94,0.15)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <MapPin className="w-2.5 h-2.5" /> {city}
              </Link>
            ))}
          </div>
        </div>


      </section>

      {/* ══════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto page-container" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <div className="flex items-center stats-bar gap-6 sm:gap-10 text-sm">
            {[
              { icon: <Flame className="w-4 h-4 text-rose-500" />, val: '200+', label: 'perfis ativos' },
              { icon: <BadgeCheck className="w-4 h-4 text-emerald-500" />, val: '80%', label: 'verificadas' },
              { icon: <MapPin className="w-4 h-4 text-blue-400" />, val: '20', label: 'cidades' },
              { icon: <TrendingUp className="w-4 h-4 text-violet-500" />, val: '50k+', label: 'acessos/mês' },
              { icon: <Play className="w-4 h-4 text-amber-500" />, val: '60+', label: 'com vídeo' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-gray-500">
                {s.icon}
                <strong className="text-gray-800 font-bold">{s.val}</strong>
                <span className="hidden sm:inline text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          CONTEÚDO PRINCIPAL — com espaço lateral
      ══════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto page-container" style={{ paddingTop: 'clamp(32px, 5vw, 72px)', paddingBottom: 'clamp(32px, 5vw, 72px)' }}>

        {/* ── Destaques VIP ── */}
        {featured.length > 0 && (
          <section className="home-section-spacing">
            <div className="flex items-center justify-between home-section-header" style={{ marginBottom: 32 }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-gray-900 font-black text-xl leading-none">Destaques VIP</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Perfis premium com vídeo e foto verificada</p>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold rounded-full">
                  {featured.length}
                </span>
              </div>
              <Link
                to="/acompanhantes?plan=featured"
                className="flex items-center gap-1 text-rose-500 hover:text-rose-600 text-sm font-semibold group transition-colors"
              >
                Ver todas <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div
              className="bg-white rounded-2xl border border-gray-100 p-4"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
            >
              <div className="grid-vip-cards">
                {featured.slice(0, 3).map((u) => (
                  <ProfileCard key={u.id} user={u} size="large" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Separador elegante */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4" style={{ marginBottom: 48 }}>
          <div className="flex-1 min-w-[60px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent hidden sm:block" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm shrink-0">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">Todas as acompanhantes</span>
          </div>
          <div className="flex-1 min-w-[60px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent hidden sm:block" />
        </div>

        {/* ── Grid principal + Sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Cards — área principal */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-center justify-between home-section-header" style={{ marginBottom: 32 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-rose-500 rounded-lg flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-gray-900 font-bold text-lg">Acompanhantes</h2>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                  {recent.length}
                </span>
              </div>
              <Link
                to="/acompanhantes"
                className="flex items-center gap-1 text-rose-500 hover:text-rose-600 text-sm font-semibold group transition-colors"
              >
                Ver todas <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Grid encaixotado */}
            <div
              className="bg-white rounded-2xl border border-gray-100 p-4"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
            >
              <div className="grid-main-cards">
                {recent.map((u) => (
                  <ProfileCard key={u.id} user={u} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar — só em telas grandes ── */}
          <aside className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 232 }}>

            {/* CTA Anunciar */}
            <div
              className="rounded-2xl p-5 text-center text-white"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 60%, #9f1239 100%)',
                boxShadow: '0 8px 24px rgba(225,29,72,0.2)',
              }}
            >
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-sm mb-1">Quer anunciar?</h3>
              <p className="text-rose-200 text-xs mb-4 leading-relaxed">
                Anuncie seu perfil e alcance milhares de homens na região.
              </p>
              <Link
                to="/anunciar"
                className="block w-full py-2.5 bg-white text-rose-600 font-bold rounded-xl text-sm hover:bg-rose-50 transition-colors"
              >
                Criar perfil agora
              </Link>
            </div>

            {/* Cidades */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Cidades
              </h3>
              <div className="space-y-0.5">
                {CITIES.slice(0, 10).map((city) => (
                  <Link
                    key={city}
                    to={`/acompanhantes?city=${city}`}
                    className="flex items-center justify-between py-1.5 px-2 hover:bg-rose-50 rounded-xl text-sm text-gray-600 hover:text-rose-600 group transition-colors"
                  >
                    <span>{city}</span>
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-rose-400" />
                  </Link>
                ))}
                <Link
                  to="/acompanhantes"
                  className="block text-center text-xs text-rose-500 hover:text-rose-700 font-semibold pt-2 border-t border-gray-100 mt-1 transition-colors"
                >
                  + ver todas as cidades
                </Link>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> Segurança
              </h3>
              <ul className="space-y-2 text-xs text-gray-500">
                {[
                  'Perfis verificados com selfie',
                  'Fotos aprovadas manualmente',
                  'Dados protegidos (LGPD)',
                  'Suporte via email',
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Planos */}
            <div className="bg-gray-900 rounded-2xl p-4 text-white">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" /> Planos
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { name: 'Básico', price: 'R$ 49/mês', color: 'text-amber-400' },
                  { name: 'Destaque', price: 'R$ 99/mês', color: 'text-rose-400' },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-white/10 last:border-0">
                    <span className={`font-semibold ${p.color}`}>{p.name}</span>
                    <span className="text-gray-400">{p.price}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/planos"
                className="block text-center mt-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Ver planos completos
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Cidades (SEO) ── */}
        <section className="home-cities-section bg-white border border-gray-100 rounded-2xl shadow-sm text-center">
          <h2 className="text-sm font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" /> Acompanhantes por cidade
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 sm:gap-x-10 lg:gap-x-16 justify-items-center">
            {CITIES.map((city) => (
              <Link
                key={city}
                to={`/acompanhantes?city=${city}`}
                className="px-6 py-3 bg-gray-50 hover:bg-rose-50 border border-gray-200 hover:border-rose-300 text-gray-600 hover:text-rose-600 text-sm rounded-2xl font-medium transition-all hover:shadow-sm hover:scale-105 w-full text-center"
              >
                {city}
              </Link>
            ))}
          </div>
        </section>

        {/* Texto SEO */}
        <section style={{ marginTop: 56, marginBottom: 16 }} className="text-center text-gray-400 text-xs leading-relaxed max-w-3xl mx-auto">
          <p>
            O <strong className="text-gray-600">kryska.com.br</strong> é o maior site de acompanhantes de
            Ribeirão Preto e região, com perfis verificados em Sertãozinho, Jardinópolis, Cravinhos,
            Serrana e mais 15 cidades. Conteúdo exclusivo para maiores de 18 anos. 🔞
          </p>
        </section>
      </div>
    </div>
  );
}
