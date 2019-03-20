import { AuthService } from './../../core/auth/auth-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
  private formBuilder: FormBuilder;
  private authService: AuthService;
  private router: Router;
  private activatedRoute: ActivatedRoute;

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(formBuilder: FormBuilder,
              authService: AuthService,
              router: Router,
              activatedRoute: ActivatedRoute) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.activatedRoute
          .queryParams
          .subscribe(params => {
            console.log('SignInComponent.ngOnInit.activatedRoute');
            console.log('fromUrl: '+ params['fromUrl']);
            this.fromUrl = params['fromUrl']});

    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.userNameInput.nativeElement.focus()
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.authService
      .authenticate(userName, password)
      .subscribe(
                  () => this.fromUrl
                  ? this.router.navigateByUrl(this.fromUrl)
                  : this.router.navigate(['user',userName]),
                  (err) => {
                    this.loginForm.reset();
                    this.userNameInput.nativeElement.focus();
                  }
                );
    }


  }
}
