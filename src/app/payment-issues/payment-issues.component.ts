import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BillingService } from '../billing.service';

import { CutomerService } from '../cutomer.service';

import { Ticket } from 'src/Ticket';

import { pendcustomer } from 'src/pendcustomer';

 

@Component({

  selector: 'app-payment-issues',

  templateUrl: './payment-issues.component.html',

  styleUrls: ['./payment-issues.component.css']

})

export class PaymentIssuesComponent {

 

 

  outstandingBill: number = 0;

  selectedDuration: number | undefined;

  splitAmounts: number | undefined;

  ticket: Ticket = {

    customerId:0,

    selectedIssue: '',

        otherIssue: '',

        selectedPriority: '',

        email: ''

 

  };

  customerId: any;

  customerDetails: any;

  outbill: any;

  name: any;

  mobile: any;

  email: any;

  selectedIssue: string | undefined;

  otherIssue: string | undefined;

  selectedPriority: string | undefined;

  id: any;

 

  constructor(private route: ActivatedRoute, private billingService: BillingService, private customerService: CutomerService) { }

 

  ngOnInit(): void {

    let customer: any = localStorage.getItem('userData');

    this.customerId = customer;

   

    if (!isNaN(this.customerId) && this.customerId !== null) {

      this.customerService.getCustomerById(this.customerId).subscribe(

        (data: any) => {

          this.customerDetails = data;

          this.id=this.customerDetails.id;

          this.outstandingBill = this.customerDetails.outbill;

          this.name=this.customerDetails.name;

          this.mobile=this.customerDetails.mobile;

          this.email=this.customerDetails.email;

          console.log(this.customerDetails.outbill);

          console.log(this.customerDetails.id);

          //this.calculateInstallment();

        },

        (error: any) => {

          console.error('Error loading customer details:', error);

        }

      );

    } else {

      console.error('Invalid customer ID');

    }

  }

 

selectedFile: File | undefined;

 

handleFileInput(event: any) {

  this.selectedFile = event.target.files[0];

}

 

raiseTicket(ticket: Ticket):void {

  this.ticket.selectedIssue = this.selectedIssue!;

  this.ticket.otherIssue=this.otherIssue!;

  this.ticket.selectedPriority=this.selectedPriority!;

  this.ticket.email=this.customerDetails.email;

  this.ticket.customerId=this.customerDetails.id;

 

  this.billingService.saveTicket(this.ticket).subscribe(

    (response: any) => {

        console.log('Ticket Raised successful:', response);

        this.billingService.sendEmailToTicketCustomer(this.customerId).subscribe((response: any) => {

          console.log("Email");

          console.log(this.customerId);

          console.log(response);

        })

    },

    (error: any) => {

        console.error('Error occurred while processing ticket:', error);

       

    },

   

);

  }

}