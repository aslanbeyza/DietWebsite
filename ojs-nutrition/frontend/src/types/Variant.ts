import { PriceInfo } from './PriceInfo';
import { Product } from './Product';
import { Size } from './Size';

// Define the Variant interface
export interface Variant {
  Sizes: Size[];
  id:number; // UUID
  flavor: string;
  aroma_photo?: string;
  photo_src?: string;
  is_available: boolean;
  Product?: Product; // Association with Product model (optional)
  PriceInfos: PriceInfo[];
}