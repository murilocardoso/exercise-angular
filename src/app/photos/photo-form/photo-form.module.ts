import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
  declarations: [
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    RouterModule
  ]
})
export class PhotoFormModule {}
