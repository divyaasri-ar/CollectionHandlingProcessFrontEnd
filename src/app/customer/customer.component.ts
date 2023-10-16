import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';
import { OtpService } from '../otp.service';
import { OtpRequest } from 'src/OtpRequest';
import { OtpValidationRequest } from 'src/OtpValidationRequest';
import { ApiResponse } from 'src/ApiResponse';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

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

    this.otpService.sendOtp(otpRequest).subscribe(response => { 
      console.log('OTP Sent:', response);
      this.otpSent = true;
    });
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
          this.router.navigate(['/customer/home']);
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

  // verifyOtp(): void {
  //   const otpValidationRequest: OtpValidationRequest = {
  //     username: this.username, // You can replace this with an actual username or user ID
  //     otpNumber: this.otpInput
  //   };

  //   this.otpService.validateOtp(otpValidationRequest).subscribe(response => {
  //     console.log('OTP Verification Response:', response);
  //     if (response === 'OTP is valid!') {
  //       this.otpVerified = true;
  //       this.router.navigate(['/customer/home']);
  //       // Redirect to customer home page or perform other actions upon successful OTP verification
  //     } else {
  //       alert('Invalid OTP. Please try again.');
  //       this.otpInput = '';
  //     }
  //   });
  // }

  // verifyOtp() {
  //   const otpValidationRequest: OtpValidationRequest = {
  //     username: this.username, // You can replace this with an actual username or user ID
  //     otpNumber: this.otpInput
  //   };

  //   this.otpService.validateOtp(otpValidationRequest).subscribe(response => {
  //     console.log('OTP Verification Response:', response);
  //       this.otpVerified = true;
  //       this.router.navigate(['/customer/home']);
  //       // Redirect to customer home page or perform other actions upon successful OTP verification
  //     } ,(error)=>{
  //       alert('Invalid OTP. Please try again.');
  //       this.otpInput = '';
  //     }
  //   );
  // }

}







  // constructor(private otpService: OtpService) {}

  //   sendOtp(otpRequest: OtpRequest): void {
  //       this.otpService.sendOtp(otpRequest)
  //           .subscribe(response => {
  //               console.log('OTP sent:', response);
  //               // Handle response here
  //           });
  //   }

  //   validateOtp(otpValidationRequest: OtpValidationRequest): void {
  //       this.otpService.validateOtp(otpValidationRequest)
  //           .subscribe(response => {
  //               console.log('OTP validation response:', response);
  //               // Handle response here
  //           });
  //         }
  //       }




//   phoneNumber: string = '';
//   otp: string = '';
//   isOtpSent: boolean = false;
//   isOtpVerified: boolean = false;

//   constructor(private billingService: BillingService) {}

//   generateOTP() {
//     this.billingService.generateOTP(this.phoneNumber).subscribe(
//       response => {
//         this.isOtpSent = true;
//       },
//       error => {
//         console.error(error);
//         // Handle error, show error message to the user
//       }
//     );
//   }

//   verifyOTP() {
//     this.billingService.verifyOTP(this.phoneNumber, this.otp).subscribe(
//       response => {
//         this.isOtpVerified = true;
//         // Redirect to customer home page
//       },
//       error => {
//         console.error(error);
//         // Handle error, show error message to the user
//       }
//     );
//   }
// }
// //------------------------------------------------//

//   email: string='';
//   password: string='';

//   constructor(private router: Router) { }

 

//   loginUser() {

//     if(this.email =='abc@gmail.com' && this.password == '123')
//     {
//       this.router.navigate(['/customer/home']);
//     }
//     else
//     {
//       console.log('Authentication failed. Please check your credentials.');
//     }

//   }

// }
