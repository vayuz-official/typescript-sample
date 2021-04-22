import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicManagerService } from 'src/app/components/clinic/sign-in/sign-in.service';
import { ClinicService } from 'src/app/services/master/clinic/clinic.service';
import { NotificationService } from 'src/app/services/master/notification/notification.service';
import { RoomService } from '../../../../services/master/room/room.service';
NotificationService
@Component({
  selector: 'app-add-doctor-room',
  templateUrl: './add-doctor-room.component.html',
  styleUrls: ['./add-doctor-room.component.css']
})
export class AddDoctorRoomComponent implements OnInit {
roondetails:any
  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private service: RoomService,
     private notservice:NotificationService,
     private clinic:ClinicService,
     private clinicmanager:ClinicManagerService
  
  ) { 


  this.roondetails =  JSON.parse(localStorage.getItem('roomdetails'))
  console.log(this.roondetails);
  
  }

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;
  id: string;

  ngOnInit(): void {
    // console.log(this.router.url.split('/').pop())
    this.initForm();
    this.returnUrl = '/master/room';
  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      // doctorName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // contactNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  get f() { return this.submitForm.controls; }

  clinicdata:any
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

this.service.getById(this.router.url.split('/').pop()).subscribe((res)=>{
console.log(res.data);
this.clinic.getById(res.data.clinicData).subscribe((res)=>{
this.clinicdata=res.data


})

})


    // else{
    this.isSubmitted = true;
    this.service.add_doctor_room(temp).subscribe(response => {
      if (response.data) {
        var postnotdata={
          content: "Hi You've been added  to the clinic "+this.clinicdata.clinicName+" Clinic "+this.clinicdata.clinicName+" Welcomes you!!",
          type:"Doctorplaza",
          source:"Clinic manager assign from admin",
          emailtext:"Doctor Plaza Clinic Assign",
          emailsubject:"Clinic manager assign to clinic",
          dest : "/",
          clinicmanager_id : response.data._id,
         email:this.submitForm.value.email,
         name:this.clinicdata.clinic_manager_name,
          is_read : false,
          is_active : true,
         }
        this.notservice.createByPostRequest(postnotdata).subscribe((res)=>{
console.log(res);

        })

        this.router.navigate([this.returnUrl]);
      }
      else {
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
