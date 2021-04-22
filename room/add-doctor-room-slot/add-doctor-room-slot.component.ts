import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/master/room/room.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TimeSlotService } from '../../../../services/master/time-slot/time-slot.service';
import { DoctorService } from '../../../../services/master/doctor/doctor.service';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
// import {Util} from '';
import {Util} from './../../../../../../Utility/util';

import { Observable, of, interval, Notification } from 'rxjs'
import { tap, debounce, switchMap } from 'rxjs/operators'
import { ClinicScheduleComponent } from 'src/app/components/clinic/clinic-schedule/clinic-schedule.component';
import { ClinicService } from 'src/app/services/master/clinic/clinic.service';
import { ClinicManagerService } from 'src/app/components/clinic/sign-in/sign-in.service';
import { NotificationService } from 'src/app/services/master/notification/notification.service';

@Component({
  selector: 'app-add-doctor-room-slot',
  templateUrl: './add-doctor-room-slot.component.html',
  styleUrls: ['./add-doctor-room-slot.component.css']
})
export class AddDoctorRoomSlotComponent implements OnInit {
 search_word = new FormControl();
  isLoading = false;
  result_list: any;
  list=[];
  dropdownList = [];
dropdownSettings:any = {};
getData;
getAll;
getClinicData;
drEmailAndslotId=[]
 getDoctorData;
  dataMondaySlot;
  has_monday_slot=false;

  dataTuesdaySlot;
  has_tuesday_slot=false
  dataWednesdaySlot;
  has_wednesday_slot=false
  dataThursdaySlot;
  has_thursday_slot=false
  dataFridaySlot;
  has_friday_slot=false
  dataSaturdaySlot;
  has_saturday_slot=false
  dataSundaySlot;
  has_sunday_slot=false
  // mondaySlotIdArray=[];
  // selectedMondaySlotIdArray=[];
  // tuesdaySlotIdArray=[];
  // selectedTuesdaySlotIdArray=[];
  // wednesdaySlotIdArray=[];
  // selectedWednesdaySlotIdArray=[];
  // thursdaySlotIdArray=[];
  // selectedThursdaySlotIdArray=[];
  // fridaySlotIdArray=[];
  // selectedFridaySlotIdArray=[];
  // saturdaySlotIdArray=[];
  // selectedSaturdaySlotIdArray=[];
  // sundaySlotIdArray=[];
  // selectedSundaySlotIdArray=[];

clinic:any;
clinicmanager:any

  constructor(private service: RoomService, 
  	private router: Router,
  	private formBuilder: FormBuilder,
  	private activatedRoute: ActivatedRoute,
  	private timeSlotService: TimeSlotService,
  	private toastr: ToastrService,
  	private doctorService: DoctorService,
  	private appComponent:AppComponent,
    private cliservice: ClinicService,
    private clinicmanagerser:ClinicManagerService,
    private notservice:NotificationService
    ) {


      let roomId = this.activatedRoute.snapshot.paramMap.get("id")
      let clinicId = this.activatedRoute.snapshot.paramMap.get("clinicId")
     this.getAllDoctorData(roomId);
     this.getByIdData(roomId)
      
   this.getClinicByIdData(clinicId)
    
    
      this.getAllDataMondaySlot("Monday",roomId,clinicId);
      this.getAllDataTuesdaySlot("Tuesday",roomId,clinicId);
      this.getAllDataWednesdaySlot("Wednesday",roomId,clinicId);
      this.getAllDataThursdaySlot("Thursday",roomId,clinicId);
     this.getAllDataFridaySlot("Friday",roomId,clinicId);
     this.getAllDataSaturdaySlot("Saturday",roomId,clinicId);
     this.getAllDataSundaySlot("Sunday",roomId,clinicId);
cliservice.getById(clinicId).subscribe((clires)=>{
  this.clinic=clires.data
clinicmanagerser.getById(clires.data.clinicManagerId).subscribe((climres:any)=>{
  this.clinicmanager=climres.data
})
})


  }
  ngOnInit(): void {
  	//this.loadSearch()
  	 this.initMultiSelect();

 this.appComponent.setTitle("Add Doctor To Room Slot | Doctors Plaza");
 
  }
onItemSelectMonday(email: any,id) {
    console.log(email,id);
    // let email =$("#"+id).val()
this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  
  }
  onItemSelectTuesday(email: any,id) {
    this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  }
   onItemSelectWednesday(email: any,id) {
    this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  }
  onItemSelectThursday(email: any,id) {
    this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  }
  onItemSelectFriday(email: any,id) {
    this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  }
  onItemSelectSaturday(email: any,id) {
    this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  }
    onItemSelectSunday(email: any,id) {
    this.doctoremail=email
  if(Util.validateEmail(email)){
   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
     this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  }
  
loadSearch(){
	this.search_word.valueChanges.pipe(
      tap(() => this.isLoading = true),
      debounce(() => interval(1000)),
      switchMap(value => this.search(value))
    ).subscribe(res => {
      console.log("ressssssss",res);	
      this.result_list = res;
      this.isLoading = false;
    },
    err => {
      console.error(err.error);
    });
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
search(keyword: string): Observable<any> {
    console.log(keyword);
    const result = this.list.filter(e => e.indexOf(keyword) !== -1)
   // console.log("of(result)",of(result));
    return of(result)
  }

 getAllDoctorData(roomId) {

    // this.doctorService.getAll().subscribe(res => {
    this.doctorService.getDoctorByRoomDepartmentAll(roomId).subscribe(res => {
        this.getAll = res.data;
       console.log("doctors>>>>>>",this.getAll)
        for (var i = 0; i < this.getAll.length; ++i) {
         // if(this.getAll[i].is_approved){

          	//console.log(this.getAll[i].email)
            this.list.push(this.getAll[i].email)
            this.dropdownList.push(this.getAll[i].email)
         // }
        }
      });
  }
  
  getAllDataMondaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataMondaySlot",res);
      this.dataMondaySlot = res.RoomTimeSlot;
      if(res.RoomTimeSlot.length>0){
        this.has_monday_slot=true
      }else{
        this.has_monday_slot=false
      }
    });
  }
  getAllDataTuesdaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataTuesdaySlot",res);
      this.dataTuesdaySlot = res.RoomTimeSlot;
      if(res.RoomTimeSlot.length>0){
        this.has_tuesday_slot=true
      }else{
        this.has_tuesday_slot=false
      }
   
    });
  }
  getAllDataWednesdaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataWednesdaySlot",res);
      this.dataWednesdaySlot = res.RoomTimeSlot;
       if(res.RoomTimeSlot.length>0){
        this.has_wednesday_slot=true
      }else{
        this.has_wednesday_slot=false
      }
   
    });
  }
  getAllDataThursdaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataThursdaySlot",res);
      this.dataThursdaySlot = res.RoomTimeSlot;
       if(res.RoomTimeSlot.length>0){
        this.has_thursday_slot=true
      }else{
        this.has_thursday_slot=false
      }
   
    });
  } 
  getAllDataFridaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataFridaySlot",res);
      this.dataFridaySlot = res.RoomTimeSlot;
       if(res.RoomTimeSlot.length>0){
        this.has_friday_slot=true
      }else{
        this.has_friday_slot=false
      }
   
    });
  } 
  getAllDataSaturdaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataSaturdaySlot",res);
      this.dataSaturdaySlot = res.RoomTimeSlot;
       if(res.RoomTimeSlot.length>0){
        this.has_saturday_slot=true
      }else{
        this.has_saturday_slot=false
      }
   
    });
  }
  getAllDataSundaySlot(day,roomId,clinicId){
    this.timeSlotService.getAllSlotByRoomAndClinicid(day,roomId,clinicId).subscribe(res => {
      console.log("getAllDataSundaySlot",res);
      this.dataSundaySlot = res.RoomTimeSlot;
       if(res.RoomTimeSlot.length>0){
        this.has_sunday_slot=true
      }else{
        this.has_sunday_slot=false
      }
   
    });
  }

  doctoremail:any
