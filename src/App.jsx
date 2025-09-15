import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import DataExplorer from './pages/DataExplorer';
import TenantManagement from './pages/TenantManagement';
import Settings from './pages/Settings';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSignup, setIsSignup] = useState(false);

  if (!isAuthenticated) {
    if (isSignup) {
      return <SignupPage onToggleAuth={() => setIsSignup(false)} />;
    }
    return <LoginPage onToggleAuth={() => setIsSignup(true)} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'explorer':
        return <DataExplorer />;
      case 'tenants':
        return <TenantManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
