import { Component } from '@angular/core';
import { OtpService } from '../otp.service';
import { Router } from '@angular/router';
import { OtpRequest } from 'src/OtpRequest';
import { OtpValidationRequest } from 'src/OtpValidationRequest';

@Component({
  selector: 'app-customeroptions-login',
  templateUrl: './customeroptions-login.component.html',
  styleUrls: ['./customeroptions-login.component.css']
})
export class CustomeroptionsLoginComponent {

  username: string='';
  phoneNumber: string='';
  otpInput: string='';
  otpSent: boolean = false;
  otpVerified: boolean = false;

  constructor(private otpService: OtpService, private router: Router) { }

  generateOtp(): void {
    const otpRequest: OtpRequest = {
      username: this.username, // You can replace this with an actual username or user ID
      phoneNumber: this.phoneNumber
    };
    this.otpService.checkPhoneNumberExists(this.phoneNumber).subscribe(
          (response: any) => {
            console.log("login success",response);

    this.otpService.sendOtp(otpRequest).subscribe(response => { 
      console.log('OTP Sent:', response);
      this.otpSent = true;
    });
  },
  error => {
          console.error('Error checking phone number:', error);
          alert('Error checking phone number. Please try again.');
        }
      );
    }


  
  verifyOtp(): void {
    const otpValidationRequest: OtpValidationRequest = {
      username: this.phoneNumber,
      otpNumber: this.otpInput
    };

    this.otpService.validateOtp(otpValidationRequest).subscribe(
      (response: any) => {
        console.log('OTP Verification Response:', response.customer.id);
        localStorage.setItem("userData",response.customer.id);
        if (response.status === "success") {
          this.otpVerified = true;
          // Redirect to customer home page upon successful OTP verification
          this.router.navigate(['/paymentoptions']);
        } else {
          alert('Invalid OTP. Please try again.');
          this.otpInput = '';
        }
      },
      error => {
        console.error('Error during OTP verification:', error);
        alert('Error during OTP verification. Please try again.');
        this.otpInput = '';
      }
    );
  }
}