onCheckChangeMonday(event,id){
	console.log(id)
	console.log($("#"+id).val())
	let email =$("#"+id).val()

this.doctoremail=email


  if(Util.validateEmail(email)){

   let index = this.drEmailAndslotId.findIndex(x => x.id ===id);
   console.log("index",index);
   if(index<0){
   this.drEmailAndslotId.push({id:id,email:email})
   }else{
   	this.drEmailAndslotId[index].email=email;
   }
      console.log(" this.drEmailAndslotId", this.drEmailAndslotId);

  }else{
    this.toastr.error("Please enter valid email.");
  }
  
}
  
assignDrToRoomSlot(){
  let allTimeSlotId=this.drEmailAndslotId;
  
  if(allTimeSlotId.length==0){
      this.toastr.error("Please enter atleast one doctor email");
      return;
  }
  // let roomId = this.activatedRoute.snapshot.paramMap.get("id")
  //  let clinicId = this.activatedRoute.snapshot.paramMap.get("clinicId");
   console.log(allTimeSlotId)
   this.timeSlotService.assignDrToRoomSlot(allTimeSlotId).subscribe(res => {

var dd={
  email:this.doctoremail
}

this.doctorService.getByemail(dd).subscribe((res)=>{
  

    var postnotdata={
      content: "You've been added by the"+this.clinicmanager.clinic_manager_name+" to the "+this.clinic.clinicName+".Clinic "+this.clinic.clinicName+" Welcomes you!!"+
      "Check your credentails below and sign in on to Doctors Plaza",
      type:"Doctorplaza",
      source:"Clinic manager assign from admin",
      emailtext:"Doctor Plaza Clinic Assign",
      emailsubject:"Clinic manager assign to clinic",
      dest : "/",
      doctor_id : res.data._id,
     email:res.data.email,
     name:this.clinicmanager.clinic_manager_name,
      is_read : false,
      is_active : true,
     }
    this.notservice.createByPostRequest(postnotdata).subscribe((res)=>{
console.log(res);

    })



  })





     
      console.log("res",res);
      if (res.code==200) {
        // this.rescForm.reset();
        this.drEmailAndslotId=[]
        this.toastr.success(res.message);
        location.reload();
       // this.router.navigate([this.returnUrl]);
      }else if(res.code==900){
        this.toastr.error(res.message);
      }
      //this.staff = res.data;
    });

}
  
     getByIdData(id) {
    //console.log("iddd",id);
    // this.service.getById(id).subscribe(res => {
    this.service.getAllRoom(id).subscribe(res => {
        console.log("getAllRoom",res.data);
         this.getData = res.data[0];
        
        //this.getData = res.data;
      });
  }
     
  getClinicByIdData(id) {
    //console.log("iddd",id);
    // this.service.getById(id).subscribe(res => {
    this.timeSlotService.getClinicByIdData(id).subscribe(res => {
        console.log("getAllRoom",res.data);
         this.getClinicData = res.data;
        
        //this.getData = res.data;
      });
  }
     
  
}
