import { environment } from './../../../environments/environment';
import { PhotoComment } from './photo-comments';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Photo } from "./Photo";
import { map, catchError } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: "root" })
export class PhotoService {
    http: HttpClient;

    constructor(http: HttpClient) {
         this.http = http;
    }

    listFromUser(userName: string) {
      return this.http.get<Photo[]>(API + '/' + userName +'/photos');
    }

    listFromUserPaginated(userName: string, pageNumber: number) {
      const params = new HttpParams()
        .append("page", pageNumber.toString())

      return this.http.get<Photo[]>(API + '/' + userName +'/photos', { params });
    }

    upload(description: string, allowComments: boolean, file: File) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('allowComments', allowComments ? 'true' : 'false');
      formData.append('imageFile', file);

      return this.http.post(API + '/photosx/upload',
                            formData,
                            { observe: 'events',
                              reportProgress : true});
    }

    findById(photoId : number) {
      return this.http.get<Photo>(API + "/photos/" + photoId);
    }

    getComments(photoId : number) {
      return this.http.get<PhotoComment[]>(API + "/photos/" + photoId + "/comments");
    }

    addComment(photoId: number, comment: string) {
      return this.http.post(API + "/photos/" + photoId + "/comments", {commentText : comment} );
    }

    removePhoto(photoId: number) {
      return this.http.delete(API + "/photos/" + photoId);
    }

    like(photoId: number) {
      return this.http.post(API + "/photos/" + photoId + "/like", {}, {observe: 'response'} )
                        .pipe(map(res => true))
                        .pipe(catchError(err => {
                          return err.status == '304' ? of(false) : throwError(err);
                        }));
    }
}
