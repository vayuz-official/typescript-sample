import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RoomService } from '../../../../services/master/room/room.service';
import { ClinicService } from 'src/app/services/master/clinic/clinic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  constructor(private toastr : ToastrService,private formBuilder: FormBuilder, private clinicService: ClinicService,private _route: ActivatedRoute, private router: Router, private service: RoomService,private appcomponent:AppComponent ) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;
  inputArr = [];
  depts : any;
  id;
  dayz = [ { 'id': 1, 'text': 'Mumbai' },
  { 'id': 2, 'text': 'Bangaluru' },];
  floors = []
  dropdownSettings:any = {};
  // dropdownSettings = {};
  dropdownList = ['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedItems = [];

  ngOnInit(): void {
    this.appcomponent.setTitle("Add room | Doctors Plaza");
     this.id = this._route.snapshot.params.id;
    this.getById(this.id);
  //  var temp = [];
  //  for( let i=0; i<this.dayz.length; i++){
  //   // this.arr.push(res.data[i]);
  //   temp.push( {'id' : this.dayz[i].id, 'text' : this.dayz[i].text} ); 
  // }
  // this.dropdownList = temp;
  console.log(this.dropdownList)
  this.initMultiSelect();

    this.service.getDepartmentNames().subscribe((data) => {
      console.log(data)
      this.depts = data.data;
      console.log('depts', this.depts)
    });
   
    // this.submitForm = this.formBuilder.group({
    //   clinicData : [this.router.url.split('/').pop() + ''],
    //   inputArr: this.formBuilder.array([]),
    //   // roomNumber: ['', Validators.required],
    //   // 
    //   // paidStatus : ['false'],

    // });
    this.initForm();
    this.returnUrl = '/master/room';
  }

 getById(id){
       this.clinicService.getById(id).subscribe(res => {
         console.log(res.data)
         for (var i = 0; i < parseInt(res.data.floorCount); i++) {
           this.floors.push((i+1).toString())
         }
       })
    }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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

initForm(){
   this.submitForm = new FormGroup({
       floor: new FormControl('', [Validators.required, ]),
        roomName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\-\\s]+$"), this.noWhitespace, Validators.pattern(/^((?!\s{2,}).)*$/)]),
        roomNumber: new FormControl('', [Validators.required,   Validators.pattern(/^((?!\s{2,}).)*$/)]),
        specialization: new FormControl('', Validators.required),
        // startTime: new FormControl ('', Validators.required),
        // endTime: new FormControl('', Validators.required),
        rentPerMonth: new FormControl('', Validators.required),
        days: new FormControl(this.selectedItems, Validators.required)
});
}
  // initItemRows() {
  //   let ctrl = <FormArray>this.submitForm.controls.inputArr;
  //   ctrl.push(
  //     this.formBuilder.group({
  //       floor: new FormControl('', [Validators.required, ]),
  //       roomName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\-\\s]+$"), this.noWhitespace, Validators.pattern(/^((?!\s{2,}).)*$/)]),
  //       roomNumber: new FormControl('', [Validators.required,   Validators.pattern(/^((?!\s{2,}).)*$/)]),
  //       specialization: new FormControl('', Validators.required),
  //       startTime: new FormControl ('', Validators.required),
  //       endTime: new FormControl('', Validators.required),
  //       rentPerMonth: new FormControl('', Validators.required),
  //       days: new FormControl(this.selectedItems, Validators.required)
  //     })
  //   )
  // };

  removeRow(i) {
    const opt = this.submitForm.controls.inputArr as FormArray;
    opt.removeAt(i);
  }

  addDays(d) {
    alert(d)
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }


  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(data){
   
     data.clinicData = this._route.snapshot.params.id;
    this.isSubmitted = true;
    console.log(data);
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    else{
      this.service.add(data).subscribe(response => {
        console.log(response)
        if (response.code==200){
          this.router.navigate([this.returnUrl]);
        }else if(response.code==900){
           this.toastr.error(response.message)
        }
        else{
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
          console.log(data);
        }
      });
    }
  }

}
