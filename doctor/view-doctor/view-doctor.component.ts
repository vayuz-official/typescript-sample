import { AppointmentService } from './../../../../services/master/appointment/appointment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '../../../../services/master/doctor/doctor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/master/notification/notification.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit, OnDestroy {

  getData;
  getRatings;
  showOptions = false;
  id;
  avgRating: any;
  cancelAppointement: any;
  appointments: any;
  totalCancel: any;
  adminCancel: any;
  patientCancel: any;
  constructor(private service: DoctorService,
    private appointmentservice : AppointmentService,
    private toastrService : ToastrService,
    private notservice:NotificationService,
    private appcomponent:AppComponent
    , private router: Router) {
  }

  ngOnInit(): void {
    this.appcomponent.setTitle("View Doctors Management | Doctors Plaza");


   console.log(localStorage.getItem('viewDoctorApproveOptions')) ;
   if (localStorage.getItem('viewDoctorApproveOptions')) {
     this.showOptions = true;
   }
   this.id = this.router.url.split('/').pop()
    this.getByIdData(this.id);
    this.getAvgRatingOfDoctor();
    this.getAppointmentsOfDoctor();
    this.getCancelledAppointments();
    this.getRating();
  }

  getAppointmentsOfDoctor(){
    
    this.appointmentservice.doctor_appointments({id : this.id}).subscribe(res => {
      console.log('a',res);
      this.appointments = res.data;
      this.cancelAppointement = res.cancel_data;
    })
  }

  getRating() {
    this.service.getReviewsOfDoctor(this.id).subscribe(res => {
      console.log('ratinggggg',res);
      this.getRatings = res.data;
    })
  }

  getCancelledAppointments(){
    
    this.appointmentservice.cancelled_appointments({id : this.id}).subscribe(res => {
      console.log('conntttttt',res);
      this.totalCancel = res.data;
       this.adminCancel = res.admin;
       this.patientCancel = res.patient;
    })
  }

  getAvgRatingOfDoctor(){
    this.service.avgRatingOfDoctor(this.id).subscribe(res => {
      console.log("avgRatingOfDoctor",res);
      if(res[0]){
        
      this.avgRating = res[0].average_rating;
      }
    })
  }

   ngOnDestroy() {
    localStorage.removeItem('viewDoctorApproveOptions');
   }

  getApproved(){
   // let token = localStorage.getItem('token');
   //  console.log('tokennnn',token)
    const temp: any = {
      id: this.router.url.split('/').pop(),
    }
   
    this.service.getApproval(temp).subscribe( response => {
      if (response.code==200) {
        var postnotdata={
          content:"Hi,"+this.getData.doctorName+" You're application has been accepted by the main office.You can now access our services.",
          type:"doctor approve from admin",
          source:"admin",
          dest : "/",
          doctor_id : this.getData._id,
          emailtext:"Docotr plaza Status Updation",
          emailsubject:"Doctor Approved",
         email:this.getData.email,
         name:+this.getData.doctorName,
          is_read : false,
          is_active : true,
         }
  this.notservice.createByPostRequest(postnotdata).subscribe((res)=>{
  console.log(res);
  
  })
        this.router.navigate(['/master/doctor']);
      }
      else if(response.code==7500){
        this.toastrService.error(response.message)
        // this.isSubmitted = false;
        // this.message = 'Failed to submit the form.';
        // console.log('fffffffff',data);
      }
    })
    // alert(this.router.url.split('/').pop())
  }

  getRejected(){
    // alert('rejected')
    const temp: any = {
      id: this.router.url.split('/').pop(),
      not_approved: true
    }
   
    this.service.getApproval(temp).subscribe( response => {
      if (response.success) {


        var postnotdata={
          content:"Hi "+this.getData.doctorName+" Sorry! You're application has been rejected by the main office.You can no longer access our services",
          type:"doctor reject from admin",
          source:"admin",
          dest : "/",
          doctor_id : this.getData._id,
          emailtext:"Docotr plaza Status Updation",
          emailsubject:"Doctor Reject",
         email:this.getData.email,
        name: this.getData.doctorName,
          is_read : false,
          is_active : true,
         }
  this.notservice.createByPostRequest(postnotdata).subscribe((res)=>{
  console.log(res);
  
  })
        
        this.router.navigate(['/master/doctor']);
      }
      else {
        // this.isSubmitted = false;
        // this.message = 'Failed to submit the form.';
        // console.log('fffffffff',data);
      }
    })
  }

  // tslint:disable-next-line: typedef
  getByIdData(id) {
    this.service.getById(id).subscribe(res => {
        console.log(res.data);
        this.getData = res.data;
      });
  }


  promote(did:any){
    var data = {
      promoted:true,
      id:did
  };
    this.service.promoted(data).subscribe(response => {
      if (response.data) {
        this.getByIdData(this.id);
        this.toastrService.success('Promoted');
      }else{
        this.toastrService.error('Please try Again')
 }
    })
  }


}
