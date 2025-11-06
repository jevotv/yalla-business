export const periods = ['Today', 'This Week', 'This Month'];

export const trendPeriods = ['Daily', 'Weekly', 'Monthly'];

export const salesGoal = 75; // 75%

export const dashboardCards = [
  {
    icon: 'analytics',
    title: 'Sales',
    subtitle: 'Total Sales',
    value: '$1,450.75',
    change: '+12.5%',
    changeType: 'positive'
  },
  {
    icon: 'shopping-cart',
    title: 'Purchase',
    subtitle: 'New Orders',
    value: '32',
    change: '-3.1%',
    changeType: 'negative'
  },
  {
    icon: 'inventory-2',
    title: 'Inventory',
    subtitle: 'Inventory Value',
    value: '$28,300',
    change: '+1.2%',
    changeType: 'positive'
  },
  {
    icon: 'group',
    title: 'Customers',
    subtitle: 'Manage and view customer information',
    description: true
  },
  {
    icon: 'account-balance-wallet',
    title: 'Treasury',
    subtitle: 'Track your cash flow and finances',
    description: true
  },
  {
    icon: 'bar-chart',
    title: 'Reports',
    subtitle: 'Generate sales and inventory reports',
    description: true
  },
  {
    icon: 'assignment-return',
    title: 'Returns',
    subtitle: 'Manage product returns and exchanges',
    description: true
  },
  {
    icon: 'language',
    title: 'Build Your Website',
    subtitle: 'Create and manage your online store',
    description: true
  }
];

export const recentActivities = [
  {
    icon: 'receipt-long',
    title: 'New Order #1024 received',
    time: '2 minutes ago',
    type: 'positive'
  },
  {
    icon: 'warning',
    title: "Low stock: 'Product X' (3 left)",
    time: '1 hour ago',
    type: 'negative'
  },
  {
    icon: 'payments',
    title: 'Payment for Order #1021',
    time: 'Yesterday',
    type: 'primary'
  }
];

export const salesTrendData = {
  value: '$1,450.75',
  change: '+12.5% vs last week'
};

// User data
export const userData = {
  greeting: 'Good Morning, Alex',
  monthlySalesGoal: {
    current: 15000,
    target: 20000,
    percentage: 75
  }
};

// Customer data
export const customers = [
  {
    id: 1,
    name: 'Eleanor Vance',
    email: 'eleanor.v@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1OH9NLWEpDsxL3sfWXu4XR8twwim_WovpHT1OR1nm9kjt33GZiu0TGK2FXw-w60ISolZ0GtyB4_WCmeYTt2v7rrRBUzu4k2SDD0hu1LuAucien5neg_UYcl0b8ljGqkIzXnRo_7DPGSNml0TU6Bb2v5KE0yxhNYIcKNCj9gtw-YR4zyHuR9BAwIOijBqEaEfXXSrby2Vn86bxuTFkSC8LoyeXH7-zTSznzoxKvCVp1nWuOuYuvg7Sz1w4sdS97kraogigdOG_Kw',
    totalSales: 1250,
    tier: 'silver'
  },
  {
    id: 2,
    name: 'Marcus Holloway',
    email: 'm.holloway@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQeau3YW0EEygU0ywBvY37MxAqXV0fkzQHo8RspWJSMVWmrHWz9aymt--K5SgcKw-b7Nyp9TN6V-VGcRKCYGADiHTGCtTdvt8WvC3aVownEPzlBS0Fpbhx4ehXdgk1nRncnrfE5terCgLTRHMG23tjVNfrvRPwJaKS4LcTmVYm2hHq4LfiIqNlfrw-SQZwk618NSEGJge5fqUgOKaGOxGRwexk6xfrAEt8E7FNKkhnj9G8L_jlkin5qmu3_OlC0UM6LYXwkUAo2A',
    totalSales: 870,
    tier: 'bronze'
  },
  {
    id: 3,
    name: 'Clara Oswald',
    email: 'clara.o@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmG2okGlvVdNbt5pIubA-4aUzXXMIS434XFvUIu6TpycNpfu5XoOs2efuCHFdf8r7781iiHwIA-n9cbkKg4OCg254tkx0-LndGFOcgRIHRfG1Wtqn6coF-6XeTaJkf47y19tAApu1PI7iKIhHEJQ6BH044dUxat0SuyMqCDOCzmz5JNd6XaPgt8pIESJf4IHBsD0X0CAPKEjesHj-q6p5f7s_dq9xmhx6cOkiLih2UpVzFu_-De-4jSWYNokHaOBBdmzwVYy8mLg',
    totalSales: 2400,
    tier: 'gold'
  },
  {
    id: 4,
    name: 'Kenji Tanaka',
    email: 'kenji.tanaka@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqI5vGmybH4J5brBJAc_AKnsL7nzpIttpBHvo4CWGr-F0vXx_cIoSUIMwkQeE_V7FrH733Qc7R-z7G0o1S2YaapHqtWC2C9MrVSU3meno23kc7FlHk1BthxGm7YkmTdjiyh-XsdyumT5qXbmshKHKZ-XhENOa1F2tbTAWqD18bLJGGzcDv2jyVt9r9b_aQr-jY54EhB5EV-oRLyiSxRYUU-W33mUL9P5BSl1b8ibo0S59MKym1Dx2JiATbmo-0KEb4CqXuL98yyw',
    totalSales: 550,
    tier: 'bronze'
  }
];

