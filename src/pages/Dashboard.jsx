import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomersForTenant, getOrdersForTenant, getProductsForTenant } from '../data/mockData';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import LineChart from '../components/Charts/LineChart';
import { Users, ShoppingCart, DollarSign, TrendingUp, Package, Building2 } from 'lucide-react';

const Dashboard = () => {
  const { tenant } = useAuth();
  
  if (!tenant) return null;

  const customers = getCustomersForTenant(tenant.id);
  const orders = getOrdersForTenant(tenant.id);
  const products = getProductsForTenant(tenant.id);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Generate mock trend data for the last 30 days
  const generateTrendData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const baseValue = Math.random() * 1000 + 500;
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.round(baseValue)
      });
    }
    
    return data;
  };

  const revenueTrend = generateTrendData();
  const ordersTrend = generateTrendData().map(d => ({ ...d, value: Math.round(d.value / 50) }));

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <Header 
        title="Dashboard" 
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Dashboard' }
        ]} 
      />
      
      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Total Customers"
            value={customers.length.toLocaleString()}
            change={{ value: 12, type: 'increase' }}
            icon={Users}
          />
          <Card
            title="Total Orders"
            value={orders.length.toLocaleString()}
            change={{ value: 8, type: 'increase' }}
            icon={ShoppingCart}
          />
          <Card
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            change={{ value: 15, type: 'increase' }}
            icon={DollarSign}
          />
          <Card
            title="Avg Order Value"
            value={`$${averageOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            change={{ value: 3, type: 'increase' }}
            icon={TrendingUp}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart
            title="Revenue Trend (Last 30 Days)"
            data={revenueTrend}
            color="#10B981"
          />
          <LineChart
            title="Orders Trend (Last 30 Days)"
            data={ordersTrend}
            color="#3B82F6"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${customer.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{customer.ordersCount} orders</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <ShoppingCart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {orders
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">#{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <Package className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {products
                .sort((a, b) => b.salesCount - a.salesCount)
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.salesCount} sold</p>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Store Connection Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Store Connection</h3>
                <p className="text-gray-600">{tenant.domain}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${tenant.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className={`text-sm font-medium ${tenant.isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {tenant.isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              {tenant.lastSync && (
                <p className="text-sm text-gray-500">
                  Last sync: {new Date(tenant.lastSync).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
