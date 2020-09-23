import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; 

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  //Receiving post object from the parent component
  @Input('post') post: any;
  @Output('onDelete')onDelete = new EventEmitter;

  //Stores the data of the post which we will be getting from the post object
  postData: any = {};

  //Stores information of the currently logged in user
  user:any = {};

  constructor() { }
 // Receiving inputs must be initilaized in ngOnInit
  ngOnInit(): void {
    this.postData = this.post.data();
    this.user = firebase.auth().currentUser;
  }

  delete(){
    firebase.firestore().collection("posts").
    doc(this.post.id).delete().then(()=>{
      this.onDelete.emit();
    })

  }

}
