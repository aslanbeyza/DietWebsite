import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';
import { getCurrentUser } from '../services/authService';

// Context için tip tanımları
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Context oluşturma
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context Provider bileşeni
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Kullanıcı bilgisi alınamadı:', error);
      }
    };
    fetchUser();
    /* localde tutma     
        login olanı userda tutma  sepete hem localde tut hem de db kaydet  speet drumunu da sakla
        kullanıcının baktıgı son urun 
        user içinde endpoint ac  array  lastViewed içinde obje tut  orderin id si var mı  yoksa o ürünü başa ekle sondan sil
        
    */
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};