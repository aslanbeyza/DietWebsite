import axios from 'axios';
import { endpoints } from './api';
import { User } from '../types/User';
import { apiRequest } from './apiHelper';

export const getUsers = async () => {
    return await axios.get(endpoints.user);
};

export const  getUserById = async (userId: number): Promise<User> => {
    try {
      const response = await apiRequest<User>('GET', `/user/${userId}`);
      console.log("getUserById",response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${userId}:`, error);
      throw error;
    }
  }