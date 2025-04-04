import { apiRequest } from './apiHelper';
import { PriceInfo } from '../types/PriceInfo';

// Tüm fiyat bilgilerini almak için
export const getPriceInfos = async () => {
    return await apiRequest('GET', '/priceInfo');
};

// Belirli bir fiyat bilgisini almak için
export const getPriceInfoById = async (priceInfoId: number) => {
    return await apiRequest('GET', `/priceInfo/${priceInfoId}`);
};

// Yeni bir fiyat bilgisi oluşturmak için
export const createPriceInfo = async (priceInfoData: PriceInfo) => {
    return await apiRequest('POST', '/priceInfo', priceInfoData);
};
