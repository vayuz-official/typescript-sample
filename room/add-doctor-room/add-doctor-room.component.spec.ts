import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorRoomComponent } from './add-doctor-room.component';

describe('AddDoctorRoomComponent', () => {
  let component: AddDoctorRoomComponent;
  let fixture: ComponentFixture<AddDoctorRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
