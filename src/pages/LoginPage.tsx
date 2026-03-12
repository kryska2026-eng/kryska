import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();
  const from = (location.state as any)?.from || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    const result = await loginUser(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Erro ao fazer login.');
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setForgotSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg, #fff5f7 0%, #fff0f3 40%, #fef2f2 70%, #fff8f9 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar simples */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #fce7f3', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/">
          <img src="http://www.kryska.com.br/kryskalogo.png" alt="Kryska" style={{ height: 36, objectFit: 'contain' }} />
        </Link>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>
          <ArrowLeft size={16} />
          Voltar ao site
        </Link>
      </nav>

      {/* Conteúdo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Blobs decorativos */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, background: 'radial-gradient(circle, rgba(251,113,133,0.10) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

            <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 40px rgba(244,63,94,0.10)', border: '1px solid #fce7f3', padding: 40, position: 'relative' }}>

              {!forgotMode ? (
                <>
                  {/* Header */}
                  <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #f43f5e, #fb7185)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(244,63,94,0.30)' }}>
                      <Lock size={24} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: '0 0 6px' }}>Entrar na Kryska</h1>
                    <p style={{ color: '#9ca3af', fontSize: 14, margin: 0 }}>Acesse sua área de anunciante</p>
                  </div>

                  {/* Erro */}
                  {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                      <AlertCircle size={16} color="#ef4444" />
                      <p style={{ color: '#dc2626', fontSize: 14, margin: 0 }}>{error}</p>
                    </div>
                  )}

                  {/* Demo hint */}
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 14px', marginBottom: 20 }}>
                    <p style={{ color: '#15803d', fontSize: 12, margin: 0 }}>
                      <strong>Demo:</strong> valentina@email.com / 123456
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email</label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="seu@email.com"
                          style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = '#f43f5e'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Senha</label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={form.password}
                          onChange={e => setForm({ ...form, password: e.target.value })}
                          placeholder="••••••••"
                          style={{ width: '100%', paddingLeft: 40, paddingRight: 48, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = '#f43f5e'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9ca3af' }}>
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', marginBottom: 24 }}>
                      <button type="button" onClick={() => setForgotMode(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', fontSize: 13, padding: 0 }}>
                        Esqueci minha senha
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ width: '100%', padding: '14px', background: loading ? '#fda4af' : 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(244,63,94,0.30)', transition: 'all 0.2s' }}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                  </form>

                  <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 24, borderTop: '1px solid #f3f4f6' }}>
                    <p style={{ color: '#9ca3af', fontSize: 14, margin: '0 0 12px' }}>Ainda não tem conta?</p>
                    <Link to="/anunciar" style={{ display: 'inline-block', padding: '10px 24px', background: '#fff', border: '1.5px solid #f43f5e', borderRadius: 12, color: '#f43f5e', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                      Criar anúncio agora
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Recuperação de senha */}
                  <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #f43f5e, #fb7185)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(244,63,94,0.30)' }}>
                      <Mail size={24} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', margin: '0 0 6px' }}>Recuperar senha</h1>
                    <p style={{ color: '#9ca3af', fontSize: 14, margin: 0 }}>Enviaremos um link para o seu email</p>
                  </div>

                  {forgotSent ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 64, height: 64, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <span style={{ fontSize: 28 }}>✉️</span>
                      </div>
                      <p style={{ color: '#15803d', fontWeight: 600, marginBottom: 8 }}>Email enviado!</p>
                      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>Verifique sua caixa de entrada e spam.</p>
                      <button onClick={() => { setForgotMode(false); setForgotSent(false); }} style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                        Voltar ao login
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgot}>
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email cadastrado</label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={e => setForgotEmail(e.target.value)}
                            placeholder="seu@email.com"
                            style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                      <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
                        {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                      </button>
                      <button type="button" onClick={() => setForgotMode(false)} style={{ width: '100%', padding: '12px', background: 'none', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, color: '#6b7280', cursor: 'pointer' }}>
                        Voltar ao login
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Admin link */}
          <p style={{ textAlign: 'center', marginTop: 20, color: '#9ca3af', fontSize: 13 }}>
            É administrador?{' '}
            <Link to="/admin/login" style={{ color: '#f43f5e', textDecoration: 'none', fontWeight: 600 }}>
              Acesso admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
