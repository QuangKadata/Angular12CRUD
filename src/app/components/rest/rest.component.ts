import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent implements OnInit {

  //statement
  users: Users[] = [];
  showNotification : boolean = false;
  key = 'id';
  reserve: boolean = false;
  fistName : any;
  p: number = 1;

  //contructation
  constructor(public rs:RestService) { }

  ngOnInit() {
    // this.showSpinner();
    this.rs.getUsers().subscribe((response) =>{
      this.users = response;
    })
  }

  Search(){
    if (this.fistName == "") {
      this.ngOnInit();
    }else{
      this.users = this.users.filter(res =>{
        res.firstName.trim();
        return res.firstName.trim().toLocaleLowerCase().match(this.fistName.toLocaleLowerCase());
      })
    }
  }

  // showSpinner() {
  //   this.spinner.show();
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 1000);
  // }

  ClickShowNotification(){
    this.showNotification = !this.showNotification;
  }

  sort(key: any){
    this.key = key;
    this.reserve = !this.reserve;
  }

}
