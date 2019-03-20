import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { Photo } from '../photo/Photo';
import { PhotoService } from './../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  private activatedRoute: ActivatedRoute;
  private photoService: PhotoService;
  photos: Photo[] = [];
  filter: string = '';
  hasMorePhotos: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(activatedRoute: ActivatedRoute, photoService: PhotoService) {
    this.activatedRoute = activatedRoute;
    this.photoService = photoService;
  }

  ngOnInit() : void{
    this.activatedRoute.params.subscribe( params => {
        this.userName = params.userName;
        this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  load() {
    console.log('load()');
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMorePhotos = false;
      });
  }

}
