import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { LoginComponent } from './login/login.component';
import { SiComponent } from './si/si.component';
let firebaseConfig = {
  apiKey: "AIzaSyAvfk6IBMYLlCf9MFdwpffcz4VDpBTxdog",
  authDomain: "scribe-4771.firebaseapp.com",
  databaseURL: "https://scribe-4771.firebaseio.com",
  projectId: "scribe-4771",
  storageBucket: "scribe-4771.appspot.com",
  messagingSenderId: "909760875940",
  appId: "1:909760875940:web:cfc111df605c548b048531",
  measurementId: "G-5NVQS9L23E"
};
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SiComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
