import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerprofileComponent } from './buyerprofile.component';

describe('BuyerprofileComponent', () => {
  let component: BuyerprofileComponent;
  let fixture: ComponentFixture<BuyerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
