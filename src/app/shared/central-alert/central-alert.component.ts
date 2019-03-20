import { Component } from "@angular/core";
import { CentralAlertService } from './central-alert.service';
import { Input } from "@angular/core";
import { CentralAlert, CentraAlertType } from "./central-alert";


@Component({
  selector: 'ap-central-alert',
  templateUrl: './central-alert.component.html'
})
export class CentralAlertComponent {
  @Input() timeout = 1500;
  alerts: CentralAlert[] = [];

  constructor(private centralAlertService : CentralAlertService) {
    this.centralAlertService.getAlert()
                              .subscribe(alert => {
                                if (!alert) {
                                  this.alerts = [];
                                  return;
                                }
                                this.alerts.push(alert);
                                setTimeout(() => this.removeAlert(alert),this.timeout)
                              });

  }

  private removeAlert(alertToBeRemoved : CentralAlert) {
    this.alerts = this.alerts.filter(alert => alert != alertToBeRemoved)
  }

  getAlertClass(alert: CentralAlert) : string {
    if (!alert) return '';

    switch(alert.centralAlertType) {
      case CentraAlertType.ERROR:
        return 'alert alert-danger';
      case CentraAlertType.SUCCESS:
        return 'alert alert-success';
      case CentraAlertType.INFO:
        return 'alert alert-info';
      case CentraAlertType.WARNING:
        return 'alert alert-warning';
    }
  }
}
