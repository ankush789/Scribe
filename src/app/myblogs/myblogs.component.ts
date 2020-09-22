import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.scss']
})
export class MyblogsComponent implements OnInit {
  user:any = {};
  constructor() {
    this.user = firebase.auth().currentUser;
   }
  
  ngOnInit(): void {
  }

}
