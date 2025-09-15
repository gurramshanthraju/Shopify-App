import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomersForTenant, getOrdersForTenant, getProductsForTenant } from '../data/mockData';
import Header from '../components/Layout/Header';
import Table from '../components/UI/Table';
import { Search, Filter, Download, Users, ShoppingCart, Package } from 'lucide-react';

const DataExplorer = () => {
  const { tenant } = useAuth();
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!tenant) return null;

  const customers = getCustomersForTenant(tenant.id);
  const orders = getOrdersForTenant(tenant.id);
  const products = getProductsForTenant(tenant.id);

  const customerColumns = [
    {
      key: 'name',
      header: 'Name',
      render: (_, row) => (
        <div>
          <p className="font-medium text-gray-900">{row.firstName} {row.lastName}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      )
    },
    {
      key: 'ordersCount',
      header: 'Orders',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      render: (value) => (
        <span className="font-medium text-gray-900">${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      key: 'createdAt',
      header: 'Customer Since',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'lastOrderAt',
      header: 'Last Order',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Never'
    }
  ];

  const orderColumns = [
    {
      key: 'id',
      header: 'Order ID',
      render: (value) => (
        <span className="font-mono text-sm text-gray-900">#{value.slice(-8)}</span>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.customerEmail}</p>
        </div>
      )
    },
    {
      key: 'total',
      header: 'Value',
      render: (value) => (
        <span className="font-medium text-gray-900">${value.toFixed(2)}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'delivered' ? 'bg-green-100 text-green-800' :
          value === 'shipped' ? 'bg-blue-100 text-blue-800' :
          value === 'processing' ? 'bg-yellow-100 text-yellow-800' :
          value === 'pending' ? 'bg-gray-100 text-gray-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'itemsCount',
      header: 'Items',
      render: (value) => (
        <span className="text-gray-900">{value}</span>
      )
    },
    {
      key: 'createdAt',
      header: 'Order Date',
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const productColumns = [
    {
      key: 'name',
      header: 'Product',
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.category}</p>
        </div>
      )
    },
    {
      key: 'price',
      header: 'Price',
      render: (value) => (
        <span className="font-medium text-gray-900">${value.toFixed(2)}</span>
      )
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value > 20 ? 'bg-green-100 text-green-800' :
          value > 5 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value} units
        </span>
      )
    },
    {
      key: 'salesCount',
      header: 'Sales',
      render: (value) => (
        <span className="text-gray-900">{value} sold</span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      render: (value) => (
        <span className="font-medium text-gray-900">${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const tabs = [
    { id: 'customers', label: 'Customers', icon: Users, data: customers, columns: customerColumns },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, data: orders, columns: orderColumns },
    { id: 'products', label: 'Products', icon: Package, data: products, columns: productColumns }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const filteredData = activeTabData ? activeTabData.data.filter(item => {
    const searchableFields = Object.values(item).join(' ').toLowerCase();
    return searchableFields.includes(searchTerm.toLowerCase());
  }) : [];

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <Header 
        title="Data Explorer" 
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Data Explorer' }
        ]} 
      />
      
      <div className="p-6 space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200">
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.data.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTabData?.label.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData.length}</span> of{' '}
              <span className="font-medium">{activeTabData?.data.length}</span> {activeTabData?.label.toLowerCase()}
              {searchTerm && (
                <span> matching "<span className="font-medium">{searchTerm}</span>"</span>
              )}
            </p>
          </div>
        </div>

        {/* Data Table */}
        {activeTabData && (
          <Table
            columns={activeTabData.columns}
            data={filteredData}
          />
        )}
      </div>
    </div>
  );
};

export default DataExplorer;
