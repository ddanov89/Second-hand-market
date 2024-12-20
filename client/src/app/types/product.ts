import { AuthUser, User } from './user';

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  category: string;
  subscribers: User[];
  author: User;
  __v: number;
}

export interface Profile {
  products: Product[];
  email: AuthUser;
}

export interface SearchProducts {
  products: Product[];
  data: SearchQuery;
}

export interface SearchQuery {
  name: string;
  category: string;
}

