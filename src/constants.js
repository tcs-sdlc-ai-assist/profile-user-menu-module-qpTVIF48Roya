export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  COMM_PREFERENCES: '/comm-preferences',
  SECURITY: '/security',
  BANK_MANAGEMENT: '/bank-management',
  BENEFICIARIES: '/beneficiaries',
  COST_BASIS: '/cost-basis',
  LOGOUT: '/logout',
  LOGIN: '/login',
  ACCOUNTS: '/accounts',
  HOLDINGS: '/holdings',
  ACTIVITY: '/activity',
  DOCUMENTS: '/documents',
  PRODUCTS_SERVICES: '/products-services',
};

export const NAVIGATION_ITEMS = [
  { key: 'accounts', label: 'Accounts', route: ROUTES.ACCOUNTS },
  { key: 'holdings', label: 'Holdings', route: ROUTES.HOLDINGS },
  { key: 'activity', label: 'Activity', route: ROUTES.ACTIVITY },
  { key: 'documents', label: 'Documents', route: ROUTES.DOCUMENTS },
  { key: 'productsServices', label: 'Products & Services', route: ROUTES.PRODUCTS_SERVICES },
];

export const MENU_ITEMS = [
  { key: 'profile', label: 'Profile', icon: 'user', route: ROUTES.PROFILE },
  { key: 'commPrefs', label: 'Communication Preferences', icon: 'mail', route: ROUTES.COMM_PREFERENCES },
  { key: 'security', label: 'Security', icon: 'lock', route: ROUTES.SECURITY },
  { key: 'bankMgmt', label: 'Bank Management', icon: 'landmark', route: ROUTES.BANK_MANAGEMENT },
  { key: 'beneficiaries', label: 'Beneficiaries', icon: 'users', route: ROUTES.BENEFICIARIES },
  { key: 'costBasis', label: 'Cost Basis', icon: 'calculator', route: ROUTES.COST_BASIS },
  { key: 'logout', label: 'Logout', icon: 'log-out', route: ROUTES.LOGOUT },
];

export const STORAGE_KEYS = {
  USER: 'invest_portal_user',
  SESSION: 'invest_portal_session',
  MENU_VERSION: 'invest_portal_menu_version',
};

export const MENU_VERSION = '1.0.0';