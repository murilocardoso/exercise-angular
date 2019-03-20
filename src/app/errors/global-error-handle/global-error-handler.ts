import { ServerLogService } from './server-log.service';
import { UserService } from './../../core/user/user.service';
import { ErrorHandler} from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    console.log('passei pelo handler');

    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLog = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);

    const url = location instanceof PathLocationStrategy
      ? location.path()
      : '';

    const message = error.message ? error.message : error.toString();

    if(environment.production) router.navigate(['/error']);

    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

        console.log(message);
        console.log(stackAsString);
        console.log(url);
        console.log(userService.getUserName());

        serverLog.log({message, url, userName: userService.getUserName(), stack: stackAsString})
                  .subscribe(() => console.log("error logged successfully"),
                             err => console.log(err));
      })
  }
}
