import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../../../services/master/room/room.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-clinic-manager',
  templateUrl: './add-clinic-manager.component.html',
  styleUrls: ['./add-clinic-manager.component.css']
})
export class AddClinicManagerComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: RoomService,
    private toastr: ToastrService,
    private appComponent:AppComponent
  ) { }

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;
  id: string;

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = '/master/room';
    this.appComponent.setTitle("Add Clinic Manager | Doctor Plaza");

  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      clinic :new  FormControl('', [Validators.required,])
    });
  }

  get f() { return this.submitForm.controls; }

  addData(formGroup: FormGroup, data) {
    // console.log(data);
    
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }

    const temp: any = {
      email: data.email,
      room_id: this.router.url.split('/').pop(),
    }
    // else{
    this.isSubmitted = true;
    this.service.add_clinic_manager(temp).subscribe(response => {
      if (response.data) {
        this.toastr.success( 'Clinic Manager added successfully!');
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.toastr.error( 'something went wrong');
        this.isSubmitted = false;
        this.message = 'Failed to submit the form.';
        console.log(data);
      }
    });
    this.onReset();
    // }
  }

  onReset() {
    this.isSubmitted = false;
    this.submitForm.reset();
  }

}
