import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Clock } from 'lucide-react';
import type { Video } from '../types';

interface Props {
  video: Video;
  onClose?: () => void;
  autoPlay?: boolean;
}

export default function VideoPlayer({ video, onClose, autoPlay = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    setProgress(dur > 0 ? (curr / dur) * 100 : 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * (videoRef.current.duration || 0);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2500) as unknown as ReturnType<typeof setTimeout>;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const openFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="relative w-full bg-black rounded-2xl overflow-hidden group select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={video.url}
        muted={muted}
        loop
        playsInline
        className="w-full aspect-video object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
        poster={video.thumbnail}
      />

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Title */}
      {video.title && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-black/60 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {video.title}
          </span>
        </div>
      )}

      {/* Big play button overlay (when paused) */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110">
            <Play className="w-7 h-7 text-rose-500 ml-1" />
          </div>
        </button>
      )}

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 z-10 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer mb-3 relative group/bar"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-rose-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-rose-400 transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-rose-400 transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-1 text-white/70 text-xs">
              <Clock className="w-3 h-3" />
              <span>{formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : video.duration || '0:00'}</span>
            </div>
          </div>
          <button
            onClick={openFullscreen}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-rose-400 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
