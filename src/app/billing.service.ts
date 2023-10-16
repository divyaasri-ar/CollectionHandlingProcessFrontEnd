import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OtpValidationRequest } from 'src/OtpValidationRequest';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl= 'localhost:8770/api/admin/login'

  constructor(private http: HttpClient) { }

  // login(email:string, password: string)
  // {
  //   return this.http.post<string>("http://localhost:8770/api/admin/login?email="+email+"&password="+password,email);
  // }
  login(email: string, password: string): Observable<string> {
    const body = { email, password }; // create an object with email and password properties
    return this.http.post<string>(`http://localhost:8770/api/admin/login`, body);
  }        
  
  loginCs(email: string, password: string): Observable<string> {
    const body = { email, password }; // create an object with email and password properties
    return this.http.post<string>(`http://localhost:8770/api/custsupport/login`, body);
  }   

  private baseUrl = 'http://localhost:8770/api/customers';

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  private payUrl = 'http://localhost:8770/api/customers/pending';
  processPayment(paymentDetails: any): Observable<any> {
    // Assuming your API endpoint for processing payments is 'this.apiUrl + '/payments'
    return this.http.post<any>(this.payUrl + '/payments', paymentDetails);
  }
  private aUrl = 'http://localhost:8770/api/customers';
  
  makePayment(customerId: number, paymentAmount: number): Observable<any> {
    const paymentDetails = {
      customerId: customerId,
      amount: paymentAmount
    };

    // Make an HTTP POST request to your API endpoint for processing payments
    return this.http.post<any>(`${this.aUrl}/payments`, paymentDetails);
  }

  getPendingCustomers(): Observable<any> {
    return this.http.get<any>(this.payUrl);
  }
  getOutstandingBill(customerId: number): Observable<number> {
    const outstandingBillUrl = `${this.aUrl}/${customerId}/outstanding-bill`;
    return this.http.get<number>(outstandingBillUrl);
  }
  private pUrl = 'http://localhost:8770/api/customers';
  updateCustomerStatus(customerId: number): Observable<any> {
    // Make HTTP request to update customer status to 'paid'
    return this.http.post(`${this.pUrl}/{customerId}/process`,customerId);
  }

  private dUrl = 'http://localhost:8770';
  deleteCustomerFromPendingDatabase(customerId: any): Observable<any> {
    // Make HTTP request to delete customer from pending database
    return this.http.delete(`${this.dUrl}/delete/{customerId}`);
  }

  // processPayment(customerId: number, paymentAmount: number): Observable<void> {
  //   const processPaymentUrl = `${this.aUrl}/${customerId}/process-payment`;
  //   const paymentDetails = {
  //     amount: paymentAmount
  //   };
  //   return this.http.post<void>(processPaymentUrl, paymentDetails);
  // }


  // generateOTP(phoneNumber: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/generate-otp`, phoneNumber);
  // }

  // verifyOTP(phoneNumber: string, otp: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/verify-otp`, { phoneNumber, otp });
  // }
  // login(adlog:any)

  // {

  //   return this.http.post<string>(`${this.apiUrl}`,+"/login",adlog);

  // }
}
