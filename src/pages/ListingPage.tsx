import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ChevronDown, MapPin, BadgeCheck, Crown } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import { MOCK_USERS, CITIES, ETHNICITIES, BODY_TYPES } from '../data/mockData';
import type { FilterState } from '../types';

const DEFAULT_FILTERS: FilterState = {
  city: '',
  ethnicity: '',
  bodyType: '',
  minAge: 18,
  maxAge: 55,
  minPrice: 0,
  maxPrice: 2000,
  services: [],
  verified: false,
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destaque primeiro' },
  { value: 'views', label: 'Mais visitadas' },
  { value: 'newest', label: 'Mais recentes' },
  { value: 'age_asc', label: 'Mais jovens' },
];

export default function ListingPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    city: searchParams.get('city') || '',
    verified: searchParams.get('filter') === 'verificadas',
  });
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let users = [...MOCK_USERS].filter((u) => u.isActive);
    if (search) {
      const q = search.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q) ||
          u.services.some((s) => s.toLowerCase().includes(q)) ||
          u.neighborhood.toLowerCase().includes(q)
      );
    }
    if (filters.city) users = users.filter((u) => u.city === filters.city);
    if (filters.ethnicity) users = users.filter((u) => u.ethnicity === filters.ethnicity);
    if (filters.bodyType) users = users.filter((u) => u.bodyType === filters.bodyType);
    if (filters.verified) users = users.filter((u) => u.isVerified);
    users = users.filter((u) => u.age >= filters.minAge && u.age <= filters.maxAge);

    if (sort === 'featured') {
      users.sort((a, b) => {
        const order: Record<string, number> = { featured: 0, basic: 1 };
        return (order[a.plan] ?? 2) - (order[b.plan] ?? 2);
      });
    } else if (sort === 'views') {
      users.sort((a, b) => b.views - a.views);
    } else if (sort === 'newest') {
      users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'age_asc') {
      users.sort((a, b) => a.age - b.age);
    }
    return users;
  }, [filters, sort, search]);

  const clearFilters = () => { setFilters(DEFAULT_FILTERS); setSearch(''); };

  const activeFiltersCount = [
    filters.city, filters.ethnicity, filters.bodyType, filters.verified,
    filters.minAge !== 18, filters.maxAge !== 55,
  ].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div className="listing-header-inner" style={{ paddingTop: 28, paddingBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Link to="/" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Início</Link>
                <span style={{ color: '#d1d5db', fontSize: 13 }}>/</span>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Acompanhantes</span>
                {filters.city && (
                  <>
                    <span style={{ color: '#d1d5db', fontSize: 13 }}>/</span>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>{filters.city}</span>
                  </>
                )}
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>
                Acompanhantes{filters.city ? ` em ${filters.city}` : ' — Ribeirão Preto e região'}
              </h1>
              <p style={{ fontSize: 13, color: '#9ca3af', margin: '4px 0 0' }}>
                {filtered.length} perfil{filtered.length !== 1 ? 'is' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Search + Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Buscar nome, bairro..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                    border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 13,
                    color: '#374151', background: '#fff', outline: 'none',
                    width: '100%', minWidth: 0, maxWidth: 220,
                  }}
                />
              </div>

              {/* Sort */}
              <div style={{ position: 'relative' }}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    appearance: 'none', paddingLeft: 12, paddingRight: 32, paddingTop: 9, paddingBottom: 9,
                    border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 13,
                    color: '#374151', background: '#fff', cursor: 'pointer', outline: 'none',
                  }}
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#9ca3af', pointerEvents: 'none' }} />
              </div>

              {/* Mobile filters button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '9px 14px', borderRadius: 12, fontSize: 13, fontWeight: 500,
                  border: showFilters || activeFiltersCount > 0 ? '1px solid #f43f5e' : '1px solid #e5e7eb',
                  background: showFilters || activeFiltersCount > 0 ? '#fff1f2' : '#fff',
                  color: showFilters || activeFiltersCount > 0 ? '#f43f5e' : '#6b7280',
                  cursor: 'pointer',
                }}
                className="lg:hidden"
              >
                <SlidersHorizontal style={{ width: 14, height: 14 }} />
                Filtros
                {activeFiltersCount > 0 && (
                  <span style={{
                    background: '#f43f5e', color: '#fff', borderRadius: '50%',
                    width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                  }}>{activeFiltersCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="listing-content-inner" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

          {/* Sidebar — só a partir de 1024px; no mobile usa o botão Filtros */}
          <aside className="listing-sidebar">

            {/* VIP Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
              border: '1px solid #fecdd3', borderRadius: 16, padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Crown style={{ width: 16, height: 16, color: '#f43f5e' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f43f5e' }}>Plano Destaque</span>
              </div>
              <p style={{ fontSize: 12, color: '#9f1239', lineHeight: 1.5, margin: '0 0 12px' }}>
                Apareça em primeiro no topo das buscas e atraia mais clientes.
              </p>
              <Link to="/planos" style={{
                display: 'block', textAlign: 'center', padding: '8px 0',
                background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                color: '#fff', borderRadius: 10, fontSize: 12, fontWeight: 700,
                textDecoration: 'none',
              }}>
                Ver planos →
              </Link>
            </div>

            {/* City filter */}
            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin style={{ width: 13, height: 13, color: '#f43f5e' }} /> Cidade
                </h3>
              </div>
              <div style={{ padding: 8, maxHeight: 220, overflowY: 'auto' }}>
                <button
                  onClick={() => setFilters({ ...filters, city: '' })}
                  style={{
                    width: '100%', textAlign: 'left', padding: '7px 12px', borderRadius: 10, fontSize: 13,
                    border: 'none', cursor: 'pointer',
                    background: !filters.city ? '#fff1f2' : 'transparent',
                    color: !filters.city ? '#f43f5e' : '#6b7280',
                    fontWeight: !filters.city ? 700 : 400,
                  }}
                >
                  Todas as cidades
                </button>
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilters({ ...filters, city: c })}
                    style={{
                      width: '100%', textAlign: 'left', padding: '7px 12px', borderRadius: 10, fontSize: 13,
                      border: 'none', cursor: 'pointer',
                      background: filters.city === c ? '#fff1f2' : 'transparent',
                      color: filters.city === c ? '#f43f5e' : '#6b7280',
                      fontWeight: filters.city === c ? 700 : 400,
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Ethnicity filter */}
            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                  Etnia
                </h3>
              </div>
              <div style={{ padding: 8 }}>
                {['', ...ETHNICITIES].map((e) => (
                  <button
                    key={e || 'all'}
                    onClick={() => setFilters({ ...filters, ethnicity: e })}
                    style={{
                      width: '100%', textAlign: 'left', padding: '7px 12px', borderRadius: 10, fontSize: 13,
                      border: 'none', cursor: 'pointer',
                      background: filters.ethnicity === e ? '#fff1f2' : 'transparent',
                      color: filters.ethnicity === e ? '#f43f5e' : '#6b7280',
                      fontWeight: filters.ethnicity === e ? 700 : 400,
                    }}
                  >
                    {e || 'Todas'}
                  </button>
                ))}
              </div>
            </div>

            {/* Body type filter */}
            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                  Tipo físico
                </h3>
              </div>
              <div style={{ padding: 8 }}>
                {['', ...BODY_TYPES].map((b) => (
                  <button
                    key={b || 'all'}
                    onClick={() => setFilters({ ...filters, bodyType: b })}
                    style={{
                      width: '100%', textAlign: 'left', padding: '7px 12px', borderRadius: 10, fontSize: 13,
                      border: 'none', cursor: 'pointer',
                      background: filters.bodyType === b ? '#fff1f2' : 'transparent',
                      color: filters.bodyType === b ? '#f43f5e' : '#6b7280',
                      fontWeight: filters.bodyType === b ? 700 : 400,
                    }}
                  >
                    {b || 'Todos'}
                  </button>
                ))}
              </div>
            </div>

            {/* Age range */}
            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, padding: '16px' }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                Idade: {filters.minAge}–{filters.maxAge} anos
              </h3>
              <input
                type="range" min={18} max={55} value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: parseInt(e.target.value) })}
                style={{ width: '100%', accentColor: '#f43f5e' }}
              />
            </div>

            {/* Verified */}
            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, padding: '16px' }}>
              <button
                onClick={() => setFilters({ ...filters, verified: !filters.verified })}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 12, border: filters.verified ? '2px solid #10b981' : '2px solid #e5e7eb',
                  background: filters.verified ? '#ecfdf5' : '#f9fafb',
                  color: filters.verified ? '#059669' : '#6b7280',
                  cursor: 'pointer', fontSize: 13, fontWeight: 500,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BadgeCheck style={{ width: 15, height: 15 }} /> Verificadas
                </span>
                <div style={{
                  width: 36, height: 20, borderRadius: 10, background: filters.verified ? '#10b981' : '#d1d5db',
                  position: 'relative', transition: 'background 0.2s',
                }}>
                  <div style={{
                    width: 14, height: 14, background: '#fff', borderRadius: '50%',
                    position: 'absolute', top: 3, left: filters.verified ? 19 : 3,
                    transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
              </button>
            </div>

            {/* Clear filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                style={{
                  width: '100%', padding: '10px 0', borderRadius: 12,
                  border: '1px solid #fecdd3', background: '#fff',
                  color: '#f43f5e', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <X style={{ width: 13, height: 13 }} /> Limpar filtros
              </button>
            )}
          </aside>

          {/* Content area */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Mobile filter panel */}
            {showFilters && (
              <div style={{
                marginBottom: 24, padding: 20, background: '#fff',
                border: '1px solid #f1f5f9', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Filtros</h3>
                  <button onClick={clearFilters} style={{ fontSize: 12, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <X style={{ width: 12, height: 12 }} /> Limpar
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Cidade', key: 'city', options: CITIES },
                    { label: 'Etnia', key: 'ethnicity', options: ETHNICITIES },
                    { label: 'Físico', key: 'bodyType', options: BODY_TYPES },
                  ].map(({ label, key, options }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                      <select
                        value={(filters as any)[key]}
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 13, color: '#374151', background: '#f9fafb' }}
                      >
                        <option value="">Todos</option>
                        {options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Idade máx: {filters.maxAge}
                    </label>
                    <input type="range" min={18} max={55} value={filters.maxAge}
                      onChange={(e) => setFilters({ ...filters, maxAge: parseInt(e.target.value) })}
                      style={{ width: '100%', accentColor: '#f43f5e' }} />
                  </div>
                </div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => setFilters({ ...filters, verified: !filters.verified })}
                    style={{ width: 36, height: 20, borderRadius: 10, background: filters.verified ? '#10b981' : '#d1d5db', position: 'relative', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: 14, height: 14, background: '#fff', borderRadius: '50%', position: 'absolute', top: 3, left: filters.verified ? 19 : 3, transition: 'left 0.2s' }} />
                  </button>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>Apenas verificadas</span>
                </div>
              </div>
            )}

            {/* Active filter chips */}
            {(filters.city || filters.ethnicity || filters.bodyType || filters.verified) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {filters.city && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff1f2', border: '1px solid #fecdd3', color: '#f43f5e', fontSize: 12, fontWeight: 600, borderRadius: 20 }}>
                    📍 {filters.city}
                    <button onClick={() => setFilters({ ...filters, city: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f43f5e' }}><X style={{ width: 12, height: 12 }} /></button>
                  </span>
                )}
                {filters.ethnicity && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff1f2', border: '1px solid #fecdd3', color: '#f43f5e', fontSize: 12, fontWeight: 600, borderRadius: 20 }}>
                    {filters.ethnicity}
                    <button onClick={() => setFilters({ ...filters, ethnicity: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f43f5e' }}><X style={{ width: 12, height: 12 }} /></button>
                  </span>
                )}
                {filters.bodyType && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff1f2', border: '1px solid #fecdd3', color: '#f43f5e', fontSize: 12, fontWeight: 600, borderRadius: 20 }}>
                    {filters.bodyType}
                    <button onClick={() => setFilters({ ...filters, bodyType: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f43f5e' }}><X style={{ width: 12, height: 12 }} /></button>
                  </span>
                )}
                {filters.verified && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', fontSize: 12, fontWeight: 600, borderRadius: 20 }}>
                    ✓ Verificadas
                    <button onClick={() => setFilters({ ...filters, verified: false })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#059669' }}><X style={{ width: 12, height: 12 }} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid box */}
            <div className="listing-grid-box" style={{
              background: '#fff', borderRadius: 20,
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}>
              {/* Grid header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: '1 1 auto' }}>
                  <div style={{ width: 4, height: 20, background: 'linear-gradient(180deg, #f43f5e, #fb7185)', borderRadius: 4, flexShrink: 0 }} />
                  <h2 style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', fontWeight: 700, color: '#111827', margin: 0 }}>
                    {filters.city ? `Acompanhantes em ${filters.city}` : 'Todas as acompanhantes'}
                  </h2>
                  <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 400, flexShrink: 0 }}>({filtered.length})</span>
                </div>
                {!filters.city && !search && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 20, flexShrink: 0 }}>
                    <Crown style={{ width: 13, height: 13, color: '#f97316' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#ea580c' }}>Destaque aparece primeiro</span>
                  </div>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className="grid-main-cards">
                  {filtered.map((u) => <ProfileCard key={u.id} user={u} size="normal" />)}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Nenhum perfil encontrado</h3>
                  <p style={{ fontSize: 14, color: '#9ca3af', margin: '0 0 24px' }}>Tente outros filtros ou busque por outra cidade.</p>
                  <button
                    onClick={clearFilters}
                    style={{
                      padding: '10px 28px', background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                      color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
