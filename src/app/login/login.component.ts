import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
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
      this.router.navigate(['/myblogs']);
    }).catch((error)=>{
      console.log(error);
      this.userError=error;
    })
  }

}
