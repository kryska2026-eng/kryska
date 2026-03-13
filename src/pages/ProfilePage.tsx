import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, BadgeCheck, Phone, MessageCircle, Eye,
  Ruler, Weight, User, ChevronLeft, ChevronRight, Crown,
  Clock, Shield, X, Play, Camera, Heart,
} from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';
import VideoPlayer from '../components/VideoPlayer';

export default function ProfilePage() {
  const { id } = useParams();
  const user = MOCK_USERS.find((u) => u.id === Number(id));
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', background: '#fff', borderRadius: 20, padding: 40, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', maxWidth: 360 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
          <h2 style={{ color: '#1f2937', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Perfil não encontrado</h2>
          <Link to="/acompanhantes" style={{ color: '#e11d48', fontWeight: 600, textDecoration: 'none' }}>← Voltar para acompanhantes</Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/55${user.whatsapp.replace(/\D/g, '')}?text=Oi! Vi seu perfil no Kryska e gostaria de saber mais.`;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>

      {/* Lightbox fotos */}
      {lightbox !== null && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setLightbox(null)}
        >
          <button
            style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <button
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
            onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={user.photos[lightbox]?.url}
            alt=""
            style={{ maxHeight: '90vh', maxWidth: '100%', objectFit: 'contain', borderRadius: 12 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
            onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(user.photos.length - 1, lightbox + 1)); }}
          >
            <ChevronRight size={24} />
          </button>
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
            {user.photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                style={{ width: i === lightbox ? 24 : 8, height: 8, borderRadius: 4, background: i === lightbox ? '#f43f5e' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox vídeo */}
      {activeVideo !== null && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setActiveVideo(null)}
        >
          <div style={{ width: '100%', maxWidth: 800 }} onClick={(e) => e.stopPropagation()}>
            <VideoPlayer video={user.videos[activeVideo]} onClose={() => setActiveVideo(null)} autoPlay />
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div className="profile-breadcrumb-inner" style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9ca3af', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }} onMouseOver={e => (e.currentTarget.style.color = '#e11d48')} onMouseOut={e => (e.currentTarget.style.color = '#9ca3af')}>Início</Link>
          <ChevronRight size={12} />
          <Link to="/acompanhantes" style={{ color: '#9ca3af', textDecoration: 'none' }} onMouseOver={e => (e.currentTarget.style.color = '#e11d48')} onMouseOut={e => (e.currentTarget.style.color = '#9ca3af')}>Acompanhantes</Link>
          <ChevronRight size={12} />
          <Link to={`/acompanhantes?city=${user.city}`} style={{ color: '#9ca3af', textDecoration: 'none' }} onMouseOver={e => (e.currentTarget.style.color = '#e11d48')} onMouseOut={e => (e.currentTarget.style.color = '#9ca3af')}>{user.city}</Link>
          <ChevronRight size={12} />
          <span style={{ color: '#374151', fontWeight: 600 }}>{user.name}</span>
        </div>
      </div>

      {/* Conteúdo principal encaixotado */}
      <div className="profile-content-inner" style={{ paddingTop: 28, paddingBottom: 40 }}>
        <div className="profile-grid" style={{ display: 'grid', gap: 28, alignItems: 'start', minWidth: 0 }}>

          {/* COLUNA ESQUERDA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Card de foto principal */}
            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

              {/* Header nome */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f9fafb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827', margin: 0 }}>{user.name}</h1>
                      <span style={{ fontSize: 18, color: '#9ca3af', fontWeight: 300 }}>{user.age} anos</span>
                      {user.isVerified && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 11, fontWeight: 700, borderRadius: 20 }}>
                          <BadgeCheck size={12} /> Verificada
                        </span>
                      )}
                      {user.plan === 'featured' && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', background: '#fff7ed', border: '1px solid #fed7aa', color: '#ea580c', fontSize: 11, fontWeight: 700, borderRadius: 20 }}>
                          <Crown size={12} /> Destaque
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
                      <MapPin size={13} color="#f43f5e" />
                      <span style={{ color: '#6b7280', fontSize: 13 }}>{user.neighborhood}, {user.city}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9ca3af', fontSize: 12 }}>
                    <Eye size={13} />
                    <span>{user.views.toLocaleString('pt-BR')} visitas</span>
                  </div>
                </div>
              </div>

              {/* Foto principal */}
              <div
                style={{ position: 'relative', cursor: 'pointer', aspectRatio: '4/3', background: '#111', overflow: 'hidden' }}
                onClick={() => setLightbox(currentPhoto)}
              >
                <img
                  src={user.photos[currentPhoto]?.url}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                />
                {user.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentPhoto(Math.max(0, currentPhoto - 1)); }}
                      style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      <ChevronLeft size={18} color="#374151" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentPhoto(Math.min(user.photos.length - 1, currentPhoto + 1)); }}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      <ChevronRight size={18} color="#374151" />
                    </button>
                  </>
                )}
                <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 11, borderRadius: 20, backdropFilter: 'blur(4px)' }}>
                  <Camera size={11} /> {currentPhoto + 1}/{user.photos.length}
                </div>
              </div>

              {/* Thumbnails */}
              {user.photos.length > 1 && (
                <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }}>
                  {user.photos.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentPhoto(i)}
                      style={{
                        flexShrink: 0, width: 64, height: 64, borderRadius: 10, overflow: 'hidden',
                        border: `2px solid ${i === currentPhoto ? '#f43f5e' : '#e5e7eb'}`,
                        cursor: 'pointer', padding: 0, background: 'none', transition: 'border-color 0.2s'
                      }}
                    >
                      <img src={p.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vídeos */}
            {user.videos && user.videos.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f9fafb', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Play size={15} color="#f43f5e" fill="#f43f5e" />
                  <h3 style={{ fontWeight: 800, color: '#111827', margin: 0, fontSize: 15 }}>Vídeos</h3>
                  <span style={{ padding: '2px 8px', background: '#ffe4e6', color: '#f43f5e', fontSize: 11, fontWeight: 700, borderRadius: 20 }}>{user.videos.length}</span>
                </div>
                <div style={{ padding: 16, display: 'grid', gridTemplateColumns: user.videos.length === 1 ? '1fr' : '1fr 1fr', gap: 12 }}>
                  {user.videos.map((video, i) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideo(i)}
                      style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', aspectRatio: '16/9', background: '#111', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      {video.thumbnail && (
                        <img src={video.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)' }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.92)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}>
                          <Play size={22} color="#f43f5e" style={{ marginLeft: 3 }} />
                        </div>
                      </div>
                      {video.duration && (
                        <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '3px 8px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 11, borderRadius: 6 }}>
                          {video.duration}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sobre mim */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f9fafb' }}>
                <h3 style={{ fontWeight: 800, color: '#111827', margin: 0, fontSize: 15 }}>Sobre mim</h3>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: 14, margin: 0 }}>{user.description}</p>
              </div>
            </div>

            {/* Serviços */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f9fafb' }}>
                <h3 style={{ fontWeight: 800, color: '#111827', margin: 0, fontSize: 15 }}>Serviços</h3>
              </div>
              <div style={{ padding: '16px 24px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {user.services.map((s) => (
                  <span key={s} style={{ padding: '6px 14px', background: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c', fontSize: 13, borderRadius: 20, fontWeight: 600 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Características */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f9fafb' }}>
                <h3 style={{ fontWeight: 800, color: '#111827', margin: 0, fontSize: 15 }}>Características</h3>
              </div>
              <div className="chars-grid" style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { icon: <User size={15} color="#f43f5e" />, label: 'Idade', value: `${user.age} anos` },
                  { icon: <Ruler size={15} color="#f43f5e" />, label: 'Altura', value: user.height },
                  { icon: <Weight size={15} color="#f43f5e" />, label: 'Peso', value: user.weight },
                  { icon: <Heart size={15} color="#f43f5e" />, label: 'Etnia', value: user.ethnicity },
                  { icon: <User size={15} color="#f43f5e" />, label: 'Cabelo', value: user.hairColor },
                  { icon: <Eye size={15} color="#f43f5e" />, label: 'Olhos', value: user.eyeColor },
                  { icon: <User size={15} color="#f43f5e" />, label: 'Físico', value: user.bodyType },
                  { icon: <MapPin size={15} color="#f43f5e" />, label: 'Cidade', value: user.city },
                  { icon: <Clock size={15} color="#f43f5e" />, label: 'Horários', value: user.schedule },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#f9fafb', borderRadius: 14 }}>
                    <div style={{ marginTop: 1 }}>{item.icon}</div>
                    <div>
                      <p style={{ color: '#9ca3af', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{item.label}</p>
                      <p style={{ color: '#111827', fontSize: 13, fontWeight: 700, margin: '3px 0 0' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA — sticky */}
          <div className="profile-sidebar" style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Card de contato */}
            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

              {/* Header do card */}
              <div style={{ padding: '20px 22px', background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', borderBottom: '1px solid #fecdd3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: '2px solid #f43f5e', flexShrink: 0 }}>
                    <img src={user.photos[0]?.url} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#111827', fontSize: 15, margin: 0 }}>{user.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <MapPin size={11} color="#f43f5e" />
                      <span style={{ fontSize: 11, color: '#6b7280' }}>{user.city}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 10, color: '#9ca3af', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>A partir de</p>
                    <p style={{ fontSize: 26, fontWeight: 900, color: '#111827', margin: '2px 0 0', lineHeight: 1 }}>{user.priceRange}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: '#fff', borderRadius: 20, border: '1px solid #fecdd3' }}>
                    <Clock size={12} color="#f43f5e" />
                    <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>{user.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div style={{ padding: '18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>

                {/* BOTÃO WHATSAPP — super chamativo */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '16px 20px',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff', fontWeight: 800, fontSize: 16,
                    borderRadius: 16, textDecoration: 'none',
                    boxShadow: '0 6px 24px rgba(34,197,94,0.40)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 32px rgba(34,197,94,0.50)';
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 24px rgba(34,197,94,0.40)';
                  }}
                >
                  <MessageCircle size={22} fill="white" />
                  Falar no WhatsApp
                </a>

                {/* Ver telefone */}
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px 20px',
                    background: '#f9fafb', border: '1px solid #e5e7eb',
                    color: '#374151', fontWeight: 600, fontSize: 13,
                    borderRadius: 14, cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = '#f3f4f6')}
                  onMouseOut={e => (e.currentTarget.style.background = '#f9fafb')}
                >
                  <Phone size={15} color="#6b7280" />
                  {showPhone ? (
                    <a href={`tel:${user.phone}`} onClick={(e) => e.stopPropagation()} style={{ color: '#f43f5e', fontWeight: 700, textDecoration: 'none' }}>
                      {user.phone}
                    </a>
                  ) : 'Ver telefone'}
                </button>

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, paddingTop: 4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9ca3af' }}>
                    <Eye size={12} /> {user.views.toLocaleString('pt-BR')} visitas
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#22c55e' }}>
                    <MessageCircle size={12} /> {user.whatsappClicks} contatos
                  </span>
                </div>
              </div>
            </div>

            {/* Badge verificada */}
            {user.isVerified && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#16a34a', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                  <BadgeCheck size={16} /> Perfil Verificado
                </div>
                <p style={{ color: '#15803d', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                  Identidade e fotos verificadas pela equipe Kryska. Perfil 100% autêntico.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ background: '#f9fafb', border: '1px solid #f1f5f9', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Shield size={13} color="#d1d5db" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ color: '#9ca3af', fontSize: 11, lineHeight: 1.6, margin: 0 }}>
                A Kryska é um espaço de anúncios para maiores de 18 anos. Não nos responsabilizamos pelo conteúdo dos perfis.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
