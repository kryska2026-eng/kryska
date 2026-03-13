import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BadgeCheck, Volume2, VolumeX, Camera, Play, Crown } from 'lucide-react';
import type { User } from '../types';

interface Props {
  user: User;
  size?: 'normal' | 'large';
}

export default function ProfileCard({ user }: Props) {
  const mainPhoto = user.photos.find((p) => p.isMain) || user.photos[0];
  const hasVideo = user.videos && user.videos.length > 0;
  const video = hasVideo ? user.videos![0] : null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !hasVideo) return;
    if (isHovering) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovering, hasVideo]);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
      style={{ outline: user.plan === 'featured' ? '2px solid #fbbf24' : 'none' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── Foto / Vídeo ── */}
      <Link
        to={`/perfil/${user.id}`}
        className="block relative overflow-hidden bg-gray-100 flex-shrink-0"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Foto principal */}
        <img
          src={mainPhoto?.url}
          alt={user.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovering && hasVideo && videoReady ? 'opacity-0 scale-105' : 'opacity-100'
          } ${!hasVideo ? 'group-hover:scale-105' : ''}`}
          loading="lazy"
        />

        {/* Vídeo — toca no hover */}
        {hasVideo && video && (
          <video
            ref={videoRef}
            src={video.url}
            poster={video.thumbnail}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovering && videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            onCanPlay={() => setVideoReady(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

        {/* CANTO SUPERIOR ESQUERDO — Destaque */}
        {user.plan === 'featured' && (
          <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 20 }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 3,
              padding: '3px 8px',
              background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
              color: '#fff', fontSize: 10, fontWeight: 700,
              borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              textTransform: 'uppercase', letterSpacing: 0.5
            }}>
              <Crown size={10} /> Destaque
            </span>
          </div>
        )}

        {/* BADGE VÍDEO — canto superior direito (quando não está tocando) */}
        {hasVideo && !isHovering && (
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 20 }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 3,
              padding: '3px 7px',
              background: 'rgba(225, 29, 72, 0.85)',
              backdropFilter: 'blur(4px)',
              color: '#fff', fontSize: 10, fontWeight: 700,
              borderRadius: 6,
            }}>
              <Play size={9} fill="#fff" /> Vídeo
            </span>
          </div>
        )}

        {/* CONTROLE DE VOLUME — centro do vídeo quando está tocando */}
        {hasVideo && isHovering && videoReady && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}>
            <button
              onClick={toggleMute}
              style={{
                width: 44, height: 44,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {muted
                ? <VolumeX size={18} color="#fff" />
                : <Volume2 size={18} color="#fff" />
              }
            </button>
          </div>
        )}

        {/* Rodapé da foto: contador de fotos */}
        {user.photos.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 z-10">
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-black/40 backdrop-blur text-white text-[10px] rounded-md w-fit">
              <Camera className="w-2.5 h-2.5" /> {user.photos.length}
            </span>
          </div>
        )}
      </Link>

      {/* ── Info DENTRO do box, abaixo da foto ── */}
      <Link
        to={`/perfil/${user.id}`}
        className="flex items-center justify-between gap-2 px-3 py-2.5 bg-white flex-shrink-0"
      >
        {/* Esquerda: nome + verificada + cidade */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="text-gray-900 font-bold text-sm leading-tight truncate">
              {user.name}
            </h3>
            {user.isVerified && (
              <BadgeCheck size={14} className="text-emerald-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
            <span className="text-gray-400 text-xs truncate">{user.city}</span>
          </div>
        </div>

        {/* Direita: idade */}
        <span className="shrink-0 px-2 py-1 bg-rose-50 border border-rose-100 text-rose-500 text-[11px] font-bold rounded-lg whitespace-nowrap">
          {user.age} anos
        </span>
      </Link>
    </div>
  );
}
