import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  message:string;
  constructor() { this.getProfile(); }

  ngOnInit(): void {
  }

  getProfile(){
    let userId = firebase.auth().currentUser.uid;

    firebase.firestore().collection("users").doc(userId).get().
    then((docSnapshot)=>{
      this.user = docSnapshot.data();
      this.user.displayName = this.user.firstName+" "+this.user.lastName;
      //It creates a field id in the user object
      this.user.id = docSnapshot.id;
      console.log(this.user);
    }).catch((error)=>{
      console.log(error);
    })
  }

  update() {
    this.message = "Updating Profile ...";
    firebase.auth().currentUser.updateProfile({
      displayName: this.user.displayName, photoURL: this.user.photoURL
    }).then(() => {
      let userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
        firstName: this.user.displayName.split(' ')[0],
        lastName: this.user.displayName.split(' ')[1],
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio
      }).then(() => {
        this.message = "Profile Updated Successfully";
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    })
  }

}
