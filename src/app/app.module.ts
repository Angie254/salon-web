import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
//import { NgbModule } from '@angular/core/bundles/core.umd.js';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  AlertService,
  AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
