import { CentralAlertService } from './../../shared/central-alert/central-alert.service';
import { CentralAlert } from './../../shared/central-alert/central-alert';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/Photo';
import { PhotoComment } from '../photo/photo-comments';
import { Router } from '@angular/router';
import { UserService } from '../../core/user/user.service';

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoComments$: Observable<PhotoComment[]>;
  photoId: number;

  constructor(private route: ActivatedRoute,
              private photoService: PhotoService,
              private router: Router,
              private centralAlert: CentralAlertService,
              private userService: UserService) {  }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(()=>{}, (err) => {
      console.log(err);
      this.router.navigate(['not-found']);
    })
    this.photoComments$ = this.photoService.getComments(this.photoId);
  }

  remove() {
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(() => {
        this.centralAlert.success('The photo was removed successfully');
        this.router.navigate(['/user', this.userService.getUserName(), { replaceUrl: true}]);
      },
      (err) => {
        console.log(err);
        this.centralAlert.error("The photo could not be deleted");
      });
  }

  like(photo: Photo) {
    this.photoService
      .like(photo.id)
      .subscribe(result => {
        if (result) {
          this.photo$ = this.photoService.findById(photo.id);
        }
      },
      err => {
        console.log(err);
        this.centralAlert.error("Ops! Something wrong happened!");
      })
  }
}
