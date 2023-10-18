import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInstallmentComponent } from './payment-installment.component';

describe('PaymentInstallmentComponent', () => {
  let component: PaymentInstallmentComponent;
  let fixture: ComponentFixture<PaymentInstallmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentInstallmentComponent]
    });
    fixture = TestBed.createComponent(PaymentInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
