import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsecComponent } from './chatsec.component';

describe('ChatsecComponent', () => {
  let component: ChatsecComponent;
  let fixture: ComponentFixture<ChatsecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
