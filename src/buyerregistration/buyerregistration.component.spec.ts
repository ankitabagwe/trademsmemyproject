import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerregistrationComponent } from './buyerregistration.component';

describe('BuyerregistrationComponent', () => {
  let component: BuyerregistrationComponent;
  let fixture: ComponentFixture<BuyerregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
