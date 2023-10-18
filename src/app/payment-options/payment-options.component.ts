import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.css']
})
export class PaymentOptionsComponent {
  issueOptionsVisible: boolean | undefined;

  toggleIssueOptions() {
    this.issueOptionsVisible = !this.issueOptionsVisible;
  }

  raiseTicket() {
    // Here you can use this.selectedIssue and this.otherIssue as needed
    // For example, send an API request to raise a ticket with the selected issue details
  }

}
