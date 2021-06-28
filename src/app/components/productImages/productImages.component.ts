import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { productImages } from 'src/app/models/productImages';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-productImages',
  templateUrl: './productImages.component.html',
  styleUrls: ['./productImages.component.scss']
})
export class ProductImagesComponent implements OnInit {

  productImage:any= [];
  p:number = 1;
  formValue !:FormGroup;
  key = 'id';
  name: any;
  
  reserve: boolean = false;
 
  constructor(public rs: RestService) { }

  ngOnInit() {
    this.rs.getProductImages().subscribe((response) =>{
      this.productImage = response;
      console.log(response)
    })
  }

  Search(){
    if (this.name == "") {
      this.ngOnInit();
    }else{
      this.productImage = this.productImage.filter((res:any)=>{
        res.name.trim();
        return res.name.trim().toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  sort(key: any){
    this.key = key ;
    this.reserve = !this.reserve;
  }
}
