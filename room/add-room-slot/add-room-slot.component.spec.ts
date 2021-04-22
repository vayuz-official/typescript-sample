import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomSlotComponent } from './add-room-slot.component';

describe('AddRoomSlotComponent', () => {
  let component: AddRoomSlotComponent;
  let fixture: ComponentFixture<AddRoomSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
