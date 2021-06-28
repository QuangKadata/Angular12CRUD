import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductImagesComponent } from './components/productImages/productImages.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: '' ,component: DashboardComponent},
  {path: 'dashboard' ,component: DashboardComponent},
  {path: 'user' ,component: UsersComponent},
  {path: 'user/:id',component: EditUserComponent},
  {path: 'productImages',component: ProductImagesComponent},
  {path: 'productImages/:id',component: ProductImagesComponent},
  {path: '**' ,component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
