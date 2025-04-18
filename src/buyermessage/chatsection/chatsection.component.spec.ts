import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsectionComponent } from './chatsection.component';

describe('ChatsectionComponent', () => {
  let component: ChatsectionComponent;
  let fixture: ComponentFixture<ChatsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
