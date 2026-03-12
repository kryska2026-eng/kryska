import { useState } from 'react';
import { Shield, AlertTriangle, X } from 'lucide-react';

interface Props {
  onConfirm: () => void;
}

export default function AgeGate({ onConfirm }: Props) {
  const [declined, setDeclined] = useState(false);

  /* ── Acesso negado ── */
  if (declined) {
    return (
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#030712' }}
        className="flex items-center justify-center p-6"
      >
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">Acesso Restrito</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Este site é exclusivo para maiores de 18 anos.<br />
            Você será redirecionado.
          </p>
        </div>
      </div>
    );
  }

  /* ── Modal principal ── */
  return (
    /* Overlay com position fixed, z-index altíssimo e fundo COMPLETAMENTE opaco */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(3, 7, 18, 0.98)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Glow rosa de fundo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(225,29,72,0.15) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Header gradiente */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #9f1239 100%)',
            padding: '32px 32px 28px',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <img
              src="http://www.kryska.com.br/kryskalogo.png"
              alt="Kryska"
              style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </div>

          {/* Badge 18+ */}
          <div
            style={{
              width: '76px', height: '76px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            }}
          >
            <span style={{ color: '#e11d48', fontWeight: 900, fontSize: '28px', lineHeight: 1 }}>18+</span>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ padding: '28px 32px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <Shield style={{ width: '16px', height: '16px', color: '#e11d48' }} />
            <h1 style={{ color: '#111827', fontSize: '20px', fontWeight: 700, margin: 0 }}>
              Verificação de Idade
            </h1>
          </div>

          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
            Este site contém <strong style={{ color: '#374151' }}>conteúdo adulto</strong> destinado
            exclusivamente a maiores de <strong style={{ color: '#374151' }}>18 anos</strong>.
            Ao continuar, você confirma ter 18 anos ou mais e concorda com os{' '}
            <span style={{ color: '#e11d48', fontWeight: 500, cursor: 'pointer' }}>Termos de Uso</span>.
          </p>

          {/* Botão confirmar */}
          <button
            onClick={onConfirm}
            style={{
              width: '100%',
              padding: '15px 0',
              background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              marginBottom: '10px',
              boxShadow: '0 4px 16px rgba(225,29,72,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            ✓ &nbsp;Tenho 18 anos ou mais — Entrar
          </button>

          {/* Botão recusar */}
          <button
            onClick={() => setDeclined(true)}
            style={{
              width: '100%',
              padding: '12px 0',
              background: 'transparent',
              color: '#9ca3af',
              fontWeight: 500,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <X style={{ width: '14px', height: '14px' }} />
            Tenho menos de 18 anos — sair
          </button>
        </div>

        {/* Rodapé */}
        <div
          style={{
            backgroundColor: '#f9fafb',
            borderTop: '1px solid #f3f4f6',
            padding: '12px 24px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#d1d5db', fontSize: '11px', margin: 0 }}>
            🔒 Seus dados estão protegidos &nbsp;·&nbsp; 🔞 Ribeirão Preto, SP – Brasil
          </p>
        </div>
      </div>
    </div>
  );
}
