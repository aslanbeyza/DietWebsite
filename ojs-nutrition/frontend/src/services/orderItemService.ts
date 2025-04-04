import { apiRequest } from './apiHelper';

// Tüm sipariş öğelerini almak için
export const getOrderItems = async () => {
    return await apiRequest('GET', '/orderItem');
};

// Belirli bir sipariş öğesini almak için
export const getOrderItemById = async (orderItemId: number) => {
    return await apiRequest('GET', `/orderItem/${orderItemId}`);
};

// Yeni bir sipariş öğesi eklemek için
export const addOrderItem = async (orderItemData: { productId: number; quantity: number; }) => {
    console.log("Gönderilen addOrderItem:", orderItemData); 
    return await apiRequest('POST', '/orderItem', orderItemData);
};