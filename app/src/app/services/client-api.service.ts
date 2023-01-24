import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  url: string = 'https://localhost:44358/api/client';

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  add(client: Client): Observable<Response> {
    return this.http.post<Response>(this.url, client, httpOption);
  }

  edit(client: Client): Observable<Response> {
    return this.http.put<Response>(this.url, client, httpOption);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${id}`);
  }
}
