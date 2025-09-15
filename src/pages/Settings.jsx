import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Layout/Header';
import { User, Key, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const { user, tenant } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    tenantName: tenant?.name || '',
    tenantDomain: tenant?.domain || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: tenant?.apiKey || '',
    webhookUrl: '',
    syncFrequency: '1h'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    syncNotifications: false,
    securityAlerts: true,
    weeklyReports: true
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const handleSaveApiSettings = (e) => {
    e.preventDefault();
    console.log('Saving API settings:', apiSettings);
    alert('API settings saved successfully!');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    console.log('Saving notifications:', notifications);
    alert('Notification preferences saved!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Settings', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <Header 
        title="Settings" 
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Settings' }
        ]} 
      />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        isActive
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={profileData.role}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Name
                        </label>
                        <input
                          type="text"
                          value={profileData.tenantName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, tenantName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Domain
                        </label>
                        <input
                          type="text"
                          value={profileData.tenantDomain}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                  <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* API Settings Tab */}
              {activeTab === 'api' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">API Configuration</h3>
                  <form onSubmit={handleSaveApiSettings} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shopify API Key
                      </label>
                      <input
                        type="text"
                        value={apiSettings.apiKey}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="shpat_..."
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Your private app API key from Shopify Admin
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        value={apiSettings.webhookUrl}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://your-app.com/webhooks/shopify"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sync Frequency
                      </label>
                      <select
                        value={apiSettings.syncFrequency}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, syncFrequency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="15m">Every 15 minutes</option>
                        <option value="1h">Every hour</option>
                        <option value="6h">Every 6 hours</option>
                        <option value="24h">Daily</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save API Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                  <form onSubmit={handleSaveNotifications} className="space-y-6">
                    <div className="space-y-4">
                      {['emailAlerts','syncNotifications','securityAlerts','weeklyReports'].map((key) => {
                        const labels = {
                          emailAlerts: ['Email Alerts','Get notified about important events via email'],
                          syncNotifications: ['Sync Notifications','Get notified when data sync completes'],
                          securityAlerts: ['Security Alerts','Get notified about security-related events'],
                          weeklyReports: ['Weekly Reports','Receive weekly analytics reports']
                        };
                        return (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{labels[key][0]}</h4>
                              <p className="text-sm text-gray-500">{labels[key][1]}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[key]}
                                onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Preferences</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
