import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createContext, useContext, useState } from 'react';

interface ShoppingCartContextProps {
  getItemAmount: (variantId: number) => number;
  increaseCartAmount: (cartItemData: CartItem) => void;
  decreaseCartAmount: (cartItemData: CartItem) => void;
  removeFromCart: (variantId: number) => void;
  getTotalPrice: () => number;
  cartItems: CartItem[];
  cartQuantity: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('sepetteki-ürünler', []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const getItemAmount = (variantId: number) => {
    return cartItems.find(item => item.variantId === variantId)?.quantity || 1;
  };

  const increaseCartAmount = (cartItemData: CartItem) => {
    setCartItems(currItems => {
      const existingItem = currItems.find(
        item => item.variantId === cartItemData.variantId && item.flavor === cartItemData.flavor
      );

      if (!existingItem) {
        return [...currItems, { ...cartItemData, quantity: 1 }];
      }

      return currItems.map(item =>
        item.variantId === cartItemData.variantId && item.flavor === cartItemData.flavor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const decreaseCartAmount = (cartItemData: CartItem) => {
    setCartItems(currItems => {
      const existingItem = currItems.find(
        item => item.variantId === cartItemData.variantId && item.flavor === cartItemData.flavor
      );

      if (existingItem?.quantity === 1) {
        return currItems.filter(
          item => !(item.variantId === cartItemData.variantId && item.flavor === cartItemData.flavor)
        );
      }

      return currItems.map(item =>
        item.variantId === cartItemData.variantId && item.flavor === cartItemData.flavor
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeFromCart = (variantId: number) => {
    setCartItems(currItems => currItems.filter(item => item.variantId !== variantId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemAmount,
        increaseCartAmount,
        decreaseCartAmount,
        removeFromCart,
        getTotalPrice,
        cartItems,
        cartQuantity,
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};