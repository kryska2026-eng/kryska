import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Image, Video, TrendingUp,
  CreditCard, Settings, LogOut, Menu, X, Bell,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
  { icon: User, label: 'Meu Perfil', path: '/dashboard/profile' },
  { icon: Image, label: 'Fotos', path: '/dashboard/photos' },
  { icon: Video, label: 'Vídeos', path: '/dashboard/videos' },
  { icon: TrendingUp, label: 'Subidas', path: '/dashboard/boosts' },
  { icon: CreditCard, label: 'Planos & Pagamentos', path: '/dashboard/billing' },
  { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate('/entrar');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40, display: 'block'
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed', top: 0, left: sidebarOpen ? 0 : '-280px',
        width: 260, height: '100vh', backgroundColor: '#fff',
        borderRight: '1px solid #f1f5f9', zIndex: 50,
        transition: 'left 0.3s ease', display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.06)'
      }}
        className="lg-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/">
              <img src="http://www.kryska.com.br/kryskalogo.png" alt="Kryska" style={{ height: 36 }} />
            </Link>
            <button onClick={() => setSidebarOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8'
            }} className="lg-hide">
              <X size={20} />
            </button>
          </div>
          <div style={{
            marginTop: 12, padding: '8px 12px', backgroundColor: '#fdf2f8',
            borderRadius: 10, border: '1px solid #fce7f3'
          }}>
            <p style={{ margin: 0, fontSize: 12, color: '#be185d', fontWeight: 600 }}>Área da Anunciante</p>
            <p style={{ margin: 0, fontSize: 11, color: '#9d174d' }}>Plano Destaque • Ativo</p>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10, marginBottom: 4,
                  backgroundColor: active ? '#fff1f5' : 'transparent',
                  color: active ? '#e11d48' : '#64748b',
                  textDecoration: 'none', fontWeight: active ? 600 : 400,
                  fontSize: 14, transition: 'all 0.15s'
                }}
              >
                <item.icon size={18} />
                {item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10, width: '100%',
              backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontSize: 14, textAlign: 'left'
            }}
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 0 }} className="dashboard-main">
        {/* Topbar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 30,
          backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9',
          padding: '0 20px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#64748b', padding: 4
              }}
            >
              <Menu size={22} />
            </button>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>
              {menuItems.find(m => m.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{
              position: 'relative', background: 'none', border: 'none',
              cursor: 'pointer', color: '#64748b', padding: 4
            }}>
              <Bell size={20} />
              <span style={{
                position: 'absolute', top: 0, right: 0,
                width: 8, height: 8, backgroundColor: '#e11d48',
                borderRadius: '50%', border: '2px solid #fff'
              }} />
            </button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9a8d4, #e11d48)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 14
          }}>{authUser?.name?.[0] ?? 'A'}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-inner">
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-sidebar { left: 0 !important; }
          .lg-hide { display: none !important; }
          .dashboard-main { margin-left: 260px !important; }
        }
      `}</style>
    </div>
  );
}
