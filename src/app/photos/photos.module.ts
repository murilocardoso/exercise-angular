import { AppRoutingModule } from './../app.routing.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { NgModule } from '@angular/core';


import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    PhotoModule,
    PhotoFormModule,
    PhotoListModule,
    PhotoDetailsModule,
    RouterModule
  ]
})
export class PhotosModule{}
