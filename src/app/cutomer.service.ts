import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CutomerService {
  private apiUrl = 'http://localhost:8770/api/customers';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // getCustomerById(customerId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/customers/${customerId}`);
  // }
  getCustomerById(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${customerId}`);
  }

  updateCustomerStatus(customerId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/customers/${customerId}`, { status });
  }
  getOutBill(customerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/customers/${customerId}/outstanding-bill`);
  }
  getOutstandingBill(customerId: number): Observable<number> {
    console.log(customerId)
    const url = `${this.apiUrl}/${customerId}/outstanding-bill`;
    return this.http.get<number>(url);
  }

}
