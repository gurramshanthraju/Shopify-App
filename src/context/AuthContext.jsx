import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, mockTenants } from '../data/mockData';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    const storedTenant = localStorage.getItem('tenant');
    
    if (storedUser && storedTenant) {
      setUser(JSON.parse(storedUser));
      setTenant(JSON.parse(storedTenant));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      const userTenant = mockTenants.find(t => t.id === foundUser.tenantId);
      if (userTenant) {
        setUser(foundUser);
        setTenant(userTenant);
        setIsAuthenticated(true);
        
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('tenant', JSON.stringify(userTenant));
        return true;
      }
    }
    return false;
  };

  const signup = async (email, password, name, tenantName) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTenant = {
      id: `tenant_${Date.now()}`,
      name: tenantName,
      domain: `${tenantName.toLowerCase().replace(/\s+/g, '-')}.myshopify.com`,
      createdAt: new Date().toISOString(),
      isConnected: false
    };

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      tenantId: newTenant.id,
      role: 'admin'
    };

    // In a real app, this would be stored in a database
    mockUsers.push(newUser);
    mockTenants.push(newTenant);

    setUser(newUser);
    setTenant(newTenant);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('tenant', JSON.stringify(newTenant));
    return true;
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
  };

  return (
    <AuthContext.Provider value={{
      user,
      tenant,
      login,
      signup,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
