import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutlogHtmlComponent } from './aboutlog.html.component';

describe('AboutlogHtmlComponent', () => {
  let component: AboutlogHtmlComponent;
  let fixture: ComponentFixture<AboutlogHtmlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutlogHtmlComponent]
    });
    fixture = TestBed.createComponent(AboutlogHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
