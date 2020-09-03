import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
first_name: string;
last_name: string;

myForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: this.checkIfMatchingPasswords("password","confirmPassword")
    })

   }
   checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string){
      return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if(password.value == confirmPassword.value){
          return;
        }
        else {
          confirmPassword.setErrors({
            notEqualToPassword: true 
          })
        }
      }
   }


  onSubmit(signupform){
    console.log(signupform.value);
    //console.log(signupform);
    let email: string= signupform.value.email;
    let password: string =signupform.value.password;
    let firstName: string =signupform.value.firstName;
    let lastName: string = signupform.value.lastName;

    firebase.auth().createUserWithEmailAndPassword(email, password).
    then((response) => {
      console.log(response);
      let randomNumber =Math.floor(Math.random() *1000);
      response.user.updateProfile({
        displayName:firstName + " " + lastName,
        photoURL: "https://api.adorable.io/avatars/" + randomNumber
      })


    }).catch((error) => {
      console.log(error);
    })

  }
  ngOnInit(): void {
  }

}
