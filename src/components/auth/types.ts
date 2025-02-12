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