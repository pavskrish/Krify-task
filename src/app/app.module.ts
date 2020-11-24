import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxPaginationModule } from 'ngx-pagination';


/******Components which are used in the application*********/
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MeetingComponent } from './meeting/meeting.component';
import { AppGlobals } from './app.globals';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    GooglePlaceModule,
    NgxPaginationModule
  ],
  providers: [
    LocalStorage,
    AppGlobals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
