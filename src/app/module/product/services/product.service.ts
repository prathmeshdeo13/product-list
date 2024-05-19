import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http : HttpClient) { }


  getProduct(skip: number, limit: number):Observable<any[]>{
    return this.http.get<[]>(`https://dummyjson.com/product?skip=${skip}&limit=${limit}`)
  }

  getByProductId(id: number):Observable<any[]>{
   return this.http.get<any[]>(`https://dummyjson.com/products/${id}`)
  }

  updateProduct(id: number, data: any): Observable<any> {
    const url = `https://dummyjson.com/products/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, data, { headers });
  }

  deleteProduct(id: number):Observable<any>{
    return this.http.delete<any>(`https://dummyjson.com/products/${id}`)
  }
}


