import { useState, useEffect } from 'react';
import { CartItem } from '../types/CartItem';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // SSR (Server-Side Rendering) kontrolü
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      
      // CartItem dizisi için özel kontrol
      if (key === 'sepetteki-ürünler' && item) {
        const parsedItems: CartItem[] = JSON.parse(item);
        
        // Her bir cart item için eksik alanları kontrol et ve doldur
        const normalizedItems = parsedItems.map(cartItem => ({
          id: cartItem.id,
          variantId: cartItem.variantId,
          quantity: cartItem.quantity || 1,
          name: cartItem.name,
          photo_src: cartItem.photo_src || '',
          price: cartItem.price || 0,
          flavor: cartItem.flavor || '',
          size: cartItem.size || '',
        }));

        return normalizedItems as T;
      }

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Değer fonksiyon ise çağır, değilse direkt kullan
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // CartItem dizisi için özel normalizasyon
      const processedValue = 
        key === 'sepetteki-ürünler' 
          ? (valueToStore as CartItem[]).map(cartItem => ({
              id: cartItem.id,
              variantId: cartItem.variantId,
              quantity: cartItem.quantity || 1,
              name: cartItem.name,
              photo_src: cartItem.photo_src || '',
              price: cartItem.price || 0,
              flavor: cartItem.flavor || '',
              size: cartItem.size || '',
            }))
          : valueToStore;

      setStoredValue(processedValue as T);
    } catch (error) {
      console.error('Error setting localStorage value:', error);
    }
  };

  useEffect(() => {
    try {
      // JSON.stringify ile dönüştürme
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}