import { apiRequest } from "./apiHelper";
import { Order } from "../types/Order";
import { OrderItem } from "../types/OrderItem";

export const createOrder = async (orderData: Partial<Order>) => {
  const response = await apiRequest<Partial<Order>>("POST","/order",orderData);
  console.log("createOrder", response.data);
  return response.data;
};

    //orderUser: `${BASE_URL}/order/user`,
    export const getOrders = async () => {
      const response = await apiRequest<Order[]>("GET", "/order/user");
      console.log("getOrders", response.data);
      return response.data;
    };
     

export const createOrderItem = async (orderItemData: Partial<OrderItem>) => {
  console.log("Gönderilen orderItemData createOrderItem", orderItemData);
  const response = await apiRequest<Partial<OrderItem>>(
    "POST",
    "/orderItem",
    orderItemData            
  );
  console.log("createOrderItem", response.data);

  return response.data;
};
  
