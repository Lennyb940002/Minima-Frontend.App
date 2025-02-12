export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface User {
  email: string;
  planId?: string;
}

export type AuthType = 'login' | 'register';