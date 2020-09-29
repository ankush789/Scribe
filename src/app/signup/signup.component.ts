import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-signup', 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
first_name: string;
last_name: string;
message: string ='';
userError:any;

myForm: FormGroup;

  constructor(public fb: FormBuilder, public authService : AuthService, public router: Router) {
    this.myForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
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
    
    let email: string= signupform.value.email;
    let password: string =signupform.value.password;
    let firstName: string =signupform.value.firstName;
    let lastName: string = signupform.value.lastName;
    //let confirmPassword: string= signupform.value.confirmPassword;

    this.authService.signup(email, password,firstName, lastName).
    then((user:any) => {
      firebase.firestore().collection("users").doc(user.uid).set({
        firstName: signupform.value.firstName,
        lastName: signupform.value.lastName,
        email: signupform.value.email,
        photoURL: user.photoURL,
        interests: "",
        bio: "",
        hobbies: ""
      }).then(()=>{
          firebase.auth().signOut();
          this.message = 'You have been signed up successfully. Redirecting to login . . .';
          //Delaying redirect to login page by 3 seconds
          this.authService.redirectToLogin();
      })
      }).catch((error) => {
      console.log(error);
      this.userError = error;
    })


  }
  ngOnInit(): void {
  }

}
