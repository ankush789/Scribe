import { Component, OnInit } from '@angular/core'; 
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; 

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.scss']
})
export class MyblogsComponent implements OnInit {
  user:any = {};
  posts:any[] = [];
  constructor() {
    this.user = firebase.auth().currentUser;
    this.getPosts();
   }
  
  ngOnInit(): void {
  }
  getPosts(){
    //get the lists of post
     firebase.firestore().collection("posts").get().then((querySnapshot)=>{
      console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs;
    }).catch((err)=>{
      console.log(err);
    })
  }
  onPostCreated(){
    //refresh the list of posts
        this.posts = [];
        this.getPosts();
  }
  onDelete(){
    //refresh the list of posts
            this.posts = [];
            this.getPosts();
  }

}
