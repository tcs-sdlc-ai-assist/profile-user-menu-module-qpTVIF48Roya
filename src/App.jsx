import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constants.js';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AccountsPage from './pages/AccountsPage.jsx';
import HoldingsPage from './pages/HoldingsPage.jsx';
import ActivityPage from './pages/ActivityPage.jsx';
import DocumentsPage from './pages/DocumentsPage.jsx';
import ProductsServicesPage from './pages/ProductsServicesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CommunicationPreferencesPage from './pages/CommunicationPreferencesPage.jsx';
import SecurityPage from './pages/SecurityPage.jsx';
import BankManagementPage from './pages/BankManagementPage.jsx';
import BeneficiariesPage from './pages/BeneficiariesPage.jsx';
import CostBasisPage from './pages/CostBasisPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

/**
 * Root application component. Sets up React Router with BrowserRouter,
 * defines all routes: login (public), and protected routes wrapped in
 * Layout with ProtectedRoute guard. Routes include all navigation bar
 * pages and all profile menu pages. Includes catch-all 404 route.
 *
 * @returns {import('react').ReactElement}
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Protected routes wrapped in Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Redirect home to accounts */}
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.ACCOUNTS} replace />} />

            {/* Navigation bar pages */}
            <Route path={ROUTES.ACCOUNTS} element={<AccountsPage />} />
            <Route path={ROUTES.HOLDINGS} element={<HoldingsPage />} />
            <Route path={ROUTES.ACTIVITY} element={<ActivityPage />} />
            <Route path={ROUTES.DOCUMENTS} element={<DocumentsPage />} />
            <Route path={ROUTES.PRODUCTS_SERVICES} element={<ProductsServicesPage />} />

            {/* Profile menu pages */}
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.COMM_PREFERENCES} element={<CommunicationPreferencesPage />} />
            <Route path={ROUTES.SECURITY} element={<SecurityPage />} />
            <Route path={ROUTES.BANK_MANAGEMENT} element={<BankManagementPage />} />
            <Route path={ROUTES.BENEFICIARIES} element={<BeneficiariesPage />} />
            <Route path={ROUTES.COST_BASIS} element={<CostBasisPage />} />
          </Route>
        </Route>

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

App.displayName = 'App';

export default App;