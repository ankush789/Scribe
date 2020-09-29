import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  posts: any[]= [];
  constructor(public activatedRoute: ActivatedRoute) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(id);
    this.getProfileDetails(id);
    this.getPosts(id);
   }

  ngOnInit(): void {
  }
  getProfileDetails(id: string){
    firebase.firestore().collection("users").doc(id).get().then((docSnapshot)=>{
      this.user = docSnapshot.data();
      this.user.id = docSnapshot.id;
      //converting hobbies to an array
      this.user.hobbies = this.user.hobbies.split(',');
    }).catch((error)=>{
      console.log(error);
    })
  }

  getPosts(id: string){
    firebase.firestore().collection("posts").where("owner","==",id).
    get().then((data)=>{
      this.posts = data.docs;
    })
  }

}
