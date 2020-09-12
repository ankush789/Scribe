import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.form= this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })

   }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.authService.login(form.value.email, form.value.password).then((data)=>{
      console.log(data);
      this.message="You have been successfully logged in !!";
    }).catch((error)=>{
      console.log(error);
      this.userError=error;
    })
  }

}
