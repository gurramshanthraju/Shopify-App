// User
function createUser(id, email, name, tenantId, role) {
  return {
    id,
    email,
    name,
    tenantId,
    role // 'admin' or 'user'
  };
}

// Tenant
function createTenant(id, name, domain, createdAt, isConnected, apiKey, lastSync) {
  return {
    id,
    name,
    domain,
    createdAt,
    isConnected,
    apiKey,   // optional
    lastSync  // optional
  };
}

// Customer
function createCustomer(id, tenantId, email, firstName, lastName, totalSpent, ordersCount, createdAt, lastOrderAt) {
  return {
    id,
    tenantId,
    email,
    firstName,
    lastName,
    totalSpent,
    ordersCount,
    createdAt,
    lastOrderAt // optional
  };
}

// Order
function createOrder(id, tenantId, customerId, customerEmail, customerName, total, status, createdAt, itemsCount) {
  return {
    id,
    tenantId,
    customerId,
    customerEmail,
    customerName,
    total,
    status, // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    createdAt,
    itemsCount
  };
}

// Product
function createProduct(id, tenantId, name, category, price, stock, salesCount, revenue, createdAt) {
  return {
    id,
    tenantId,
    name,
    category,
    price,
    stock,
    salesCount,
    revenue,
    createdAt
  };
}

// Analytics
function createAnalytics(totalCustomers, totalOrders, totalRevenue, averageOrderValue, repeatPurchaseRate, customerGrowth, orderTrends, topCustomers) {
  return {
    totalCustomers,
    totalOrders,
    totalRevenue,
    averageOrderValue,
    repeatPurchaseRate,
    customerGrowth, // array of { date, count }
    orderTrends,    // array of { date, orders, revenue }
    topCustomers    // array of { name, email, spent }
  };
}

// Example Usage:
// const user1 = createUser('u1', 'a@a.com', 'Alice', 't1', 'admin');
// const tenant1 = createTenant('t1', 'Store A', 'storea.com', '2025-01-01', true);

module.exports = {
  createUser,
  createTenant,
  createCustomer,
  createOrder,
  createProduct,
  createAnalytics
};
