import { Component } from '@angular/core';
import { UserService } from './../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  private userService: UserService;
  private router: Router;
  user$: Observable<User>;
  user: User;


  constructor(userService : UserService,
              router: Router){
    this.userService = userService;
    this.router = router;
    this.user$ = this.userService.getUser();
    this.user$.subscribe(user => this.user = user);
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }
}
