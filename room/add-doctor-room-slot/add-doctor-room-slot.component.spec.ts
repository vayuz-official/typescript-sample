import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorRoomSlotComponent } from './add-doctor-room-slot.component';

describe('AddDoctorRoomSlotComponent', () => {
  let component: AddDoctorRoomSlotComponent;
  let fixture: ComponentFixture<AddDoctorRoomSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorRoomSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorRoomSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
