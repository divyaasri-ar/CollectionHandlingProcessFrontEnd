import { Component } from '@angular/core';
import { BillingService } from '../billing.service';
import { OtpValidationRequest } from 'src/OtpValidationRequest';
import { OtpService } from '../otp.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {
  customers: any[] = [];
  phoneNumber: any;
  otpInput: any;
  
  constructor(private otpService: OtpService) { }
  ngOnInit(): void {
  const otpValidationRequest: OtpValidationRequest = {
    username: this.phoneNumber,
    otpNumber: this.otpInput
  };

  this.otpService.getCustomer(otpValidationRequest).subscribe(
    (response: any) => {
      console.log('OTP username transfered:', response);
    },
    error => {
      console.error('Error during OTP verification:', error);
      this.otpInput = '';
    }
  );
}
  
}
