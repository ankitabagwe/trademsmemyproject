import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutregistrationComponent } from './withregistration.component';

describe('WithoutregistrationComponent', () => {
  let component: WithoutregistrationComponent;
  let fixture: ComponentFixture<WithoutregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
