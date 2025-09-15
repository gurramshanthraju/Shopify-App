import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  BarChart3, 
  Database, 
  Building2, 
  Settings, 
  LogOut,
  Store
} from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange }) => {
  const { logout, tenant } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'explorer', label: 'Data Explorer', icon: Database },
    { id: 'tenants', label: 'Tenant Management', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Store className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Shopify</h1>
          <p className="text-sm text-gray-500">{tenant?.name}</p>
        </div>

        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
