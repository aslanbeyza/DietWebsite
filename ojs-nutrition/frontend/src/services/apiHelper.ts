/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./api";
import Cookies from "js-cookie";

// Generic tür kullanarak veri tipini tanımlayın
export const apiRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: T,
  headers?: Record<string, string> // Header'ları opsiyonel olarak ekle
): Promise<any> => {
  const token = Cookies.get("x-auth-token");
  const url = `${BASE_URL}${endpoint}`;
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
      ...headers,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    // Hata yönetimi
    console.error(`Error with ${method} request to ${url}:`, error);
    throw error; // Hatanın üst katmana iletilmesini sağlar
  }
};
