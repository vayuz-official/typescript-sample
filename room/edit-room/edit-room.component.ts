import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RoomService } from '../../../../services/master/room/room.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;
  depts : any;
  floors = ['1', '2', '3']
  dropdownSettings:any = {};
  @ViewChild('multiSelect') multiSelect;
  public loadContent: boolean = false;
  // dropdownSettings = {};
  dropdownList = ['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedItems = [];
  constructor(private toastr : ToastrService,private formBuilder: FormBuilder, private router: Router, private service: RoomService, private appComponent:AppComponent) { }

  ngOnInit(): void {
    this.initMultiSelect();
    this.appComponent.setTitle("Edit Room | Doctors Plaza");


    this.service.getDepartmentNames().subscribe((data) => {
      console.log("dataaaaaa",data)
      this.depts = data.data;
      console.log('depts', this.depts)
    });
    this.submitForm = this.formBuilder.group({
      floor: new FormControl('', [Validators.required, ]),
        roomName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\-\\s]+$"), Validators.pattern(/^((?!\s{2,}).)*$/)]),
        roomNumber: new FormControl('', [Validators.required,   Validators.pattern(/^((?!\s{2,}).)*$/)]),
        specialization: new FormControl('', Validators.required),
        // startTime: new FormControl ('', Validators.required),
        // endTime: new FormControl('', Validators.required),
        rentPerMonth: new FormControl('', Validators.required),
        days: new FormControl(this.selectedItems, Validators.required),
        id: new FormControl(this.router.url.split('/').pop())
    });
    this.returnUrl = '/master/room';
    this.id = this.router.url.split('/').pop();
    this.getByIdData(this.id);
  }

  
  onSelectAll(items: any) {
    console.log(items);
  }
   public setForm() {
    this.submitForm = new FormGroup({
      name: new FormControl(this.dropdownList, Validators.required)
    });
    this.loadContent = true;
  }
public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }
  initMultiSelect() {
    this.dropdownSettings = {
      singleSelection: false,
      // idField: 'id',
      // textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    }
  }


  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }
  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  getByIdData(id) {
    this.service.getRoomById(id).subscribe(res => {
      console.log(res.data);
      for (var i = 0; i < res.data.length; ++i) {
        this.selectedItems.push(res.data[i].day)
      }
      this.getData = res.data;
      console.log(res.data[0].roomId.floor);
      this.submitForm = this.formBuilder.group({
        floor: new FormControl(res.data[0].roomId.floor, [Validators.required, ]),
        roomName: new FormControl(res.data[0].roomId.roomName, [Validators.required, Validators.pattern("^[a-zA-Z0-9\\-\\s]+$"), Validators.pattern(/^((?!\s{2,}).)*$/)]),
        roomNumber: new FormControl(res.data[0].roomId.roomNumber, [Validators.required,   Validators.pattern(/^((?!\s{2,}).)*$/)]),
        specialization: new FormControl(res.data[0].roomId.specialization, Validators.required),
        // startTime: new FormControl (res.data[0].roomId.roomStartTime, Validators.required),
        // endTime: new FormControl(res.data[0].roomId.roomEndTime, Validators.required),
        rentPerMonth: new FormControl(res.data[0].roomId.rentPerMonth, Validators.required),
        days: new FormControl(this.selectedItems, Validators.required),
        id: new FormControl(this.router.url.split('/').pop())
      });
    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data) {

     data.clinicData = this.getData[0].roomId.clinicData;
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    } 
    else {
      this.service.edit( data).subscribe(response => {
        console.log("response",response);
        if (response.code==200){
          this.router.navigate([this.returnUrl]);
        }else if(response.code==900){
           this.toastr.error(response.message)
        }
        else {
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
        }
      });
    }
  }

}
