import { Component, OnInit } from '@angular/core';
import { OtpService } from '../otp.service';
import { pendcustomer } from 'src/pendcustomer';

@Component({
  selector: 'app-pendingcustomer-list',
  templateUrl: './pendingcustomer-list.component.html',
  styleUrls: ['./pendingcustomer-list.component.css']
})
export class PendingcustomerListComponent implements OnInit {
  // customers: any[] = [];
  customers: pendcustomer[] | undefined;

  constructor(private otpService: OtpService) { }

  
  // ngOnInit(): void {
  //   this.otpService.getAllCustomers().subscribe(data => {
  //     this.customers = data;
  //   });

  // }
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.otpService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  sendEmailToCustomer(customer: pendcustomer): void {
    this.otpService.sendEmailToCustomer(customer.id).subscribe(response => {
      console.log(response); // Handle the response as needed
      // Optionally, you can update the customer status or show a notification to the user
    });
  }
}
