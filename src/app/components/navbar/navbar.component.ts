import { Component, OnInit } from '@angular/core';
import { Navbars } from 'src/app/models/navbars';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbars: any = [];

  constructor(public rs: RestService) { }

  ngOnInit() {
    this.rs.getNavbar().subscribe((response) =>{
      this.navbars = response;
      console.log(response)
    })
  }

}
