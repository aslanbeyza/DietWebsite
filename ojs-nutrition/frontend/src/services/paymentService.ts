import { apiRequest } from './apiHelper';
import { Payment } from '../types/Payment';

// Tüm ödemeleri almak için
export const getPayments = async () => {
    return await apiRequest('GET', '/payment');
};

// Belirli bir ödemeyi almak için
export const getPaymentById = async (paymentId: number) => {
    return await apiRequest('GET', `/payment/${paymentId}`);
};

// Yeni bir ödeme oluşturmak için
export const createPayment = async (paymentData: Payment) => {
    return await apiRequest('POST', '/payment', paymentData);
};