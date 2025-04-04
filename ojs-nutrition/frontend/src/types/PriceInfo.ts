import { Variant } from './Variant';
import { Product } from './Product';

export interface PriceInfo {
  id: number; // Primary key
  profit: number | null; // Profit margin, optional
  total_price: number; // Total price, required
  discounted_price: number | null; // Discounted price, optional
  price_per_servings: number; // Price per serving, required
  discount_percentage: number | null; // Discount percentage, optional
  VariantId?: string; // Foreign key referencing Variant (UUID type)
  ProductId?: number; // Foreign key referencing Product (integer type)
  Variant?: Variant[]; // Associated Variant, optional
  Product?: Product; // Associated Product, optional

}
