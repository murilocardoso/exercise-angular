import { environment } from './../../../environments/environment';
import { NewUser } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

const API = environment.ApiUrl;

@Injectable()
export class SignUpService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  checkUserNameTaken(userName: string) {
    return this.http.get(API + '/user/exists/'+ userName);
  }

  signUp(newUser: NewUser) {
    return this.http.post(API + '/user/signup', newUser);
  }
}
