import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OtpRequest } from 'src/OtpRequest';
import { OtpResponseDto } from './OtpResponseDto';
import { OtpValidationRequest } from 'src/OtpValidationRequest';
import { Observable } from 'rxjs';
import { pendcustomer } from 'src/pendcustomer';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  headers:any;

  private baseUrl = 'http://localhost:8770/otp'; 
  otp: any;

    constructor(private http: HttpClient) {}

    sendOtp(otpRequest: OtpRequest): Observable<OtpResponseDto> {
        return this.http.post<OtpResponseDto>(`http://localhost:8770/otp/send`, otpRequest);
    }

    validateOtp(otpValidationRequest: OtpValidationRequest): Observable<any> {
        return this.http.post<string>(`http://localhost:8770/otp/validate`, otpValidationRequest);
    }

    private otpUrl = 'http://localhost:8770';
    
    checkPhoneNumberExists(phoneNumber: string): Observable<any> {
      return this.http.post<string>(`${this.otpUrl}/otp/checkPhoneNumber`, phoneNumber, {
        headers: new HttpHeaders()
      });
    }

    private apiUrl = 'http://localhost:8770/customers'; 

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  private bpiUrl = 'http://localhost:8770'; 
  
  sendEmailToCustomer(customerId: number): Observable<any> {
    return this.http.post(`${this.bpiUrl}/email/${customerId}`, null);
  }

  
  private userUrl = 'http://localhost:8770/otp';

  getCustomer(otpValidationRequest: OtpValidationRequest): Observable<any> {
    console.log(otpValidationRequest);
    return this.http.post<String>(`${this.userUrl}/username`,otpValidationRequest);
    
  }
}
