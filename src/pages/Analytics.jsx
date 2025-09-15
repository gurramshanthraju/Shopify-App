import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomersForTenant, getOrdersForTenant } from '../data/mockData';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import LineChart from '../components/Charts/LineChart';
import { CalendarIcon, TrendingUp, Users, ShoppingCart, DollarSign, BarChart3 } from 'lucide-react';

const Analytics = () => {
  const { tenant } = useAuth();
  const [dateRange, setDateRange] = useState('30d');

  if (!tenant) return null;

  const customers = getCustomersForTenant(tenant.id);
  const orders = getOrdersForTenant(tenant.id);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const repeatPurchaseRate = customers.filter(c => c.ordersCount > 1).length / customers.length * 100;

  // Generate analytics data based on date range
  const generateAnalyticsData = (days) => {
    const data = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      const baseRevenue = Math.random() * 2000 + 1000;
      const baseOrders = Math.random() * 50 + 25;
      const baseCustomers = Math.random() * 20 + 10;

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.round(baseRevenue),
        orders: Math.round(baseOrders),
        customers: Math.round(baseCustomers)
      });
    }

    return data;
  };

  const getDaysFromRange = (range) => {
    switch (range) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  const analyticsData = generateAnalyticsData(getDaysFromRange(dateRange));

  const revenueData = analyticsData.map(d => ({ date: d.date, value: d.revenue }));
  const ordersData = analyticsData.map(d => ({ date: d.date, value: d.orders }));
  const customersData = analyticsData.map(d => ({ date: d.date, value: d.customers }));

  const topCustomers = customers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)
    .map(c => ({
      name: `${c.firstName} ${c.lastName}`,
      email: c.email,
      spent: c.totalSpent
    }));

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <Header 
        title="Analytics & Insights" 
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Analytics' }
        ]} 
      />

      <div className="p-6 space-y-6">
        {/* Date Range Selector */}
        <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-900">Date Range:</span>
          </div>
          <div className="flex space-x-2">
            {[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setDateRange(option.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  dateRange === option.value
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            change={{ value: 15, type: 'increase' }}
            icon={DollarSign}
          />
          <Card
            title="Average Order Value"
            value={`$${averageOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            change={{ value: 8, type: 'increase' }}
            icon={TrendingUp}
          />
          <Card
            title="Repeat Purchase Rate"
            value={`${repeatPurchaseRate.toFixed(1)}%`}
            change={{ value: 5, type: 'increase' }}
            icon={BarChart3}
          />
          <Card
            title="Customer Growth"
            value={customers.length.toLocaleString()}
            change={{ value: 12, type: 'increase' }}
            icon={Users}
          />
        </div>

        {/* Revenue Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart
            title="Revenue Trends"
            data={revenueData}
            color="#10B981"
            height={300}
          />
          <LineChart
            title="Orders Over Time"
            data={ordersData}
            color="#3B82F6"
            height={300}
          />
        </div>

        {/* Customer Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart
            title="Customer Growth"
            data={customersData}
            color="#8B5CF6"
            height={300}
          />

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top 5 Customers by Spend</h3>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${customer.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(customer.spent / Math.max(...topCustomers.map(c => c.spent))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
            <div className="space-y-3">
              {[
                { status: 'Delivered', count: 45, color: 'bg-green-500' },
                { status: 'Shipped', count: 23, color: 'bg-blue-500' },
                { status: 'Processing', count: 12, color: 'bg-yellow-500' },
                { status: 'Pending', count: 8, color: 'bg-gray-500' }
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-gray-700">{item.status}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
            <div className="space-y-3">
              {[
                { segment: 'VIP Customers', count: 12, percentage: 15 },
                { segment: 'Regular Customers', count: 34, percentage: 42 },
                { segment: 'New Customers', count: 28, percentage: 35 },
                { segment: 'At Risk', count: 6, percentage: 8 }
              ].map((item) => (
                <div key={item.segment} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.segment}</span>
                    <span className="font-medium">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="text-sm font-medium text-gray-900">3.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Customer Retention</span>
                  <span className="text-sm font-medium text-gray-900">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Cart Abandonment</span>
                  <span className="text-sm font-medium text-gray-900">24%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
