import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Sale } from '../models/sale';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SaleApiService {
  
  url: string = 'https://localhost:44358/api/sale'
  
  constructor(
    private _http: HttpClient
  ) { }

  add(sale: Sale): Observable<Response> {
    console.log(sale);
    return this._http.post<Response>(this.url, sale, httpOption)
  }
}
