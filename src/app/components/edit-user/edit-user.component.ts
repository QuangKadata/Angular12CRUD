import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  exportAs: 'appEditUser'
})

export class EditUserComponent implements OnInit {
  
  formValue !:FormGroup;
  userModel : UserModel = new UserModel();
  constructor(private formBuilder: FormBuilder,private api: RestService) { }

  ngOnInit():void {
   this.formValue = this.formBuilder.group({
     firstName : [''],
     lastName : [''],
     email : [''],
     mobile : [''],
     salary : [''],
   })
  }

  postUserDetails(){
    this.userModel.firstName = this.formValue.value.firstName;
    this.userModel.lastName = this.formValue.value.lastName;
    this.userModel.email = this.formValue.value.email;
    this.userModel.mobile = this.formValue.value.mobile;
    this.userModel.salary = this.formValue.value.salary;

    this.api.postUser(this.postUserDetails).subscribe(res =>{
      console.log('post ok',res);
      alert('Added OK !')
    },err=>{
      alert('Something When Wrong')
    })
  }
  
}
