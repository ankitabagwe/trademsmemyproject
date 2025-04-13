import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerbodyComponent } from './sellerbody.component';

describe('SellerbodyComponent', () => {
  let component: SellerbodyComponent;
  let fixture: ComponentFixture<SellerbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerbodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
