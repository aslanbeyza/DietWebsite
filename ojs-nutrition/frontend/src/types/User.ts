import { Review} from './Review';
import { Address} from './Address';

export interface User {
  id?: number; // Typically the primary key in Sequelize models
  name: string;
  lastName?: string;
  email: string;
  password: string;
  isVerified?: boolean;
  role: 'admin' | 'user'; // Limited to 'admin' or 'user' due to the validation rule in the model
  createdAt?: string; // Automatically added by Sequelize
  updatedAt?: string; // Automatically added by Sequelize

  // Optional association with Review
  Reviews?: Review[];
  Address?: Address[];
}
