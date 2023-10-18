import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-issues',
  templateUrl: './payment-issues.component.html',
  styleUrls: ['./payment-issues.component.css']
})
export class PaymentIssuesComponent {
  //selectedIssue: string = 'moneyNotPaid';
  selectedIssue: string | undefined;
  otherIssue: string | undefined;
  selectedPriority: string | undefined;
  fileToUpload: File | null = null;

  raiseTicket(): void {
    // Handle form submission logic here
    console.log('Issue Type:', this.selectedIssue);
    console.log('Other Issue:', this.otherIssue);
    console.log('Priority:', this.selectedPriority);
    if (this.fileToUpload) {
      console.log('File:', this.fileToUpload.name);
      // Handle file upload logic here
    }
    // You can perform further actions like sending the form data to an API endpoint
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileToUpload = target.files[0];
    } else {
      this.fileToUpload = null; // Reset fileToUpload if no file is selected
    }
  }

}
