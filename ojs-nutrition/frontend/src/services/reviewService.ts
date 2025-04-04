import { apiRequest } from "./apiHelper";
import { Review } from "../types/Review";

// Tüm incelemeleri almak için
export const getReviews = async () => {
  return await apiRequest("GET", "/review");
};

// Belirli bir ürünün incelemelerini almak için
export const getReviewsForProduct = async (productId: number) => {
  const response = await apiRequest(
    "GET",
    `/product/${productId}?include=review`
  );
  return response.data.Reviews || [];
};

// Yeni bir inceleme oluşturmak için
export const createReview = async (reviewData: Review) => {
  console.log("createReview comment", reviewData);
  const response = await apiRequest("POST", "/review", reviewData);
  return response;
};
