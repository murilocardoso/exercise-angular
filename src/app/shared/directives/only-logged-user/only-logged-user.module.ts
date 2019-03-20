import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnlyLoggedUserDirective } from './only-logged-user.directive';

@NgModule({
  declarations: [OnlyLoggedUserDirective],
  imports: [CommonModule],
  exports: [OnlyLoggedUserDirective]
})
export class OnlyLoggedUserModule {}
