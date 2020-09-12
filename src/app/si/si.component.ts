import { Component, OnInit } from '@angular/core';
import { InterestService } from '../interest.service';
import { FormBuilder , FormGroup , FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-si',
  templateUrl: './si.component.html',
  styleUrls: ['./si.component.scss']
})
export class SiComponent implements OnInit {
  myform: FormGroup;
  amount: number;
  simpleInterest: number;
  constructor(public fb: FormBuilder, public interestService: InterestService) {
    this.myform = this.fb.group({
      principalAmount: ['0'],
      rateOfInterest: ['0'],
      time: ['0'],
      simpleInterest : ['']
    })
   }

  onSubmit(form){
    let principal = form.value.principalAmount;
    let interest = form.value.rateOfInterest;
    let time = form.value.time;

    let obj= this.interestService.submit(principal, interest, time);
    this.simpleInterest = obj.simpleInterest;
    this.amount = obj.totalAmount;
  }
  ngOnInit(): void {
  }

}
