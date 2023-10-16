import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CutomerService } from '../cutomer.service';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  customersList$: Observable<any[]> | undefined;
  // customerId: number | undefined;
   outstandingBill: number | undefined;
   selectedPaymentMethod: string | undefined;
   cardNumber: string | undefined;
   debitCardNumber: string | undefined;
   upiId: string | undefined;
   showAdditionalOptions: boolean | undefined;
   customersList: any[] = [];
   customerId: number=0;
   customerDetails: any;
 
 constructor(private route: ActivatedRoute, private customerService: CutomerService, private billingService: BillingService,private router: Router) {
   this.route.params.subscribe(params => {
     // console.log(this.route.queryParams)
     let customer:any = localStorage.getItem("userData");
     console.log(customer)
     this.customerId = customer; // Convert the id parameter to a number
     //this.customersList$ = this.customerService.getAllCustomers();
   });
 }
 
 ngOnInit(): void {
   if (this.customerId) {
     this.customerService.getCustomerById(this.customerId).subscribe(
       (data: any) => {
         this.customerDetails = data; // Store customer details in the variable
       },
       (error: any) => {
         console.error('Error loading customer details:', error);
       }
     );
   } else {
     console.error('Invalid customer ID');
     // Handle the error or show a user-friendly message
   }
   // Check if customerId is a valid number before making the API call
   if (!isNaN(this.customerId) && this.customerId !== null) {
     this.loadOutstandingBill();
   } else {
     console.error('Invalid customerId');
     // Handle the error or show a user-friendly message
   }
 }
 
 loadOutstandingBill(): void {
   this.customerService.getOutstandingBill(this.customerId).subscribe(
     (data: any) => {
       this.outstandingBill = data; // Assuming the API response contains the outstanding bill amount
     },
     (error: any) => {
       console.error('Error loading outstanding bill:', error);
     }
   );
 }
 goToPaymentPage() {
  // Navigate to the payment page
  this.router.navigate(['/paymentportal']);
}
 

}
