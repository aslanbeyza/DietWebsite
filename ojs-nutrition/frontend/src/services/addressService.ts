import {apiRequest} from './apiHelper';
import { Address } from '../types/Address';

// Tüm adresleri al
export const getAddresses = async (): Promise<Address[]> => {
    const response = await apiRequest('GET', '/address');
    return response.data;
};
// Belirli bir adresi ID ile al
export const getAddressById = async (id: number): Promise<Address> => {
    const response = await apiRequest('GET', `/address/${id}`);
    return response.data;

};
// Yeni bir adres oluştur
export const createAddress = async (data: Address): Promise<Address> => {
    const response = await apiRequest('POST', '/address', data);
    return response.data; 

};
// Adresi güncelle
export const updateAddress = async (id: number, data: Partial<Address>): Promise<Address> => {
    const response = await apiRequest('PUT', `/address/${id}`, data);
    return response.data;
};
// Adresi sil
export const deleteAddress = async (id: number): Promise<void> => {
    const response = await apiRequest('DELETE', `/address/${id}`);
    return response.data;
  };
// Kullanıcı ID'sine göre tüm adresleri al
export const getAddressesByUserId = async (userId: number): Promise<Address[]> => {
    const response = await apiRequest('GET', `/address/user/${userId}`);
    return response.data;
};

// Kullanıcı ID'sine göre varsayılan adresi al
export const getDefaultAddressByUserId = async (userId: number): Promise<Address | null> => {
    const response = await apiRequest('GET', `/address/default/${userId}`);
    return response.data;
};