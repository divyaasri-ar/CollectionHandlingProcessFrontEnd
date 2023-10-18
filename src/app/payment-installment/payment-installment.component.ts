import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { Installment } from 'src/Installment';
import { ActivatedRoute } from '@angular/router';
import { CutomerService } from '../cutomer.service';
import { pendcustomer } from 'src/pendcustomer';

@Component({
  selector: 'app-payment-installment',
  templateUrl: './payment-installment.component.html',
  styleUrls: ['./payment-installment.component.css']
})
export class PaymentInstallmentComponent implements OnInit {
  outstandingBill: number = 0;
  selectedDuration: number | undefined;
  splitAmounts: number | undefined;
  installment: Installment = {
    name: '',
    mobile: '',
    email: '',
    outbill: 0,
    duration: 0,
    installmentAmount: 0
  };
  customerId: any;
  customerDetails: any;
  installmentAmounts: number[] | undefined;
  outbill: any;
  name: any;
  mobile: any;
  email: any;

  constructor(private route: ActivatedRoute, private billingService: BillingService, private customerService: CutomerService) { }

  ngOnInit(): void {
    let customer: any = localStorage.getItem('userData');
    this.customerId = customer;
    
    if (!isNaN(this.customerId) && this.customerId !== null) {
      this.customerService.getCustomerById(this.customerId).subscribe(
        (data: any) => {
          this.customerDetails = data;
          this.outstandingBill = this.customerDetails.outbill;
          this.name=this.customerDetails.name;
          this.mobile=this.customerDetails.mobile;
          this.email=this.customerDetails.email;
          console.log(this.customerDetails.outbill);
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
  calculateInstallment(): void {
    const requestBody = {
      duration: this.selectedDuration ?? 0, // Use the nullish coalescing operator to provide a default value of 0
      outbill: this.outstandingBill,
      id: this.customerId,
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      installmentAmount: this.outstandingBill/(this.selectedDuration ?? 0)
    };

    console.log('Request Body:', requestBody); 
    this.billingService.calculateInstallmentAmounts(requestBody).subscribe(
      (data: number[]) => {
        this.splitAmounts = data[0];
        console.log(this.splitAmounts);
      },
      (error: any) => {
        console.error('Error loading split outstanding bill:', error);
      }
    );
  }
  submitInstallment(customer: pendcustomer): void {
    if (this.selectedDuration !== undefined && this.splitAmounts !== undefined) {
        this.installment.name = this.customerDetails.name;
        this.installment.mobile = this.customerDetails.mobile;
        this.installment.email = this.customerDetails.email;
        this.installment.outbill = this.outstandingBill;
        this.installment.duration = this.selectedDuration;
        this.installment.installmentAmount=this.splitAmounts;
        console.log(this.splitAmounts)

        this.billingService.saveInstallment(this.installment).subscribe(
            (response: any) => {
                console.log('Installment payment successful:', response);
                this.billingService.sendEmailToPendingCustomer(this.customerId).subscribe((response: any) => {
                  console.log("Email");
                  console.log(response);
                })
            },
            (error: any) => {
                console.error('Error occurred while processing payment:', error);
                
            },
            
        );
        
    } else {
        console.error('Invalid selected duration');
        
    }
}
}

//   submitInstallment(): void {
//     this.installment.name = this.customerDetails.name;
//     this.installment.mobileNo = this.customerDetails.mobileNo;
//     this.installment.email = this.customerDetails.email;
//     this.installment.outstandingBill = this.outstandingBill;
//     this.installment.duration = this.selectedDuration;

//     this.billingService.saveInstallment(this.installment).subscribe(
//       (response: any) => {
//         console.log('Installment payment successful:', response);
//         // Handle success response, e.g., redirect to a success page
//       },
//       (error: any) => {
//         console.error('Error occurred while processing payment:', error);
//         // Handle error response, e.g., display an error message to the user
//       }
//     );
//   }
// }

  // calculateInstallment(): void {
  //   const requestBody = {
  //     duration: this.selectedDuration, // Assuming selectedDuration is a valid value in your Angular component
  //     totalAmount: this.totalAmount, // Assuming totalAmount is a valid numeric value in your Angular component
  //     id: this.customerId // Assuming customerId is a valid customer ID in your Angular component
  // };
  
  // this.billingService.calculateInstallmentAmounts(requestBody).subscribe(
  //     (data: number[]) => {
  //         // Handle the response data, for example, assign it to a variable in your component
  //         this.installmentAmounts = data;
  //         console.log('Installment Amounts:', this.installmentAmounts);
  //     },
  //     (error: any) => {
  //         console.error('Error loading split outstanding bill:', error);
  //     }
  // );
  
    // this.billingService.calculateInstallmentAmounts(this.selectedDuration, this.outstandingBill).subscribe(
    //   (data: number[]) => {
    //     this.splitAmounts = data;
    //   },
    //   (error: any) => {
    //     console.error('Error loading split outstanding bill:', error);
    //   }
    // );
  //}
