import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DarkenOnHoverModule } from './../../shared/directives/darken-on-hover/darken-on-hover.module';
import { CardModule } from './../../shared/components/card/card.module';
import { PhotoModule } from './../photo/photo.module';
import { FilterByDescription } from './filter-by-description.pipe';
import { PhotosComponent } from './photos/photos.component';
import { PhotoListComponent } from './photo-list.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    FilterByDescription,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    DarkenOnHoverModule,
    RouterModule
  ]
})
export class PhotoListModule {}
