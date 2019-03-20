import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CentralAlert, CentraAlertType } from "./central-alert";
import { Router, NavigationStart } from "@angular/router";

@Injectable({providedIn: 'root'})
export class CentralAlertService {
  private alertSubject: Subject<CentralAlert> = new Subject<CentralAlert>();
  private keepAfterRouteChange: boolean = true;

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.keepAfterRouteChange) {
          this.clear();
          this.keepAfterRouteChange = true;
        }
      }
    })
  }

  success(message: string, keepAfterRouteChange: boolean = true){
    this.alert(CentraAlertType.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange: boolean = true){
    this.alert(CentraAlertType.WARNING, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange: boolean = true){
    this.alert(CentraAlertType.ERROR, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange: boolean = true){
    this.alert(CentraAlertType.INFO, message, keepAfterRouteChange);
  }

  private alert(centralAlertType: CentraAlertType, message: string, keepAfterRouteChange: boolean) {
    this.alertSubject.next(new CentralAlert(centralAlertType, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clear(){
    this.alertSubject.next(null);
  }
}
