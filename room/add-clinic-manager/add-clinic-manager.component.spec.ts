import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClinicManagerComponent } from './add-clinic-manager.component';

describe('AddClinicManagerComponent', () => {
  let component: AddClinicManagerComponent;
  let fixture: ComponentFixture<AddClinicManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClinicManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClinicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
