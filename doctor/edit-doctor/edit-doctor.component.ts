import { SignupService } from './../../../doctor/signup/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { DoctorService } from '../../../../services/master/doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Util } from '../../../../../../Utility/util';
import { AppComponent } from 'src/app/app.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';



@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;
  is_space=false;
  depts : any;
   croppedImage;
 filename;
 imageChangedEvent;
  catImageBase64;

  constructor(private formBuilder: FormBuilder, private deptservice: SignupService,
    private router: Router, private service: DoctorService,  private toastr: ToastrService,private appcomponent:AppComponent) { }

  ngOnInit(): void {
    this.appcomponent.setTitle("Edit Doctors Management | Doctors Plaza");


    this.submitForm = this.formBuilder.group({
      doctorName: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      email: ['',[Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]],
      //active: ['', Validators.required],
      departmentName: ['', Validators.required],
      consultancyFee:[''],
      image:[''],
    });
    this.deptservice.getDepartmentNames().subscribe((data) => {
      console.log(data)
      this.depts = data.data;
      console.log('depts', this.depts)
    });
    this.returnUrl = '/master/doctor';
    this.id = this.router.url.split('/').pop();
    this.getByIdData(this.id);
  }

  // tslint:disable-next-line: typedef
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
  // tslint:disable-next-line: typedef
  getByIdData(id) { 
    this.service.getById(id).subscribe(res => {
      this.getData = res.data;
        console.log("this.getData.profile_picture",res.data.profile_picture);
      if(res.data.profile_picture){
         $("#image").attr("src",res.data.profile_picture)
      }else{
        this.getData.profile_picture="https://langleyinsuranceagents.com/wp-content/uploads/2018/09/image-placeholder.png";
        // $("#image").attr("src","https://langleyinsuranceagents.com/wp-content/uploads/2018/09/image-placeholder.png")
      }
      
      console.log(res.data);
      this.submitForm = this.formBuilder.group({
        doctorName: [res.data.doctorName, [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      email: [res.data.email, [Validators.required, Validators.email]],
      contactNumber: [res.data.contactNumber, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]],
    //  active: [res.data.active + '' , Validators.required],
      departmentName: [res.data.specialization, Validators.required],
      consultancyFee:[res.data.consultancyFee],
      image:[res.data.profile_picture]
      });


    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data) {
    this.isSubmitted = true;

    // if (data.doctorName.trim() != "") {
    //   if (!($("#val_id1").hasClass("hidden")))
    //     $("#val_id1").addClass("hidden");
    // } else {
    //   $("#val_id1").removeClass("hidden");
    //   return false;
    // }
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
    // else {
      this.service.updateById(id, data).subscribe(response => {
        if (response.data) {
          this.toastr.success(response.message);
          this.router.navigate([this.returnUrl]);
        }
        else {
          this.isSubmitted = false;
          this.toastr.error(response.message);
          this.message = 'Failed to submit the form.';
        }
      });
    // }
  }

}
