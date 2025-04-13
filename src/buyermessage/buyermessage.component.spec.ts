import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyermessageComponent } from './buyermessage.component';

describe('BuyermessageComponent', () => {
  let component: BuyermessageComponent;
  let fixture: ComponentFixture<BuyermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyermessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
