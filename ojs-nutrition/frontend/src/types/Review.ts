export interface Review {
  id?: number;
  ProductId: number;
  rating: number; // Rating, required and non-null
  description: string; // Description, required and non-null
  createdAt?: string; // Sequelize automatically manages these
  updatedAt?: string; // Sequelize automatically manages these

}
