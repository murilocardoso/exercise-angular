import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoComment } from './../photo/photo-comments';
import { PhotoModule } from './../photo/photo.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PhotoDetailsComponent } from "./photo-details.component";
import { RouterModule } from "@angular/router";
import { PhotoCommentsComponent } from './photo-comments/photo-comment.component';
import { VMessageComponent } from '../../shared/components/vmessage/vmessage.component';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { OnlyLoggedUserModule } from '../../shared/directives/only-logged-user/only-logged-user.module';

@NgModule({
  declarations: [
    PhotoDetailsComponent,
    PhotoCommentsComponent,
    PhotoOwnerOnlyDirective
  ],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VMessageModule,
    OnlyLoggedUserModule
  ],
  exports: [
    PhotoDetailsComponent,
    PhotoCommentsComponent
  ]
})
export class PhotoDetailsModule { }
