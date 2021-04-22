import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/master/room/room.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {

  getData;
  constructor(private service: RoomService, private router: Router,private appComponent:AppComponent) {
  }

  getDoctorData;

  ngOnInit(): void {
    this.appComponent.setTitle("View room | Doctors Plaza");

    this.getByIdData(this.router.url.split('/').pop());

  }

  // tslint:disable-next-line: typedef
  getByIdData(id) {
    //console.log("iddd",id);
    // this.service.getById(id).subscribe(res => {
    this.service.getAllRoom(id).subscribe(res => {
        console.log("daaaaaaaaaaaaaa",res.data);
         this.getData = res.data[0];
        if (res.data[0].doctorData){
          this.getDoctorData = res.data[0].doctorData.doctorName;
        }
        else{
          this.getDoctorData = '-';
        }
        //this.getData = res.data;
      });
  }

}
