import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutcustComponent } from './aboutcust.component';

describe('AboutcustComponent', () => {
  let component: AboutcustComponent;
  let fixture: ComponentFixture<AboutcustComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutcustComponent]
    });
    fixture = TestBed.createComponent(AboutcustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
