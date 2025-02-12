export const subscriptionApi = {
    getPlans: async (): Promise<Plan[]> => {
        return [
            {
                id: 'basic',
                name: 'Basic',
                price: 9.99,
                features: ['Fonctionnalité 1', 'Fonctionnalité 2']
            }
        ];
    },

    processPayment: async (planId: string, paymentDetails: PaymentDetails) => {
        console.log('Processing payment for plan:', planId, 'with details:', paymentDetails);
        return new Promise((resolve) => setTimeout(resolve, 1500));
    }
};

export interface Plan {
    id: string;
    name: string;
    price: number;
    features: string[];
}

export interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}