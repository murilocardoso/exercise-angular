import { SignUpService } from './signup.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/layour-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { userNamePasswordValidator } from './username-password.validator';

@Component({
  templateUrl:'./signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {
  private formBuilder : FormBuilder;
  private userNotTakenValidatorService: UserNotTakenValidatorService;
  private signUpService: SignUpService;
  private router: Router;
  signUpForm: FormGroup;

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(formBuilder: FormBuilder,
              userNotTakenValidatorService: UserNotTakenValidatorService,
              signUpService: SignUpService,
              router: Router) {
    this.formBuilder = formBuilder;
    this.userNotTakenValidatorService = userNotTakenValidatorService;
    this.signUpService = signUpService;
    this.router = router;
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required,
                   Validators.email ]],
      fullName: ['', [Validators.required,
                      Validators.minLength(2),
                      Validators.maxLength(40)]],
      userName: ['', [Validators.required,
                      lowerCaseValidator,
                      Validators.minLength(2),
                      Validators.maxLength(30)],
                      this.userNotTakenValidatorService.checkUserNameTaken()],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(14)]]
    },
      {validator: userNamePasswordValidator}
    );
    this.emailInput.nativeElement.focus();
  }

  signUp() {
    if (this.signUpForm.valid && !this.signUpForm.pending) {
      const newUser = this.signUpForm.getRawValue() as NewUser;
      this.signUpService
        .signUp(newUser)
        .subscribe(() => this.router.navigate(['']),
                  err => console.log(err)
        );
    }
  }
}
