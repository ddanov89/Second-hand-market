import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, Profile, SearchProducts } from './types/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    
    return this.http.get<Product[]>(`/api/catalog`);
  }

  getProductDetails(id: string){
    
    return this.http.get<Product>(`/api/catalog/${id}`);
  }

  createProduct(name: string | null | undefined, image: string | null | undefined, description: string | null | undefined, price: string | null | undefined, category: string | null | undefined) {
    
    const payload = {name, image, description, price, category};
    return this.http.post<Product>(`/api/create`, payload);
  }

  updateProduct(productId: string, data: {}) {
    
    return this.http.put<Product>(`/api/edit/${productId}`, data);
  }

  deleteProduct(productId: string) {
    
    return this.http.delete<Product>(`/api/delete/${productId}`);
  }

  searchProducts(name: string | null | undefined, category: string | null | undefined){
    const result =  this.http.get<SearchProducts>(`/api/search` + `?name=${name}&category=${category}`);
    console.log("the products are", result);
    return result;
  }

  subscribeToProduct(productId: string | null | undefined, userId: string | null | undefined) { 
    return this.http.post<Product>(`/api/subscribe/${productId}`, userId);
  }

  getUserProfile() {
    return this.http.get<Profile>(`/api/profile`);
  }
}
