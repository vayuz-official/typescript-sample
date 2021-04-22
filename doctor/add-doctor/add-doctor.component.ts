import { SignupService } from './../../../doctor/signup/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Util } from '../../../../../../Utility/util';
import { DoctorService } from '../../../../services/master/doctor/doctor.service';
import { NotificationService } from 'src/app/services/master/notification/notification.service';
import { AppComponent } from 'src/app/app.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
      private service: DoctorService,
      private deptservice: SignupService,
      private toastr: ToastrService,
      private notservice:NotificationService,
      private appcomponent:AppComponent 
      ) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;
  is_space = false;
  depts: any;
 croppedImage;
 filename;
 imageChangedEvent;
  catImageBase64;
  ngOnInit(): void {

    this.appcomponent.setTitle("Add Doctors Management | Doctors Plaza");

    this.initForm();
    this.returnUrl = '/master/doctor';
    this.deptservice.getDepartmentNames().subscribe((data) => {
      console.log(data)
      this.depts = data.data;
      console.log('depts', this.depts)
    });
  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      doctorName: new FormControl('', [Validators.required, this.noWhitespace, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      email: new FormControl('', [Validators.required, this.noWhitespace, Validators.email]),
      departmentName: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, this.noWhitespace, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
      state: ['', [Validators.required, this.noWhitespace, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      city: ['', [Validators.required, this.noWhitespace, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      pincode: ['', [Validators.required, this.noWhitespace, Validators.minLength(6),Validators.pattern("^[0-9]+$"), Validators.maxLength(6)]],
      address: ['', [Validators.required, this.noWhitespace]],
    });
  }
public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  get f() { return this.submitForm.controls; }

  imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
         $("#image").attr("src",event.base64)
    }
 convertCatImageBase64(event) {
   
     $("#hide_div").removeClass("hidden");
     var fileName = document.getElementById("cat_image")["value"];
     console.log("fileName",fileName);
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            var form1 = document.getElementById("cat_image");
          var file1 = form1['files'][0];
          this.filename=file1.name;
         this.imageChangedEvent = event;
        var fileReader = new FileReader();
       var refrence = this; 
        fileReader.onload = function () {
        refrence.catImageBase64 = fileReader.result;  // data <-- in this var you have the file data in Base64 format
        console.log("refrence.catImageBase64 :",refrence.catImageBase64);
        $("#image").attr("src",refrence.catImageBase64)
         };
        
        fileReader.readAsDataURL($('#cat_image').prop('files')[0]);
  
       }
       else{
            this.toastr.error("Only jpg/jpeg and png files are allowed!");
        } 
   }
 cropperReady(){
      console.log("redyy  cropper")
    }
loadImageFailed(){

}
imageLoaded(){
  
}
getFileObjetc(){
  let ImageURL = $("#image").attr("src");
  var block = ImageURL.split(";");
// Get the content type of the image
var contentType = block[0].split(":")[1];// In this case "image/gif"
// get the real base64 content of the file
var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

let fname = this.filename;
// Convert it to a blob to upload
var blob = Util.b64toBlob(realData, contentType,550,fname);
console.log("blob",blob)

   this.service.fetFileUrl(blob).subscribe(data=>{
           console.log("data   ",data);
          // this.image_url=data["data"];
           $("#image").attr("src",data["data"]);
           $("#hide_div").addClass("hidden");

        });
}

  addData(formGroup: FormGroup, data) {
    console.log(data);
    let temp: any = {
      is_admin: true,
    }
    Object.assign(data, temp); 
   // Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    console.log("this.submitForm.invalid",this.submitForm);
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }

      if(!Util.validateAlphaNumericWithSpace(data.doctorName)){
       this.is_space=true
       return;
    }else{
      this.is_space=false
    }
   if($("#image").attr("src")){
     data.image=$("#image").attr("src")
   }
   console.log(data)
    this.service.create(data).subscribe(response => {
      if (response.data!=null&&response.success) {
     
        this.toastr.success(response.message);

        var postnotdata={
          content:"Hi "+data.doctorName+" You've been added  by the main office .You can now access our services.Check your credentails below and sign in on to Doctors Plaza using those.",
          type:"doctor add from admin",
          source:"admin",
          dest : "/",
          doctor_id : response.data._id,
           emailtext:"Docotr plaza Doctor Add",
          emailsubject:"Doctor Added From Admin",
          name:data.doctorName,
         email:data.email,
         
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
        this.toastr.error(response.message);
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
