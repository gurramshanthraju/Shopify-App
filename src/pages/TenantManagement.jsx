import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockTenants } from '../data/mockData';
import Header from '../components/Layout/Header';
import { Plus, Building2, Globe, Key, CheckCircle, XCircle, Calendar } from 'lucide-react';

const TenantManagement = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    apiKey: ''
  });

  const handleAddTenant = (e) => {
    e.preventDefault();
    
    const tenant = {
      id: `tenant_${Date.now()}`,
      name: newTenant.name,
      domain: newTenant.domain.includes('.myshopify.com') ? newTenant.domain : `${newTenant.domain}.myshopify.com`,
      createdAt: new Date().toISOString(),
      apiKey: newTenant.apiKey || undefined,
      isConnected: !!newTenant.apiKey,
      lastSync: !!newTenant.apiKey ? new Date().toISOString() : undefined
    };

    // In a real app, this would be an API call
    mockTenants.push(tenant);
    
    setNewTenant({ name: '', domain: '', apiKey: '' });
    setShowAddForm(false);
  };

  const handleReconnect = (tenantId) => {
    // In a real app, this would trigger the Shopify OAuth flow
    const tenant = mockTenants.find(t => t.id === tenantId);
    if (tenant) {
      tenant.isConnected = true;
      tenant.lastSync = new Date().toISOString();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <Header 
        title="Tenant Management" 
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Tenant Management' }
        ]} 
      />
      
      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Connected Stores</h2>
            <p className="text-gray-600">Manage your Shopify store connections and API integrations.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Store</span>
          </button>
        </div>

        {/* Add Tenant Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect New Store</h3>
            <form onSubmit={handleAddTenant} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Awesome Store"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shopify Domain
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newTenant.domain}
                      onChange={(e) => setNewTenant(prev => ({ ...prev, domain: e.target.value }))}
                      className="w-full px-3 py-2 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="mystore"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      .myshopify.com
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key (Optional)
                </label>
                <input
                  type="text"
                  value={newTenant.apiKey}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="shpat_..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to configure later. You can generate this from your Shopify Admin.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Store
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tenant List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockTenants.map((tenant) => (
            <div key={tenant.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{tenant.domain}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {tenant.isConnected ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    tenant.isConnected ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tenant.isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900 flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(tenant.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>
                
                {tenant.apiKey && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">API Key:</span>
                    <span className="text-gray-900 flex items-center space-x-1">
                      <Key className="h-4 w-4" />
                      <span className="font-mono">
                        {tenant.apiKey.slice(0, 8)}...{tenant.apiKey.slice(-4)}
                      </span>
                    </span>
                  </div>
                )}

                {tenant.lastSync && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Sync:</span>
                    <span className="text-gray-900">
                      {new Date(tenant.lastSync).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  {!tenant.isConnected ? (
                    <button
                      onClick={() => handleReconnect(tenant.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Connect Store
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                      Sync Data
                    </button>
                  )}
                  <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Integration Guide</h3>
          <div className="space-y-3 text-sm text-blue-800">
            {[
              "Go to your Shopify Admin → Apps → Develop apps → Create an app",
              "Configure API scopes: read_customers, read_orders, read_products",
              "Generate Admin API access token and paste it above",
              "Your store data will sync automatically every hour"
            ].map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full text-blue-900 font-medium text-xs">
                  {idx + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900">{mockTenants.length}</h3>
            <p className="text-gray-600">Total Stores</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {mockTenants.filter(t => t.isConnected).length}
            </h3>
            <p className="text-gray-600">Connected</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <h3 className="text-2xl font-bold text-red-600">
              {mockTenants.filter(t => !t.isConnected).length}
            </h3>
            <p className="text-gray-600">Needs Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManagement;
