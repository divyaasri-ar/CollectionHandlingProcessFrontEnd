import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingcustomerListComponent } from './pendingcustomer-list.component';

describe('PendingcustomerListComponent', () => {
  let component: PendingcustomerListComponent;
  let fixture: ComponentFixture<PendingcustomerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingcustomerListComponent]
    });
    fixture = TestBed.createComponent(PendingcustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
