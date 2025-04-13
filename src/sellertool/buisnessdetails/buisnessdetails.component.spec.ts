import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessdetailsComponent } from './buisnessdetails.component';

describe('BuisnessdetailsComponent', () => {
  let component: BuisnessdetailsComponent;
  let fixture: ComponentFixture<BuisnessdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuisnessdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuisnessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
