import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpService } from './signup.service';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {
  private signUpService: SignUpService;

  constructor(signUpService: SignUpService) {
    this.signUpService = signUpService;
  }

  checkUserNameTaken() {
    return (control: AbstractControl) => {
        return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => {
                  return this.signUpService.checkUserNameTaken(userName);
                }))
                .pipe(map(isTaken =>  isTaken ? { userNameTaken: true } : null))
                .pipe(first());
    }
  }
}
