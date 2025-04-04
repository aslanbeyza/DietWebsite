export interface OrderItem {
    id?: number;
    amount: number;
    price: number;
    OrderId?: number; // Foreign key
    ProductId?: number; // Foreign key
    variantId: number; // Eklenen alan
    quantity: number; // quantity ekliyoruz
    imageUrl?: string;
    UserId?: number;
}