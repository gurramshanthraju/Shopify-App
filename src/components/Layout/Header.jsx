import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, User } from 'lucide-react';

const Header = ({ title, breadcrumbs }) => {
  const { user, tenant } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 mt-1">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                  <span
                    className={
                      index === breadcrumbs.length - 1
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }
                  >
                    {crumb.label}
                  </span>
                </span>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Store:</span>
            <span className="font-medium text-gray-900">{tenant?.domain}</span>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
