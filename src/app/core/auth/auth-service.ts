
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment'

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  private userService: UserService;

  constructor(http: HttpClient,
              userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  authenticate(userName: string, password: string) {
    return this.http
            .post(
                API + '/user/login',
                {userName: userName, password: password},
                { observe: 'response'})
            .pipe(tap(res => {
              const authToken = res.headers.get('x-access-token');
              this.userService.setToken(authToken);
            }));
  }
}
