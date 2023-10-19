import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  email: string = '';
  password: string = '';
  loginSuccessMessage: string = '';
  loginErrorMessage: string = '';

  constructor(private billingService: BillingService, private router: Router) { }

  loginUser() {
    this.billingService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.loginSuccessMessage = 'Login successful!';
        this.loginErrorMessage = ''; // Clear any previous error message
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginErrorMessage = 'Login failed. Please check your credentials and try again.';
        this.loginSuccessMessage = ''; // Clear any previous success message
      }
    );
  }

  logout() {
    this.billingService.logout().subscribe(() => {
      console.log("logout successful");
      window.history.replaceState({}, document.title, '/home');
      window.location.href = '/home'; // You can change the redirect URL as needed
    });
  }

}





      // response => {
      //   // console.log(response);
      //   // let result = JSON.parse(response);
      //     // console.log(response.json())
      //   // if(response=='Login Successful')
      //   // {
      //   //   this.router.navigate(['/admin/home']);
      //   // }
      //   // else{
      //   //   console.error('Invalid Credentials');
      //   // }
      // }
 

    // if(this.email =='admin@gmail.com' && this.password == 'reset@123')
    // {
    //   this.router.navigate(['/admin/home']);
    // }
    // else
    // {
    //   console.log('Authentication failed. Please check your credentials.');
    // }

  
    // loginUser() {

    //   const adlogin=new login();
  
    //   adlogin.email=this.email;
  
    //   adlogin.password=this.password;
  
    //   console.log('1');
  
    //   let adl=this.billingService.login(adlogin);
  
    //   adl.subscribe(
  
    //     (response)=>{
  
    //       console.log('Login successful:',response);
  
    //       this.router.navigate(['/admin/home'])
  
    //     }
  
    //   );
  
    // }