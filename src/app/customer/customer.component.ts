import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';
import { OtpService } from '../otp.service';
import { OtpRequest } from 'src/OtpRequest';
import { OtpValidationRequest } from 'src/OtpValidationRequest';
import { ApiResponse } from 'src/ApiResponse';
import { HttpHeaders } from '@angular/common/http';
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

  // generateOtp(): void {
  //   const otpRequest: OtpRequest = {
  //     username: this.username, // You can replace this with an actual username or user ID
  //     phoneNumber: this.phoneNumber
  //   };

  //   this.otpService.sendOtp(otpRequest).subscribe(response => { 
  //     console.log('OTP Sent:', response);
  //     this.otpSent = true;
  //   });
  // }

  // generateOtp(): void {
  //   // Check if the provided phoneNumber exists in the customer database
  //   this.otpService.checkPhoneNumberExists(this.phoneNumber).subscribe(
  //     (response: any) => {
  //       if (response.exists) {
  //         const otpRequest: OtpRequest = {
  //           username: this.username, // You can replace this with an actual username or user ID
  //           phoneNumber: this.phoneNumber
  //         };

  //         this.otpService.sendOtp(otpRequest).subscribe(response => { 
  //           console.log('OTP Sent:', response);
  //           this.otpSent = true;
  //         });
  //       } else {
  //         alert('Invalid phone number. Please enter a registered phone number.');
  //       }
  //     },
  //     error => {
  //       console.error('Error checking phone number:', error);
  //       alert('Error checking phone number. Please try again.');
  //     }
  //   );
  // }

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
      this.otpService.otp=response.otp;
      console.log(this.otpService.otp);
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
