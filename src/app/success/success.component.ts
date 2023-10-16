import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  // templateUrl: './success.component.html',
  // styleUrls: ['./success.component.css']
  template: 
   `<div>{{ successMessage }}</div>`
})
export class SuccessComponent implements OnInit {
   successMessage: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Get success message from router state
    this.successMessage = this.route.snapshot.data['message'] || 'Payment successful!';
  }

}
