import React, { createContext, useState, useContext, useCallback, useEffect }from 'react';
import { Address } from '../types/Address';
import { getAddressesByUserId,createAddress,updateAddress,deleteAddress}from '../services/addressService';
import { User } from '../types/User';
import Cookies from 'js-cookie';
import { getCurrentUser } from '../services/authService';

interface AddressContextType {
  addresses: Address[];
  loading: boolean;
  error: string | null;
  user: User | undefined;
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Address) => Promise<Address>;
  updateExistingAddress: (id: number, addressData: Partial<Address>) => Promise<void>;
  removeAddress: (id: number) => Promise<void>;
  selectAddress: (address: Address) => void;
  selectedAddress: Address | null;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Fetch addresses for the current user
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('x-auth-token');
      if (token) {
        const currentUser = await getCurrentUser();
        console.log("currentUser",currentUser);
        setUser(currentUser);

        if (currentUser) {
          const userAddresses = await getAddressesByUserId(currentUser.id);
          setAddresses(userAddresses);

          if (userAddresses.length > 0) {
            setSelectedAddress(userAddresses[0]);
          }
        }
      } else {
        setError('No token found');
      }
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new address
  const addAddress = useCallback(async (address: Address) => {
    setLoading(true);
    setError(null);
    try {
      const newAddress = await createAddress(address);
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddress(newAddress);
      return newAddress;
    } catch (err) {
      setError('Failed to add address');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing address
  const updateExistingAddress = useCallback(async (id: number, addressData: Partial<Address>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedAddress = await updateAddress(id, addressData);
      setAddresses(prev =>
        prev.map(addr => addr.id === id ? updatedAddress : addr)
      );

      if (selectedAddress?.id === id) {
        setSelectedAddress(updatedAddress);
      }
    } catch (err) {
      setError('Failed to update address');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedAddress]);

  const removeAddress = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAddress(id);
      setAddresses(prev => prev.filter(addr => addr.id !== id));

      // If the selected address is deleted, select a new one
      if (selectedAddress?.id === id) {
        setSelectedAddress(addresses.length > 1 ? addresses[0] : null);  
      }
    } catch (err) {
      setError('Failed to delete address');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedAddress, addresses]);

  // Select an address
  const selectAddress = useCallback((address: Address) => {
    setSelectedAddress(address);
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <AddressContext.Provider 
      value={{ 
        addresses, 
        loading, 
        error, 
        user,
        fetchAddresses, 
        addAddress, 
        updateExistingAddress, 
        removeAddress,
        selectAddress,
        selectedAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
