import { Component, OnInit } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';
import { style, transition, trigger,animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '../billing.service';
import { CutomerService } from '../cutomer.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pendcustomer } from 'src/pendcustomer';
import { Payment } from 'src/Payment';

 

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
  customerId: any;
  customerDetails: any;
  paymentForm: FormGroup;
  accountForm: FormGroup;
  upiForm: FormGroup;
  cardNumberControl: any;
  expiryControl: any;
  ccvControl: any;
  accountNumberControl: FormControl;
  accountNameControl: FormControl;
  ifscCodeControl: FormControl;
  upiIdControl: FormControl<any>;
  id: any;
  email: any;
  mobile: any;
  name: any;
  paymentMethod: any;
  payment: Payment = {

    customerId:0,

    paymentMethod: '',

    amount: 0,

    paynumber: '',

    email: ''

 

  };

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
      [Validators.required, Validators.pattern(/^\d{16}$/),
      this.cardNumberValidator.bind(this)] // 16-digit numeric pattern
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
    ]
  });
  this.accountForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required, Validators.pattern(/^\d{15}$/), this.accountNumberValidator.bind(this)]],
    accountName: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z ]+$/)]],
    ifscCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{4}\d{7}$/)]]
  });

  this.upiForm = this.formBuilder.group({
  upiId: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]{2,}$/), // UPI ID pattern validation
      this.upiIdValidator.bind(this) // Custom UPI ID validator
    ]
  ]
});

  this.route.params.subscribe(params => {
    let customer: any = localStorage.getItem('userData');
    console.log(customer);
    this.customerId = customer; // Convert the id parameter to a number
  });

  this.cardNumberControl = this.paymentForm.get('cardNumber');
  this.expiryControl = this.paymentForm.get('expiry');
    this.ccvControl = this.paymentForm.get('ccv');
    this.accountNumberControl = this.accountForm.get('accountNumber') as FormControl;
    this.accountNameControl = this.accountForm.get('accountName') as FormControl;
    this.ifscCodeControl = this.accountForm.get('ifscCode') as FormControl;
    this.upiIdControl = this.upiForm.get('upiId') as FormControl;
}

get cardNumberControlValid(): boolean {
  return this.cardNumberControl && this.cardNumberControl.valid;
}
get expiryControlValid(): boolean {
  return this.expiryControl && this.expiryControl.valid;
}

get ccvControlValid(): boolean {
  return this.ccvControl && this.ccvControl.valid;
}

get isFormValid(): boolean {
  return this.paymentForm && this.paymentForm.valid;
}
get accountNumberValid(): boolean {
  return this.accountNumberControl && this.accountNumberControl.valid;
}

get accountNameValid(): boolean {
  return this.accountNameControl && this.accountNameControl.valid;
}

get ifscCodeValid(): boolean {
  return this.ifscCodeControl && this.ifscCodeControl.valid;
}

get isAccFormValid(): boolean {
  return this.accountForm && this.accountForm.valid;
}
get upiIdValid(): boolean {
  return this.upiIdControl && this.upiIdControl.valid;
}

get isUpiFormValid(): boolean {
  return this.upiForm && this.upiForm.valid;
}


ngOnInit(): void {
  if (this.customerId) {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (data: any) => {
        this.customerDetails = data; // Store customer details in the variable
        this.id=this.customerDetails.id;

          this.outstandingBill = this.customerDetails.outbill;

          this.name=this.customerDetails.name;

          this.mobile=this.customerDetails.mobile;

          this.email=this.customerDetails.email;

          console.log(this.customerDetails.outbill);

          console.log(this.customerDetails.id);

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

cardNumberValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value || isNaN(value) || value.toString().length !== 16) {
      return { 'invalidCardNumber': true };
  }
  return null;
}

accountNumberValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value || isNaN(value) || value.toString().length !== 15) {
      return { 'invalidaccountNumber': true };
  }
  return null;
}

accountNameValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  // if (!value || isNaN(value) || value.toString().length !== 15) {
  //     return { 'invalidaccountNumber': true };
  // }
  const regex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z ]+$/;
  
  if (!value || !regex.test(value)) {
    return { 'invalidaccountName': true };
  }
  return null;
}

ifscValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  const regex = /^[a-zA-Z]{4}\d{7}$/;
  
  if (!value || !regex.test(value)) {
    return { 'invalidaccountName': true };
  }
  return null;
}
upiIdValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  // UPI ID pattern validation
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z]{2,}$/;

  if (!value || !regex.test(value)) {
    return { 'invalidUpiId': true };
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


  processPayment(payment: Payment): void {
    // this.pay.paymentMethod = this.paymentMethod!;
       if (this.customerId !== undefined && this.outstandingBill !== undefined) {
      let paymentDetails: any;
  
      switch (this.selectedPaymentMethod) {
        case 'credit-card':
          paymentDetails = {customerId: this.customerId, amount: this.outstandingBill };
          break;
        case 'debit-card':
          paymentDetails = { customerId: this.customerId, amount: this.outstandingBill };
          break;
          case 'account-transfer':
            paymentDetails = { customerId: this.customerId, amount: this.outstandingBill };
          break;
        case 'upi':
        paymentDetails = { customerId: this.customerId, amount: this.outstandingBill };
           break;
        default:
          console.log('Invalid payment method selected');
          return;
      }

      // this.payment.paymentMethod=this.paymentMethod;
      // this.payment.paynumber=this.paynumber;
  
     
 console.log("billing");
 console.log(paymentDetails);
 console.log(this.customerId);

this.billingService.sendEmailToPaymentCustomer(this.customerId).subscribe(emailResponse => {
    console.log("Payment Email sent successfully");
    console.log(emailResponse);

    this.billingService.updateCustomerStatus(this.customerId).subscribe(response => {
        console.log("billingnew");
        console.log("success pay", response);

        this.billingService.deleteCustomerFromPendingDatabase(this.customerId).subscribe(deleteResponse => {
            console.log("success deleted", deleteResponse);
            this.router.navigate(['/success']); 
        });
    });
});
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



  goToPaymentPage(upi:any) {
    console.log(this.selectedPaymentMethod)
    switch (upi) {
     
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

  setUpiId(upi:any)
  {
    console.log(upi)
    this.upiId = upi
    console.log(this.upiId)
    this.goToPaymentPage(this.upiId)
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

 // this.billingService.processPayment(this.customerId, this.outstandingBill).subscribe(
      //   (response: any) => {
      //     // Handle the response
      //   },
      //   (error: any) => {
      //     // Handle errors
      //   }
      // ); payment()