import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    const result = await loginAdmin(form.username, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error || 'Credenciais inválidas.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 24, padding: 40, backdropFilter: 'blur(12px)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(99,102,241,0.40)' }}>
              <Shield size={28} color="#fff" />
            </div>
            <img src="http://www.kryska.com.br/kryskalogo.png" alt="Kryska" style={{ height: 32, objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Painel Administrativo</h1>
            <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 13, margin: 0 }}>Acesso restrito</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.30)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <AlertCircle size={16} color="#f87171" />
              <p style={{ color: '#f87171', fontSize: 14, margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Demo hint */}
          <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.30)', borderRadius: 12, padding: '10px 14px', marginBottom: 20 }}>
            <p style={{ color: '#a5b4fc', fontSize: 12, margin: 0 }}>
              <strong>Demo:</strong> admin / admin123
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.70)', marginBottom: 6 }}>Usuário</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="admin"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 12, fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.70)', marginBottom: 6 }}>Senha</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 48px 12px 16px', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 12, fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.50)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? 'rgba(99,102,241,0.50)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.40)' }}
            >
              {loading ? 'Entrando...' : 'Acessar Painel'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, color: 'rgba(255,255,255,0.40)', fontSize: 13 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.60)', textDecoration: 'none' }}>← Voltar ao site</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
