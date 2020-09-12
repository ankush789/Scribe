import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor() { }
  submit(principal: number, interest: number, time: number){
    let simpleInterest = (principal*interest*time)/(100 * 12);
    let totalAmount = simpleInterest + principal;

    return {
      simpleInterest: simpleInterest,
      totalAmount: totalAmount
    }
  }
}
