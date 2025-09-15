// Mock Data

export const mockUsers = [
  {
    id: 'user_1',
    email: 'admin@fashionstore.com',
    name: 'Sarah Johnson',
    tenantId: 'tenant_1',
    role: 'admin'
  },
  {
    id: 'user_2',
    email: 'manager@techgadgets.com',
    name: 'Mike Chen',
    tenantId: 'tenant_2',
    role: 'admin'
  },
  {
    id: 'user_3',
    email: 'owner@homeboutique.com',
    name: 'Emma Davis',
    tenantId: 'tenant_3',
    role: 'admin'
  }
];

export const mockTenants = [
  {
    id: 'tenant_1',
    name: 'Fashion Forward Store',
    domain: 'fashionforward.myshopify.com',
    createdAt: '2024-01-15T10:00:00Z',
    apiKey: 'shpat_1234567890abcdef',
    isConnected: true,
    lastSync: '2024-12-28T14:30:00Z'
  },
  {
    id: 'tenant_2',
    name: 'Tech Gadgets Plus',
    domain: 'techgadgets.myshopify.com',
    createdAt: '2024-02-20T15:30:00Z',
    apiKey: 'shpat_abcdef1234567890',
    isConnected: true,
    lastSync: '2024-12-28T13:45:00Z'
  },
  {
    id: 'tenant_3',
    name: 'Home & Garden Boutique',
    domain: 'homeboutique.myshopify.com',
    createdAt: '2024-03-10T09:15:00Z',
    isConnected: false
  }
];

export const mockCustomers = [
  {
    id: 'cust_1',
    tenantId: 'tenant_1',
    email: 'alice.smith@email.com',
    firstName: 'Alice',
    lastName: 'Smith',
    totalSpent: 2450.00,
    ordersCount: 8,
    createdAt: '2024-01-20T10:00:00Z',
    lastOrderAt: '2024-12-25T14:30:00Z'
  },
  {
    id: 'cust_2',
    tenantId: 'tenant_1',
    email: 'bob.johnson@email.com',
    firstName: 'Bob',
    lastName: 'Johnson',
    totalSpent: 1890.50,
    ordersCount: 5,
    createdAt: '2024-02-15T11:30:00Z',
    lastOrderAt: '2024-12-20T16:45:00Z'
  },
  {
    id: 'cust_3',
    tenantId: 'tenant_1',
    email: 'carol.white@email.com',
    firstName: 'Carol',
    lastName: 'White',
    totalSpent: 3200.75,
    ordersCount: 12,
    createdAt: '2024-01-25T09:15:00Z',
    lastOrderAt: '2024-12-27T12:20:00Z'
  },
  {
    id: 'cust_4',
    tenantId: 'tenant_2',
    email: 'david.brown@email.com',
    firstName: 'David',
    lastName: 'Brown',
    totalSpent: 1560.25,
    ordersCount: 4,
    createdAt: '2024-03-01T14:20:00Z',
    lastOrderAt: '2024-12-26T10:30:00Z'
  }
];

export const mockOrders = [
  {
    id: 'order_1',
    tenantId: 'tenant_1',
    customerId: 'cust_1',
    customerEmail: 'alice.smith@email.com',
    customerName: 'Alice Smith',
    total: 299.99,
    status: 'delivered',
    createdAt: '2024-12-25T14:30:00Z',
    itemsCount: 3
  },
  {
    id: 'order_2',
    tenantId: 'tenant_1',
    customerId: 'cust_2',
    customerEmail: 'bob.johnson@email.com',
    customerName: 'Bob Johnson',
    total: 159.50,
    status: 'shipped',
    createdAt: '2024-12-26T09:15:00Z',
    itemsCount: 2
  },
  {
    id: 'order_3',
    tenantId: 'tenant_1',
    customerId: 'cust_3',
    customerEmail: 'carol.white@email.com',
    customerName: 'Carol White',
    total: 459.25,
    status: 'processing',
    createdAt: '2024-12-27T12:20:00Z',
    itemsCount: 5
  },
  {
    id: 'order_4',
    tenantId: 'tenant_2',
    customerId: 'cust_4',
    customerEmail: 'david.brown@email.com',
    customerName: 'David Brown',
    total: 799.99,
    status: 'delivered',
    createdAt: '2024-12-26T10:30:00Z',
    itemsCount: 1
  }
];

export const mockProducts = [
  {
    id: 'prod_1',
    tenantId: 'tenant_1',
    name: 'Premium Leather Jacket',
    category: 'Clothing',
    price: 299.99,
    stock: 25,
    salesCount: 45,
    revenue: 13499.55,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'prod_2',
    tenantId: 'tenant_1',
    name: 'Designer Handbag',
    category: 'Accessories',
    price: 199.99,
    stock: 15,
    salesCount: 32,
    revenue: 6399.68,
    createdAt: '2024-02-10T14:30:00Z'
  },
  {
    id: 'prod_3',
    tenantId: 'tenant_2',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 149.99,
    stock: 50,
    salesCount: 78,
    revenue: 11699.22,
    createdAt: '2024-02-20T11:15:00Z'
  },
  {
    id: 'prod_4',
    tenantId: 'tenant_2',
    name: 'Smartphone Case',
    category: 'Electronics',
    price: 29.99,
    stock: 120,
    salesCount: 156,
    revenue: 4678.44,
    createdAt: '2024-03-01T16:45:00Z'
  }
];

// Helper functions to get tenant-specific data
export const getCustomersForTenant = (tenantId) => {
  return mockCustomers.filter(customer => customer.tenantId === tenantId);
};

export const getOrdersForTenant = (tenantId) => {
  return mockOrders.filter(order => order.tenantId === tenantId);
};

export const getProductsForTenant = (tenantId) => {
  return mockProducts.filter(product => product.tenantId === tenantId);
};
