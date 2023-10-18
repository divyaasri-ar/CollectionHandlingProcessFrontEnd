import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeroptionsLoginComponent } from './customeroptions-login.component';

describe('CustomeroptionsLoginComponent', () => {
  let component: CustomeroptionsLoginComponent;
  let fixture: ComponentFixture<CustomeroptionsLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomeroptionsLoginComponent]
    });
    fixture = TestBed.createComponent(CustomeroptionsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
