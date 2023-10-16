import { Component } from '@angular/core';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: any[] = [];
  paymentAmount: number = 0;


  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.billingService.getAllCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Error loading customers:', error);
      }
    );
  }
  makePayment(customerId: number): void {
    if (this.paymentAmount <= 0) {
      alert('Invalid payment amount.');
      return;
    }

    this.billingService.makePayment(customerId, this.paymentAmount).subscribe(
      (      response: any) => {
        console.log('Payment successful:', response);
        // Optionally, update the UI or navigate to another page upon successful payment
        this.loadCustomers(); // Reload customers after payment
      },
      (      error: any) => {
        console.error('Error making payment:', error);
        alert('Error making payment. Please try again later.');
      }
    );
  }
  // customers: any[] = [];

  // constructor(private billingService: BillingService ) { }

  // ngOnInit(): void {
  //   this.billingService.getAllCustomers().subscribe(data => {
  //     this.customers = data;
  //   });
  // }

}
