import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  //textarea is bound to comment
  comment: string = '';
  comments: any[] = [];
  loggedIn: boolean = false;

  @Input('postId') postId: string;

  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? (this.loggedIn = true) : (this.loggedIn = false);
    });
  }

  ngOnInit(): void {
    this.getComments();
  }
  //Saving comments to firebase firestore
  postComment() {
    if (this.comment.length < 5) {
      return;
    }

    firebase
      .firestore()
      .collection('comments')
      .add({
        text: this.comment,
        post: this.postId,
        owner: firebase.auth().currentUser.uid,
        ownerName: firebase.auth().currentUser.displayName,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((data) => {
        console.log('comment is saved!!');
        this.getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //getting all the comments from cloud firestore

  getComments() {
    this.comments = [];
    firebase.firestore().collection("comments").
    where("post","==", this.postId).orderBy("created","desc").get().then((data)=>{
      console.log(data);
      data.docs.forEach((commentRef)=>{
        this.comments.push(commentRef.data())
      })
    })
  }
}
