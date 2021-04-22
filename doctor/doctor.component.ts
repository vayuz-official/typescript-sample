import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/master/doctor/doctor.service';
import { AppComponent } from '../../../app.component';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/master/notification/notification.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  getAll;
  getId;
  index;
  lengthh;

  states : any;
  cities : any;
  specs : any;

  selectedState : any = "Filter by state";
  selectedCity : any = "Filter by city"
  selectedSpec : any = "Filter by specialization";
dropdownSettings:any = {};

  constructor(
    private service: DoctorService,
    private appComponent: AppComponent,
    private toastr: ToastrService,
    private notservice:NotificationService
    ) {
   }

  ngOnInit(): void {
     this.initMultiSelect()
    this.appComponent.setTitle("Doctor Management | Doctors Plaza");
    this.getAllData();
    this.getNeeded();
  }

initMultiSelect() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }
  getNeeded(){
    this.service.getDistintStates().subscribe(res => {
      console.log(res);
      this.states = res;
    });
    this.service.getDistintCities().subscribe(res => {
      console.log(res);
      this.cities = res;
    });
    this.service.getDistintSpecs().subscribe(res => {
      console.log(res);
      this.specs = res.data;
    });
  }

  changeState(e){
    console.log(e)
    this.selectedSpec = 'Filter by specialization'
    this.selectedCity = 'Filter by city'
    this.service.getDoctorsOfState(e).subscribe(res => {
      console.log(res);
      this.getAll = res.data;
    })
  }

makeFeatured(ele,i) {
  let ref= this;
  console.log("ele.is_featured",ele.is_featured);
  let is_featured;
  if(ele.is_featured==undefined){
    is_featured=true
  }else {
    is_featured=!ele.is_featured
  }
    this.service.updateById(ele._id, { is_featured : is_featured }).subscribe(res => {
      console.log(res)
      if(res.code === 200) {
        ref.getAll[i].is_featured=is_featured;
        if(is_featured){

        this.toastr.success('Marok as fetured');
      }else{
        this.toastr.success('Marok as un fetured');
      }
      }
      else{
        this.toastr.error('Please Try Again!')
      }
    })
}

changeStatus(ele,i) {
  let ref= this;
    this.service.updateById(ele._id, { active : !ele.is_active }).subscribe(res => {
      console.log(res)
      if(res.code === 200) {

        if(ele.is_active==true){
          var sta="Active"
              }else{
          var sta="InActive"
              }

              var postnotdata={
                content:"Hi "+ele.doctorName+" You've turned " +sta+ " by the main Office. For further details please contact Main Office.",
                type:"Doctor "+sta+" status",
                source:"Doctor "+sta+" status",
                dest : "/",
                emailtext:"Doctor "+sta+" status Notification",
                emailsubject: "Doctor "+sta+" status",
                doctor_id : ele._id,
                email:ele.email,
                name:ele.doctorName,
               is_read : false,
                is_active : true,
               }
        this.notservice.createByPostRequest(postnotdata).subscribe((res)=>{
        console.log(res);
        
        })







        //location.reload();
        ref.getAll[i].is_active=!ele.is_active;
        this.toastr.success('Status Updated!');







        
      }
      else{
        this.toastr.error('Please Try Again!')
      }
    })
  }

  changeCity(e){
    this.selectedSpec = 'Filter by specialization'
    this.selectedState = 'Filter by state'
    this.service.getDoctorsOfCity(e).subscribe(res => {
      console.log(res);
      this.getAll = res.data;
    })
  }

  changeSpec(e){
    this.selectedState = 'Filter by state'
    this.selectedCity = 'Filter by city'
    this.service.getDoctorsOfSpec(this.selectedSpec).subscribe(res => {
      console.log(res);
      this.getAll = res.data;
    })
  }

  addConsultation(id) {
    alert(id);
  }

  // tslint:disable-next-line: typedef
  getIdData(id,i) {
    this.getId = id;
    this.index = i;
  }
  // tslint:disable-next-line: typedef
  getAllData() {
    this.service.getAll().subscribe(res => {
        this.getAll = res.data;
        console.log(this.getAll)
        this.lengthh = this.getAll.length;
      });
  }

  // tslint:disable-next-line: typedef
  deleteOne(id) {
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
    });
    this.getAll.splice(this.index,1);
  }

}
