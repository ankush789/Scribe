import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public router: Router ) {  }

  login(email: string , password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string, first_name: string, last_name:string){
    return new Promise ((resolve , reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email,password).then(
        (response)=>{
            let randomNumber = Math.floor(Math.random() * 1000);
            response.user.updateProfile({
            displayName: first_name + " " + last_name,
            photoURL: "https://api.adorable.io/avatars/" + randomNumber
          }).then(()=>{
            resolve(response.user);
          }).catch((error)=>{
            reject(error);
          })
        }).catch((error)=>{
          reject(error);
        })
    })
    }
//function for delaying redirecting to the login page by 3 seconds using promise
    redirectToLogin(){
      return new Promise( resolve => {
        setTimeout(() => resolve(this.router.navigate(['/login'])) ,3000);
      })
    }
  }

