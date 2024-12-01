export interface User {
  _id: string;
  email: string;
  password: string;
  __v: number;
}

export interface AuthUser {
  _id: string;
  email: string;
  password: string;
  token: string;
  __v: number;
}