import { Review } from "./Review";
import { Category } from "./Category";
import { PriceInfo } from "./PriceInfo";
import { Variant } from "./Variant";

export interface Product {
  commentCount: number;
  id: number;
  name: string;
  short_explanation: string;
  slug: string;
  photo_src: string;
  usage: string | null;
  features: string | null;
  description: string | null;
  comment_count: number;
  average_star: number;
  Reviews?: Review[];
  Categories?: Category[];
  PriceInfo?: PriceInfo[];
  Variants?: Variant[];
  tags: string;
  createdAt: string;
  updatedAt: string;
  reviewSummary?: {
    averageRating: number;
    reviewCount: number;
  };
}
