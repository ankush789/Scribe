import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder) {
    this.form= this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })

   }

  ngOnInit(): void {
  }

  onSubmit(form){
    firebase.auth().signInWithEmailAndPassword(form.value.email, form.value.password).then((data)=>{
      console.log(data);
      this.message="You have been successfully logged in !!";
    }).catch((error)=>{
      console.log(error);
      this.userError=error;
    })
  }

}
