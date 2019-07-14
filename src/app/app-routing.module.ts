import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
//if no path is provided go to /login path
{ path: ' ', pathMatch: 'full', redirectTo: '/login'},
//if the path given is login go to /login path with data from login component
{ path: 'login', component: LoginComponent },
//Else redirect to login page
{ path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
