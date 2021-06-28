import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users';
import { RestService } from 'src/app/services/rest.service';
import { UserModel } from '../edit-user/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //statement
  users: Users[] = [];
  key = 'id';
  reserve: boolean = false;
  firstName: any;
  p: number = 1;
  formValue !: FormGroup;
  userModel: UserModel = new UserModel();

  //contructation
  constructor(private formBuilder: FormBuilder, private api: RestService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.getAllUser();
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    })

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);



  }

  getAllUser() {
    this.spinner.show();
    this.api.getUsers().subscribe((response) => {
      this.users = response;
      this.spinner.hide();
    })
  }

  Search() {
    if (this.firstName == "") {
      this.ngOnInit();
    } else {
      this.users = this.users.filter(res => {
        res.firstName = res.firstName.trim();
        return res.firstName.trim().toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      })
    }
  }

  postUserDetails() {
    this.userModel.firstName = this.formValue.value.firstName;
    this.userModel.lastName = this.formValue.value.lastName;
    this.userModel.email = this.formValue.value.email;
    this.userModel.mobile = this.formValue.value.mobile;
    this.userModel.salary = this.formValue.value.salary;

    this.api.postUser(this.postUserDetails).subscribe(res => {
      console.log('POST Request Lên MockAPI Thành Công', res);
      alert('Thêm Users Thành Công !')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      location.reload();
      this.getAllUser();
    }, err => {
      alert('Sai Phương Thức !')
    })
  }

  sort(key: any) {
    this.key = key;
    this.reserve = !this.reserve;
  }
  onEdit(row: any) {
    this.userModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateUserDetail() {
    this.userModel.firstName = this.formValue.value.firstName;
    this.userModel.lastName = this.formValue.value.lastName;
    this.userModel.email = this.formValue.value.email;
    this.userModel.mobile = this.formValue.value.mobile;
    this.userModel.salary = this.formValue.value.salary;
    this.api.updateUser(this.userModel, this.userModel.id).subscribe(res => {
      alert('Cập Nhật Thành Công');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
      location.reload();
    })
  }
  deleteUser(row: any) {
    this.api.deleteUser(row.id).subscribe(res => {
      alert('Xoá Thành Công')
      location.reload();
    })
  }
}
