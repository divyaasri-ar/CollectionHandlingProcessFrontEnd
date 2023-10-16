import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersupportHomeComponent } from './customersupport-home.component';

describe('CustomersupportHomeComponent', () => {
  let component: CustomersupportHomeComponent;
  let fixture: ComponentFixture<CustomersupportHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersupportHomeComponent]
    });
    fixture = TestBed.createComponent(CustomersupportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
