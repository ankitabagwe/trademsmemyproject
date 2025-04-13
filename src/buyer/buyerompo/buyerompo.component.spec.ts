import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerompoComponent } from './buyerompo.component';

describe('BuyerompoComponent', () => {
  let component: BuyerompoComponent;
  let fixture: ComponentFixture<BuyerompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerompoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
