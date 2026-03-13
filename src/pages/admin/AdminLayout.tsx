import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CheckSquare, CreditCard,
  Package, Settings, LogOut, Menu, X, ChevronRight, Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin' },
  { icon: Users, label: 'Anunciantes', path: '/admin/users' },
  { icon: CheckSquare, label: 'Verificações', path: '/admin/verifications' },
  { icon: CreditCard, label: 'Pagamentos', path: '/admin/payments' },
  { icon: Package, label: 'Planos', path: '/admin/plans' },
  { icon: Settings, label: 'Configurações', path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAdmin } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a' }}>
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 40
        }} />
      )}

      {/* Sidebar escura */}
      <aside style={{
        position: 'fixed', top: 0, left: sidebarOpen ? 0 : '-280px',
        width: 240, height: '100vh', backgroundColor: '#0f172a',
        borderRight: '1px solid #1e293b', zIndex: 50,
        transition: 'left 0.3s ease', display: 'flex', flexDirection: 'column'
      }} className="admin-sidebar">
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Shield size={16} color="#fff" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fff' }}>kryska.com.br</p>
                <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>Painel Admin</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#64748b'
            }} className="admin-hide">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 10, marginBottom: 2,
                  backgroundColor: active ? '#1e293b' : 'transparent',
                  color: active ? '#f8fafc' : '#64748b',
                  textDecoration: 'none', fontWeight: active ? 600 : 400,
                  fontSize: 14, transition: 'all 0.15s', borderLeft: active ? '3px solid #e11d48' : '3px solid transparent'
                }}
              >
                <item.icon size={17} />
                {item.label}
                {active && <ChevronRight size={13} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '1px solid #1e293b' }}>
          <button onClick={() => { logoutAdmin(); navigate('/admin/login'); }} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 10, width: '100%',
            backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
            color: '#64748b', fontSize: 14
          }}>
            <LogOut size={17} /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Topbar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 30,
          backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b',
          padding: '0 20px', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setSidebarOpen(true)} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#64748b'
            }}>
              <Menu size={20} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc' }}>
              {menuItems.find(m => m.path === location.pathname)?.label || 'Admin'}
            </span>
          </div>
          <div style={{
            padding: '4px 12px', borderRadius: 20,
            backgroundColor: '#1e293b', border: '1px solid #334155',
            fontSize: 12, color: '#94a3b8'
          }}>
            Admin
          </div>
        </header>

        <main style={{ flex: 1, padding: '24px 20px', backgroundColor: '#f8fafc' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar { left: 0 !important; }
          .admin-hide { display: none !important; }
          .admin-main { margin-left: 240px !important; }
        }
      `}</style>
    </div>
  );
}
