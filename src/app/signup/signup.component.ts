import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';

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
    })
   }



  onSubmit(signupform){
    console.log(signupform.value);
  }
  ngOnInit(): void {
  }

}
