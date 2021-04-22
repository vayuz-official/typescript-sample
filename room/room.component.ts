import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/master/room/room.service';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  getAll=[];
  getId;
  lengthh;

  constructor(
    private service: RoomService,
    private appComponent: AppComponent,
    private router: Router,
   
    ) {
   }

  ngOnInit(): void {
    // alert('check')
    this.appComponent.setTitle("View Clinic | Doctor Plaza");
    this.getAllData(localStorage.getItem('clinic_id'));
  }

  // tslint:disable-next-line: typedef
  getIdData(id) {
    this.getId = id;
  }

  // tslint:disable-next-line: typedef
  getAllData(id) {
    // this.service.getAllRoom(id).subscribe(res => {
    this.service.getAllRoomByClinicId(id).subscribe(res => {
        this.getAll = res.data;
       // this.getAll.push(res.data)
     
        this.lengthh = this.getAll.length;
        console.log("getAllData romm dataaaaaaaaa",res.data);
        
      });
  }

  addDoctor(id,ind) {
    // this.router.navigate([`/admin/question-edit/${_id}`]);master/clinic/addroom/
    this.router.navigate([`/master/room/add-doctor-room/${id}`])
    
    // alert(id);
  }
addSlots(data) {
  let roomid = data._id;
  let clinicId = data.clinicData._id;
    // this.router.navigate([`/admin/question-edit/${_id}`]);master/clinic/addroom/
    // this.router.navigate([`/master/room/add-room-slot/${roomid}/${clinicId}`])
    location.href=`/master/room/add-room-slot/${roomid}/${clinicId}`
  }
addDoctorToRoomSlot(data,ind) {
  let roomid = data._id;
  let clinicId = data.clinicData._id;
    // this.router.navigate([`/admin/question-edit/${_id}`]);master/clinic/addroom/
    // this.router.navigate([`/master/room/add-doctor-to-room-slot/${roomid}/${clinicId}`]);
   location.href=`/master/room/add-doctor-to-room-slot/${roomid}/${clinicId}`
  
  }

  addRoom() {
    this.router.navigate([`/master/clinic/addroom/${localStorage.getItem('clinic_id')}`])
  }

  addClinicManager(id) {
    this.router.navigate([`/master/room/add-clinic-manager/${id}`])
  }

  // tslint:disable-next-line: typedef
  deleteOne(id) {
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
      location.reload();
    });
  }

}
