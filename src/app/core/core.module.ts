import { MenuModule } from './../shared/menu/menu.module';
import { LoadingModule } from './../shared/components/loading/loading.module';
import { CentralAlertModule } from './../shared/central-alert/central-alert.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { OnlyLoggedUserModule } from '../shared/directives/only-logged-user/only-logged-user.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CentralAlertModule,
    LoadingModule,
    MenuModule,
    OnlyLoggedUserModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
