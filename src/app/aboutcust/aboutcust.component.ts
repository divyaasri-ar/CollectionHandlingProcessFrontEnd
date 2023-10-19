import { Component } from '@angular/core';
import { BillingService } from '../billing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutcust',
  templateUrl: './aboutcust.component.html',
  styleUrls: ['./aboutcust.component.css']
})
export class AboutcustComponent {
  constructor(private billingService: BillingService, private router: Router) { }

  logout() {
    this.billingService.logout().subscribe(() => {
      console.log("logout successful");
      window.history.replaceState({}, document.title, '/home');
      window.location.href = '/home'; // You can change the redirect URL as needed
    });
  }

}
