import { apiRequest } from './apiHelper';
import { Category } from '../types/Category';

export const getCategories = async () => {
    return await apiRequest('GET', '/category');
};

export const getCategoryById = async (id: number) => {
    return await apiRequest('GET', `/category/${id}`);
};
// Belirli bir kategorinin ürünlerini almak için
export const getProductsByCategoryId = async (categoryId: number) => {
    console.log("kategoriye göre ürünler",getProductsByCategoryId);
    return await apiRequest('GET', `/category/${categoryId}/products`);
};
// Yeni bir kategori eklemek için
export const addCategory = async (categoryData:Category) => {
  
    return await apiRequest('POST', '/category', categoryData);
};