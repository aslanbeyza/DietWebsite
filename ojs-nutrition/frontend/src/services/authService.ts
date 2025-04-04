import { apiRequest } from "./apiHelper";
import { User } from "../types/User";
import Cookies from "js-cookie";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiRequest("POST", "/auth/login", credentials);

  // Login başarılıysa token'ı cookie'ye kaydet
  if (response.data.token) {
    Cookies.set("x-auth-token", response.data.token, { expires: 1 }); // 1 gün süreyle
  }

  return response;
};

// Diğer fonksiyonlar aynı kalabilir
export const register = async (userData: User) => {
  const response = await apiRequest("POST", "/auth/register", userData);
  return response;
};

// E-posta doğrulama fonksiyonu
export const verifyEmail = async (token: string) => {
  return await apiRequest("POST", "/auth/verifyEmail", { token });
};

// Kullanıcı bilgilerini almak için me servisi
export const getCurrentUser = async () => {
  try {
    // Cookie'den token'ı al
    const token = Cookies.get("x-auth-token") as string;

    // Token varsa isteğe ekle
    const headers = {
      "x-auth-token": token,
    };

    // API isteği gönder
    const response = await apiRequest("GET", "/auth/me", undefined, headers);

    // Kullanıcı bilgilerini döndür
    return response.data.user;
  } catch (error) {
    console.error("Kullanıcı bilgileri alınamadı:", error);
    throw error;
  }
};
