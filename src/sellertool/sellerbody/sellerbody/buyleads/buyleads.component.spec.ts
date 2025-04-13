import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyleadsComponent } from './buyleads.component';

describe('BuyleadsComponent', () => {
  let component: BuyleadsComponent;
  let fixture: ComponentFixture<BuyleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyleadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
