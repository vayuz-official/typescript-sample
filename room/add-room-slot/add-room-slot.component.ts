import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/master/room/room.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TimeSlotService } from '../../../../services/master/time-slot/time-slot.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room-slot',
  templateUrl: './add-room-slot.component.html',
  styleUrls: ['./add-room-slot.component.css']
})
export class AddRoomSlotComponent implements OnInit {

   getData;
	allTimeSlot;
isSubmitted = false;
submitForm: FormGroup;
  constructor(private service: RoomService, 
  	private router: Router,
  	private formBuilder: FormBuilder,
  	private activatedRoute: ActivatedRoute,
  	private timeSlotService: TimeSlotService,
  	private toastr: ToastrService,
  	private appComponent:AppComponent) {
  }


  getDoctorData;
  dataMondaySlot;
  dataTuesdaySlot;
  dataWednesdaySlot;
  dataThursdaySlot;
  dataFridaySlot;
  dataSaturdaySlot;
  dataSundaySlot;
  mondaySlotIdArray=[];
  selectedMondaySlotIdArray=[];
  tuesdaySlotIdArray=[];
  selectedTuesdaySlotIdArray=[];
  wednesdaySlotIdArray=[];
  selectedWednesdaySlotIdArray=[];
  thursdaySlotIdArray=[];
  selectedThursdaySlotIdArray=[];
  fridaySlotIdArray=[];
  selectedFridaySlotIdArray=[];
  saturdaySlotIdArray=[];
  selectedSaturdaySlotIdArray=[];
  sundaySlotIdArray=[];
  selectedSundaySlotIdArray=[];
  ngOnInit(): void {
  	 this.appComponent.setTitle("Add Room Slot | Doctors Plaza");
 
   let roomId = this.activatedRoute.snapshot.paramMap.get("id")
   let clinicId = this.activatedRoute.snapshot.paramMap.get("clinicId")
    this.getByIdData(roomId);

    this.submitForm = this.formBuilder.group({
     // clinicName : '', [Validators.required, this.noWhitespaceValidator],
      daysName: ['', Validators.required],
    });
     this.getAllDataMondaySlot("Monday",roomId,clinicId);
     this.getAllDataTuesdaySlot("Tuesday",roomId,clinicId);
     this.getAllDataWednesdaySlot("Wednesday",roomId,clinicId);
     this.getAllDataThursdaySlot("Thursday",roomId,clinicId);
     this.getAllDataFridaySlot("Friday",roomId,clinicId);
     this.getAllDataSaturdaySlot("Saturday",roomId,clinicId);
     this.getAllDataSundaySlot("Sunday",roomId,clinicId);
  }
    get f() { return this.submitForm.controls; }

