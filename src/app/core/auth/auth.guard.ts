import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate
{
  private userService: UserService;
  private router: Router;

  constructor(userService: UserService,
              router: Router) {
    this.userService = userService;
    this.router = router;
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.userService.isLogged()) {
      this.router.navigate(
        [''],
        {
          queryParams: {
            fromUrl: state.url
          }
        });
      return false;
    }
    return true;
  }
}
