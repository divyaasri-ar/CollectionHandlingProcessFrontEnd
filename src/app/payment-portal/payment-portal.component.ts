import { Component, OnInit } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';
import { style, transition, trigger,animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '../billing.service';
import { CutomerService } from '../cutomer.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

 

@Component({

  selector: 'app-payment-portal',

  templateUrl: './payment-portal.component.html',

  styleUrls: ['./payment-portal.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

export class PaymentPortalComponent implements OnInit {
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
  paymentForm: FormGroup;

 constructor(
  private route: ActivatedRoute,
  private customerService: CutomerService,
  private billingService: BillingService,
  private formBuilder: FormBuilder,
  private router: Router
  ) {
  // Initialize the form in the constructor
  this.paymentForm = this.formBuilder.group({
    cardNumber: [
      '',
      [Validators.required, Validators.pattern(/^\d{16}$/)] // 16-digit numeric pattern
    ],
    expiry: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/), // MM/YY pattern
        this.expiryValidator.bind(this) // Custom expiry validation method
      ]
    ],
    ccv: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{3}$/), // 3-digit numeric pattern for CCV
        this.ccvValidator.bind(this) // Custom CCV validation method
      ]
    ],
    accountNumber: [
      '',
      [Validators.required, Validators.pattern(/^\d{15}$/)]
    ],
    accountName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,}$/)]
    ],
    ifscCode: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z]{4}\d{7}$/)]
    ]
    // ... other form controls ...
  });

  this.route.params.subscribe(params => {
    let customer: any = localStorage.getItem('userData');
    console.log(customer);
    this.customerId = customer; // Convert the id parameter to a number
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
   
  }
 
  if (!isNaN(this.customerId) && this.customerId !== null) {
    this.loadOutstandingBill();
  } else {
    console.error('Invalid customerId');
  }
}

loadOutstandingBill(): void {
  this.customerService.getOutstandingBill(this.customerId).subscribe(
    (data: any) => {
      this.outstandingBill = data; 
    },
    (error: any) => {
      console.error('Error loading outstanding bill:', error);
    }
  );
}
ccvValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value || isNaN(value) || value.toString().length !== 3) {
      return { 'invalidCCV': true };
  }
  return null;
}

expiryValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (+year > currentYear || (+year === currentYear && +month >= currentMonth)) {
      return null; // Valid expiry date
    }
  }
  return { 'invalidExpiryDate': true }; // Invalid expiry date
}

  processPayment(): void {
    // if (this.selectedPaymentMethod === 'upi') {
    //   this.goToPaymentPage();
    // }
    if (this.customerId !== undefined && this.outstandingBill !== undefined) {
      let paymentDetails: any;
  
      switch (this.selectedPaymentMethod) {
        case 'credit-card':
          paymentDetails = { customerId: this.customerId, amount: this.outstandingBill, cardNumber: "1234456" };
          break;
        case 'debit-card':
          paymentDetails = { customerId: this.customerId, amount: this.outstandingBill, debitCardNumber: this.debitCardNumber };
          break;
        case 'upi':
        //   //paymentDetails = { customerId: this.customerId, amount: this.outstandingBill, upiId: this.upiId };
           this.goToPaymentPage();
           break;
        default:
          console.log('Invalid payment method selected');
          return;
      }
  
      // this.billingService.processPayment(this.customerId, this.outstandingBill).subscribe(
      //   (response: any) => {
      //     // Handle the response
      //   },
      //   (error: any) => {
      //     // Handle errors
      //   }
      // ); payment()
 console.log("billing");
 console.log(paymentDetails);
 console.log(this.customerId);
  this.billingService.updateCustomerStatus(this.customerId).subscribe(response => {
    console.log("billingnew");
      console.log("success pay",response);
      this.router.navigate(['/success']);//, { state: { message: 'Congratulations! Your bill has been paid.' } });

      this.billingService.deleteCustomerFromPendingDatabase(this.customerId).subscribe(deleteResponse => {
         
          console.log("success deleted",response);
      })
  });
  
    } else {
      console.error('Customer ID or outstanding bill is undefined.');
    }
  }
    getPaymentSymbol(): string {
    switch (this.selectedPaymentMethod) {
      case 'credit-card':
        return '💳'; // Customized credit card symbol
      case 'debit-card':
        return '💳'; // Customized debit card symbol
      case 'upi':
        return '📱'; // Customized UPI symbol
      default:
        return '';
    }
  }

//   payment(){
 
//   this.billingService.updateCustomerStatus(this.customerId).subscribe(response => {
//     if (response.success) {
//       console.log("success pay",response);
//       this.router.navigate(['/success'], { state: { message: 'Congratulations! Your bill has been paid.' } });

//       this.billingService.deleteCustomerFromPendingDatabase(this.customerId).subscribe(deleteResponse => {
//         if (deleteResponse.success) {
         
//           console.log("success deleted",response);
//         } else {
//           console.log("something wrong",response);
//         }
//       });
//     } else {
//       console.log("Invalid",response);
      
//     }
//   });
// }

  goToPaymentPage() {
    switch (this.selectedPaymentMethod) {
      case 'google-pay':
        
        this.router.navigate(['/google-pay']);
        break;
      case 'paytm':
       
        this.router.navigate(['/paytm']);
        break;
      
      default:
        
        this.router.navigate(['/google']);
        break;
    }
  }

 

  
}
//   selectedPaymentMethod: string | undefined;
//   cardNumber: string | undefined;
//   debitCardNumber: string | undefined;
//   upiId: string | undefined;
//   showAdditionalOptions: boolean | undefined;

//   processPayment(): void {
//     switch (this.selectedPaymentMethod) {
//       case 'credit-card':
//         this.processCreditCardPayment();
//         break;
//       case 'debit-card':
//         this.processDebitCardPayment();
//         break;
//       case 'upi':
//         this.processUpiPayment();
//         break;
//       default:
//         console.log('Invalid payment method selected');
//         break;
//     }
//   }
//   getPaymentSymbol(): string {
//     switch (this.selectedPaymentMethod) {
//       case 'credit-card':
//         return '💳'; // Customized credit card symbol
//       case 'debit-card':
//         return '💳'; // Customized debit card symbol
//       case 'upi':
//         return '📱'; // Customized UPI symbol
//       default:
//         return '';
//     }
//   }

//   processCreditCardPayment(): void {
//     // Handle credit card payment logic here
//     console.log('Processing credit card payment with card number:', this.cardNumber);
//     // Implement your credit card payment logic
//   }

//   processDebitCardPayment(): void {
//     // Handle debit card payment logic here
//     console.log('Processing debit card payment with card number:', this.debitCardNumber);
//     // Implement your debit card payment logic
//   }

//   processUpiPayment(): void {
//     // Handle UPI payment logic here
//     console.log('Processing UPI payment with UPI ID:', this.upiId);
//     // Implement your UPI payment logic
//   }
  
//   redirectToPaymentGateway(): void {
//     // Handle redirection logic based on selectedPaymentMethod and this.upiId
//     // ...
//     console.log('Redirecting to payment gateway...');
//   }

//   showPaymentOptions(): void {
//     this.showAdditionalOptions = true;
//   }
// }