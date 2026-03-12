import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';

import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import ProfilePage from './pages/ProfilePage';
import PlansPage from './pages/PlansPage';
import AdvertisePage from './pages/AdvertisePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Dashboard
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardProfile from './pages/dashboard/DashboardProfile';
import DashboardPhotos from './pages/dashboard/DashboardPhotos';
import DashboardVideos from './pages/dashboard/DashboardVideos';
import DashboardBoosts from './pages/dashboard/DashboardBoosts';
import DashboardBilling from './pages/dashboard/DashboardBilling';
import DashboardSettings from './pages/dashboard/DashboardSettings';

// Admin
import AdminHome from './pages/admin/AdminHome';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVerifications from './pages/admin/AdminVerifications';
import AdminPayments from './pages/admin/AdminPayments';

const AGE_GATE_KEY = 'kryska_age_confirmed';

const FULL_PAGE_ROUTES = ['/dashboard', '/admin', '/entrar', '/anunciar', '/admin/login'];

function AppLayout() {
  const location = useLocation();
  const [ageConfirmed, setAgeConfirmed] = useState(() => {
    return sessionStorage.getItem(AGE_GATE_KEY) === 'true';
  });

  const handleConfirm = () => {
    sessionStorage.setItem(AGE_GATE_KEY, 'true');
    setAgeConfirmed(true);
  };

  const isFullPage = FULL_PAGE_ROUTES.some(r => location.pathname.startsWith(r));

  return (
    <>
      <ScrollToTop />
      {!ageConfirmed && <AgeGate onConfirm={handleConfirm} />}
      <div className="page-wrapper" style={!ageConfirmed ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' } : {}}>
        {!isFullPage && <Navbar />}
        <main style={{ width: '100%', overflowX: 'hidden' }}>
          <Routes>
            {/* Público */}
            <Route path="/" element={<HomePage />} />
            <Route path="/acompanhantes" element={<ListingPage />} />
            <Route path="/perfil/:id" element={<ProfilePage />} />
            <Route path="/planos" element={<PlansPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Auth */}
            <Route path="/entrar" element={<LoginPage />} />
            <Route path="/anunciar" element={<AdvertisePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Dashboard — protegido */}
            <Route path="/dashboard" element={<ProtectedRoute type="user"><DashboardHome /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute type="user"><DashboardProfile /></ProtectedRoute>} />
            <Route path="/dashboard/photos" element={<ProtectedRoute type="user"><DashboardPhotos /></ProtectedRoute>} />
            <Route path="/dashboard/videos" element={<ProtectedRoute type="user"><DashboardVideos /></ProtectedRoute>} />
            <Route path="/dashboard/boosts" element={<ProtectedRoute type="user"><DashboardBoosts /></ProtectedRoute>} />
            <Route path="/dashboard/billing" element={<ProtectedRoute type="user"><DashboardBilling /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute type="user"><DashboardSettings /></ProtectedRoute>} />

            {/* Admin — protegido */}
            <Route path="/admin" element={<ProtectedRoute type="admin"><AdminHome /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute type="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/verifications" element={<ProtectedRoute type="admin"><AdminVerifications /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute type="admin"><AdminPayments /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {!isFullPage && <Footer />}
      </div>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
