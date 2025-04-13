import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadmanagerComponent } from './leadmanager.component';

describe('LeadmanagerComponent', () => {
  let component: LeadmanagerComponent;
  let fixture: ComponentFixture<LeadmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