export const customerKPIs = {
  newCustomers: {
    value: 12,
    period: 'هذا الشهر',
    expandedMetrics: [
      { label: 'عدد العملاء الإجمالي', value: '152' },
      { label: 'إجمالي أرصدة العملاء المدينة', value: '15,430 $' },
      { label: 'عدد العملاء النشطين هذا الشهر', value: '45' },
      { label: 'أكبر 3 عملاء من حيث حجم المبيعات (هذا الشهر)', value: 'Eleanor Vance: 2,400 $\nMarcus Holloway: 1,850 $\nClara Oswald: 1,200 $' }
    ]
  }
};

// Navigation items
export const navigationItems = {
  left: [
    { icon: 'assignment-return', label: 'Return' },
    { icon: 'shopping-cart', label: 'Purchase' }
  ],
  right: [
    { icon: 'call-received', label: 'Receive' },
    { icon: 'payments', label: 'Pay' }
  ],
  fab: {
    icon: 'smart-toy',
    size: 32,
    color: 'white'
  }
};

// Product data
export const products = [
  {
    id: 1,
    name: 'Premium Product A',
    grade: 'A',
    stock: 15,
    price: 150.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcUGXdOqy59BZqpt4YKeG56omTut30s0_B3pSdDOn80HQREEfHA1BHBogZUA1JeAvjv62-PkM85mWjF04GF8apg9f7Afm3X8WhNXq3_Yxw9eDooKkAF2Sv-MP5I0uAqRzh9QvVU2pxR7umq2Qreo5CXQpe35LtJRINnfeWoCqO2E9bNRwSgnMpKjYL3tVXDD2w1CbwXA9gDU-vhzrRvSwCZGGQWYWkGVj-r2D4C9BpEheNukSknmMfNXYVQWAGiSvTqzDoZT2XpA',
    category: 'Electronics',
    description: 'A premium quality gadget in a sleek box'
  },
  {
    id: 2,
    name: 'Standard Product B',
    grade: 'B',
    stock: 8,
    price: 99.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Qq9Lb-0793umEGf9K8KTYCalPY9qqE8UpfcFeg91ZpnCJOd4R2KCgEe9gzxvffSAXTQhpbI1zVhVJIRd59QSS13twUzZaCZes2zpJOB3niIGN2fQlfu0MRX5M58RhTVHCI2RxgqG9_HyiTYpr58mmzTUiqr-InCZ_NHRi5afFtrM0389wvR2VdoXteTTnEmuh37YjWVTSEV5QVSbZyfgsT06TT-UGZ6SAlYgeIWACaqwW4rAcms4wNfEj5zDTsx2o_OeYHB7aA',
    category: 'Electronics',
    description: 'A standard electronic device on a plain background'
  },
  {
    id: 3,
    name: 'Basic Product C',
    grade: 'C',
    stock: 22,
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdn66NxYAvqGYeQHW-QzJOvlegquckaUQgpL1AM5l2eEoAP6cwWdxZsNYGP0qOXOGgmo2xq_yZZdt7HI1u1aG7gZF0qtcryim4X2ImDSANZYqV7Xi6tH1qSCA3z27b6W4D2R2fyqoZG5z3o-hhNKDBklVZyI26dupIdgf_8gUug58--MegMBDhX8cA6gm26R_4D2YMAPqBFvZW-AJ5EC8B4-n8sXti47gSmzUebcJluceRh2uSgR19s5RHMGRhYoxyX_bZ0JNccA',
    category: 'Accessories',
    description: 'A simple, basic product in minimal packaging'
  },
  {
    id: 4,
    name: 'Open-Box Gadget D',
    grade: 'A',
    stock: 5,
    price: 120.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJD5DNu2ap09WE3G0h7jKA7G0dG3MfQ96eUp8-RO5NvVuOT1AQLIN0gbVC1n2z855Xk3afxzs_Nrf7QBPGBWmvi5JO32Z1CC0XAc84xMTKS1KL252VvrVXArmZs4ThBzPwWOjoJan9_DSuZmuRkK2mn1WSokQCPHl5BWcxxO0023KWPTHuz2HyeggGuvKTLeQPa1-Kt5zP_5nv-Q5v-5-EGGGEU0T516tne_gVmTtz1wJfzlsqDoayrTe6neBynE4hTm_wJiRSfg',
    category: 'Refurbished',
    description: 'An open-box electronic item, looking new'
  },
  {
    id: 5,
    name: 'Wireless Headphones',
    grade: 'A',
    stock: 12,
    price: 89.99,
    image: 'https://via.placeholder.com/300x300/135bec/ffffff?text=Headphones',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    id: 6,
    name: 'USB-C Cable',
    grade: 'B',
    stock: 30,
    price: 12.99,
    image: 'https://via.placeholder.com/300x300/135bec/ffffff?text=USB-C+Cable',
    category: 'Accessories',
    description: 'High-speed USB-C charging and data cable'
  }
];

export const categories = [
  { key: 'all', label: 'all' },
  { key: 'electronics', label: 'electronics' },
  { key: 'accessories', label: 'accessories' },
  { key: 'refurbished', label: 'refurbished' }
];