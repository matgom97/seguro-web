import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private apiUrl = 'http://localhost:5166/api/seguros';  // Cambia esta URL a tu API

  constructor(private http: HttpClient) { }

  createSeguro(seguro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, seguro);
  }

  getSeguros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSeguroById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteSeguro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  updateSeguro(id: number, seguro: any): Observable<any> {  // Cambié el tipo de id a string
    return this.http.put<any>(`${this.apiUrl}/${id}`, seguro);
  }

}
