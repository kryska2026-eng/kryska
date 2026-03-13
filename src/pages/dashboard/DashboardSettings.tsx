import { useState } from 'react';
import { Save, Lock, Bell, Eye, EyeOff, Trash2, AlertTriangle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

export default function DashboardSettings() {
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    email_visits: true,
    email_whatsapp: false,
    email_payment: true,
    email_boost: true,
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Configurações</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Gerencie sua senha, notificações e privacidade
          </p>
        </div>

        {/* Alterar senha */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Lock size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Alterar senha</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Senha atual', field: 'current' as const },
              { label: 'Nova senha', field: 'new' as const },
              { label: 'Confirmar nova senha', field: 'confirm' as const },
            ].map(({ label, field }) => (
              <div key={field}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  {label}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passwords[field]}
                    onChange={e => setPasswords(prev => ({ ...prev, [field]: e.target.value }))}
                    style={{
                      width: '100%', padding: '10px 40px 10px 14px',
                      borderRadius: 10, fontSize: 14,
                      border: '1.5px solid #e2e8f0', outline: 'none',
                      boxSizing: 'border-box', color: '#1e293b'
                    }}
                    onFocus={e => e.target.style.borderColor = '#e11d48'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: 12, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8'
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            style={{
              marginTop: 16, display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer'
            }}
          >
            <Save size={16} />
            {saved ? 'Salvo!' : 'Salvar senha'}
          </button>
        </div>

        {/* Notificações */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Bell size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Notificações por email</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { key: 'email_visits' as const, label: 'Resumo diário de visitas', desc: 'Receba um email com as visitas do dia' },
              { key: 'email_whatsapp' as const, label: 'Cliques no WhatsApp', desc: 'Notificação a cada clique no seu número' },
              { key: 'email_payment' as const, label: 'Confirmações de pagamento', desc: 'Receba comprovantes de pagamento' },
              { key: 'email_boost' as const, label: 'Subidas expirando', desc: 'Aviso quando suas subidas estão acabando' },
            ].map(({ key, label, desc }) => (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px', borderRadius: 12, border: '1px solid #f1f5f9'
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: 'none',
                    backgroundColor: notifications[key] ? '#e11d48' : '#e2e8f0',
                    cursor: 'pointer', position: 'relative', transition: 'background-color 0.2s',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3,
                    left: notifications[key] ? 23 : 3,
                    width: 18, height: 18, borderRadius: '50%',
                    backgroundColor: '#fff', transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Zona de perigo */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #fee2e2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fef2f2',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertTriangle size={18} color="#dc2626" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#dc2626' }}>Zona de perigo</h3>
          </div>
          <div style={{
            padding: '14px', borderRadius: 12, backgroundColor: '#fef2f2',
            border: '1px solid #fee2e2', marginBottom: 14
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#dc2626' }}>
              Desativar perfil temporariamente
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: '#b91c1c', lineHeight: 1.5 }}>
              Seu perfil ficará oculto da listagem. Você pode reativar a qualquer momento.
            </p>
            <button style={{
              padding: '8px 16px', borderRadius: 10,
              border: '1.5px solid #dc2626', backgroundColor: 'transparent',
              color: '#dc2626', fontSize: 13, fontWeight: 600, cursor: 'pointer'
            }}>
              Desativar perfil
            </button>
          </div>
          <div style={{
            padding: '14px', borderRadius: 12, backgroundColor: '#fef2f2',
            border: '1px solid #fee2e2'
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#dc2626' }}>
              Excluir conta permanentemente
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: '#b91c1c', lineHeight: 1.5 }}>
              Todos os seus dados, fotos e histórico serão removidos permanentemente. Esta ação não pode ser desfeita.
            </p>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 10,
              border: 'none', backgroundColor: '#dc2626',
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer'
            }}>
              <Trash2 size={14} />
              Excluir minha conta
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