   getByIdData(id) {
    //console.log("iddd",id);
    // this.service.getById(id).subscribe(res => {
    this.service.getAllRoom(id).subscribe(res => {
        console.log("daaaaaaaaaaaaaa",res.data);
         this.getData = res.data[0];
        
        //this.getData = res.data;
      });
    this.getAllData();
  }
onCheckChangeMonday(event,id){
   if ( event.target.checked ) {
     this.mondaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.mondaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.mondaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.mondaySlotIdArray);

}
onCheckChangeTuesday(event,id){
   if ( event.target.checked ) {
     this.tuesdaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.tuesdaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.tuesdaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.tuesdaySlotIdArray);

}
onCheckChangeWednesday(event,id){
   if ( event.target.checked ) {
     this.wednesdaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.wednesdaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.wednesdaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.wednesdaySlotIdArray);

}
onCheckChangeThursday(event,id){
   if ( event.target.checked ) {
     this.thursdaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.thursdaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.thursdaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.thursdaySlotIdArray);

}
onCheckChangeFriday(event,id){
   if ( event.target.checked ) {
     this.fridaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.fridaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.fridaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.fridaySlotIdArray);

}
onCheckChangeSaturday(event,id){
   if ( event.target.checked ) {
     this.saturdaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.saturdaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.saturdaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.saturdaySlotIdArray);

}
onCheckChangeSunday(event,id){
   if ( event.target.checked ) {
     this.sundaySlotIdArray.push(id)
        // this.contentEditable = true;
    }else{
      const index = this.sundaySlotIdArray.indexOf(id);
      if (index > -1) {
         this.sundaySlotIdArray.splice(index, 1);
        }
    }
  console.log("onCheckChange",this.sundaySlotIdArray);

}
submitSlot(day){
  let allTimeSlotId;
  if(day=="Monday"){
   allTimeSlotId= this.mondaySlotIdArray;
  }if(day=="Tuesday"){
    allTimeSlotId= this.tuesdaySlotIdArray;
  }if(day=="Wednesday"){
    allTimeSlotId= this.wednesdaySlotIdArray;
  }if(day=="Thursday"){
    allTimeSlotId= this.thursdaySlotIdArray;
  }if(day=="Friday"){
    allTimeSlotId= this.fridaySlotIdArray;
  }if(day=="Saturday"){
    allTimeSlotId= this.saturdaySlotIdArray;
  }if(day=="Sunday"){
    allTimeSlotId= this.sundaySlotIdArray;
  }
  if(allTimeSlotId.length==0){
      this.toastr.error("Please select atleast one time slot");
      return;
  }
  let roomId = this.activatedRoute.snapshot.paramMap.get("id")
   let clinicId = this.activatedRoute.snapshot.paramMap.get("clinicId");
   console.log(day,allTimeSlotId,roomId,clinicId)
   this.timeSlotService.createRoomTimeSlot(day,allTimeSlotId,roomId,clinicId).subscribe(res => {
      console.log("res",res);
      if (res.code==200) {
        // this.rescForm.reset();
        this.toastr.success(res.message);
       // this.router.navigate([this.returnUrl]);
      }else if(res.code==900){
        this.toastr.error(res.message);
      }
      //this.staff = res.data;
    });

}
checkAlredySubmittedMonday(id){
  // console.log("iddd", id, this.selectedMondaySlotIdArray);
  // console.log("iddd",typeof id,typeof this.selectedMondaySlotIdArray[0]);
  // console.log("this.selectedMondaySlotIdArray.includes(id)",this.selectedMondaySlotIdArray.includes(id));
  if(this.selectedMondaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}
checkAlredySubmittedTuesday(id){
   if(this.selectedTuesdaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}
checkAlredySubmittedWednesday(id){
   if(this.selectedWednesdaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}
checkAlredySubmittedThursday(id){
   if(this.selectedThursdaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}
checkAlredySubmittedFriday(id){
   if(this.selectedFridaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}

 checkAlredySubmittedSaturday(id){
   if(this.selectedSaturdaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}
 checkAlredySubmittedSunday(id){
   if(this.selectedSundaySlotIdArray.includes(id)){
    return true
  }else{
  return false;
  }
}

   getAllDataMondaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("Monday",res);
      this.dataMondaySlot = res.data;
      for (var i = 0; i < this.dataMondaySlot.length; ++i) {
        this.selectedMondaySlotIdArray.push(this.dataMondaySlot[i].timeSlotData._id)
      }
   
    });
  }
  getAllDataTuesdaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("Tuesday",res);
      this.dataTuesdaySlot = res.data;
        for (var i = 0; i < this.dataTuesdaySlot.length; ++i) {
        this.selectedTuesdaySlotIdArray.push(this.dataTuesdaySlot[i].timeSlotData._id)
      }
   
    });
  }
  getAllDataWednesdaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("res",res);
      this.dataWednesdaySlot = res.data;
        for (var i = 0; i < this.dataWednesdaySlot.length; ++i) {
        this.selectedWednesdaySlotIdArray.push(this.dataWednesdaySlot[i].timeSlotData._id)
      }
   
    });
  }getAllDataThursdaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("Thursday",res);
      this.dataThursdaySlot = res.data;
       for (var i = 0; i < this.dataThursdaySlot.length; ++i) {
        this.selectedThursdaySlotIdArray.push(this.dataThursdaySlot[i].timeSlotData._id)
      }
    });
  }getAllDataFridaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("res",res);
      this.dataFridaySlot = res.data;
       for (var i = 0; i < this.dataFridaySlot.length; ++i) {
        this.selectedFridaySlotIdArray.push(this.dataFridaySlot[i].timeSlotData._id)
      }
   
    });
  }getAllDataSaturdaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("res",res);
      this.dataSaturdaySlot = res.data;
        for (var i = 0; i < this.dataSaturdaySlot.length; ++i) {
        this.selectedSaturdaySlotIdArray.push(this.dataSaturdaySlot[i].timeSlotData._id)
      }
    });
  }
  getAllDataSundaySlot(day,roomId,clinicId){
    this.timeSlotService.getTimeSlotByDay(day,roomId,clinicId).subscribe(res => {
      console.log("res",res);
      this.dataSundaySlot = res.data;
        for (var i = 0; i < this.dataSundaySlot.length; ++i) {
        this.selectedSundaySlotIdArray.push(this.dataSundaySlot[i].timeSlotData._id)
      }
    });
  }
  getAllData(){
    this.timeSlotService.getAllTimeSlot().subscribe(res => {
      console.log("allTimeSlot", res.data);
      this.allTimeSlot = res.data;
   
    });
  }
  // addData(data){
  // 	console.log("data",data);
  // 	console.log("this.submitForm.controls",this.submitForm.controls);

  //   let roomId = this.activatedRoute.snapshot.paramMap.get("id")
  //   let clinicId = this.activatedRoute.snapshot.paramMap.get("clinicId")
  //   let  day = this.submitForm.controls.daysName.value;
  //   console.log("day",day);
  //   this.isSubmitted=true;
  //   if(day==""){
  //   	return;
  //   }
  //   console.log("data._id,roomId,clinicId",this.submitForm.controls.daysName.value,data._id,roomId,clinicId)
  // 	this.timeSlotService.createRoomTimeSlot(day,data._id,roomId,clinicId).subscribe(res => {
  //     console.log("res",res);
  //     if (res.code==200) {
  //   	  // this.rescForm.reset();
  //       this.toastr.success(res.message);
  //      // this.router.navigate([this.returnUrl]);
  //     }else if(res.code==900){
  //     	this.toastr.error(res.message);
  //     }
  //     //this.staff = res.data;
  //   });

  // }
}
