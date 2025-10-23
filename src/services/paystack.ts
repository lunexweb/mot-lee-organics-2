// Paystack payment integration
export interface PaystackConfig {
  publicKey: string;
  email: string;
  amount: number; // Amount in kobo (smallest currency unit)
  currency: string;
  reference: string;
  metadata?: Record<string, any>;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// Paystack public key - Get from environment variables
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here';

export const initializePaystack = (config: PaystackConfig): Promise<PaystackResponse> => {
  return new Promise((resolve, reject) => {
    // Check if Paystack script is loaded
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: config.email,
        amount: config.amount,
        currency: config.currency,
        ref: config.reference,
        metadata: config.metadata,
        callback: (response: any) => {
          resolve({
            status: true,
            message: 'Payment successful',
            data: response
          });
        },
        onClose: () => {
          reject({
            status: false,
            message: 'Payment cancelled by user'
          });
        }
      });
      
      handler.openIframe();
    } else {
      reject({
        status: false,
        message: 'Paystack script not loaded'
      });
    }
  });
};

// Load Paystack script dynamically
export const loadPaystackScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window object not available'));
      return;
    }

    // Check if script is already loaded
    if ((window as any).PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Paystack script'));
    };
    
    document.head.appendChild(script);
  });
};

// Generate unique reference
export const generateReference = (): string => {
  return `MOTLEE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Convert amount to kobo (Paystack uses kobo as smallest unit)
export const convertToKobo = (amount: number): number => {
  return Math.round(amount * 100);
};
