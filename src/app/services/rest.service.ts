import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { productImages } from '../models/productImages';
import { Users } from '../models/users';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

constructor(private http : HttpClient) { }

url: string = environment.apiUrl + '/Users';
urlNavbar: string = environment.apiUrl + '/Navbars';
urlProductImages: string = environment.apiUrl + '/productImages';

getUsers(){
  return this.http.get<Users[]>(this.url);
}
getNavbar(){
  return this.http.get(this.urlNavbar);
}

getProductImages(){
  return this.http.get<productImages>(this.urlProductImages);
}

postUser(data:any){
  return this.http.post<any>(environment.apiUrl + '/Users/',data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

updateUser(data: any,id: number){
  return this.http.put<any>(environment.apiUrl + '/Users/'+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

deleteUser(id: number){
  return this.http.delete<any>(environment.apiUrl + '/Users/'+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}
}
