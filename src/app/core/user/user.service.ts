import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jtw_decode from 'jwt-decode';
import { TokenService } from './../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root'})
export class UserService {
  private tokenService: TokenService;
  private userSubject = new BehaviorSubject<User>(null); //responsável por propagar informação
  private userName: string;

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(){
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jtw_decode(token) as User; //decodifica o token
    this.userName = user.name;
    this.userSubject.next(user);
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
