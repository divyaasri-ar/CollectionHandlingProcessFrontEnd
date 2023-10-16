import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-customersupport',
  templateUrl: './customersupport.component.html',
  styleUrls: ['./customersupport.component.css']
})
export class CustomersupportComponent {
  email: string = '';
  password: string = '';
  loginSuccessMessage: string = '';
  loginErrorMessage: string = '';

  constructor(private billingService: BillingService, private router: Router) { }

  loginUserCs() {
    this.billingService.loginCs(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.loginSuccessMessage = 'Login successful!';
        this.loginErrorMessage = ''; // Clear any previous error message
        this.router.navigate(['/customersupport/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginErrorMessage = 'Login failed. Please check your credentials and try again.';
        this.loginSuccessMessage = ''; // Clear any previous success message
      }
    );
  }
  // email: string='';
  // password: string='';

  // constructor(private router: Router) { }

 

  // loginUser() {

  //   if(this.email =='cust@gmail.com' && this.password == 'cs@123')
  //   {
  //     this.router.navigate(['/customersupport/home']);
  //   }
  //   else
  //   {
  //     console.log('Authentication failed. Please check your credentials.');
  //   }

  // }

}
