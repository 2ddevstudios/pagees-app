const Urls = {
  signup: "/user-auth/create-account",
  login: "/user-auth/login",
  verifyOtp: "/user-auth/verify-otp",
  verifyPasswordResetOtp: "/user-auth/verify-password-reset-otp",
  resetPassword: "/user-auth/reset-password-otp",
  changePassword: '/user-auth/reset-password',

  uploadFile: "/file-upload/upload",
  uploadMultiple: "file-upload/upload-multiple",

  getUser: "/user",
  updateUser: "/user",
  auth: '/user-auth',

  validateToken: '/user-auth/validate-token',
  wallet: '/wallet',
  pin: '/pin',
  bank: '/bank',
  wishlist: '/wishlist',
  schedule: '/schedule',
  profile: '/profile',
  address: '/address',
  transactions: '/transactions',
  projects: '/projects',
  reservations: '/reservation',
  paymment: '/payment',
  investment: '/investment',
  investmentPlan: '/investment-plan',
  notification: '/notification',
  withdrawal: '/withdrawal/process',
  document: '/documents',
  agent: '/agent',

  // properties
  getProperty: '/property',
  // dynamic routes
  createAccountPassword: (userId: number) =>
    `/user-auth/create-account-password/${userId}`,
  resendOtp: (userId: string) => `/user-auth/resend-otp/${userId}`,
  resetPasswordOtp: (phone: string) => `/user-auth/reset-password-otp/${phone}`,
  getPropertyById: (id: number) => `/property/${id}`,
  updates: (type: 'ESP'|"MAIN_APP") => `/updates/${type}`,

};

export default Urls;
