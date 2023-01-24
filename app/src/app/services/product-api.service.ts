import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  url: string = 'https://localhost:44358/api/product';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  add(product: Product): Observable<Response> {
    return this.http.post<Response>(this.url, product, httpOption);
  }

  edit(product: Product): Observable<Response> {
    return this.http.put<Response>(this.url, product, httpOption);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${id}`);
  }
}
