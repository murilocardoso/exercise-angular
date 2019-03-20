
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CentralAlertComponent } from "./central-alert.component";

@NgModule({
  declarations: [CentralAlertComponent],
  imports: [CommonModule],
  exports: [CentralAlertComponent]
})
export class CentralAlertModule{}
