import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutcustsupportComponent } from './aboutcustsupport.component';

describe('AboutcustsupportComponent', () => {
  let component: AboutcustsupportComponent;
  let fixture: ComponentFixture<AboutcustsupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutcustsupportComponent]
    });
    fixture = TestBed.createComponent(AboutcustsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
