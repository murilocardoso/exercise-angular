import { PhotoService } from "../photo/photo.service";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Photo } from "../photo/Photo";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable({providedIn : "root"})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
    private photoService: PhotoService;

    constructor(photoService: PhotoService){
        this.photoService = photoService;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Photo[]> {
        const userName = route.params.userName;
        return this.photoService.listFromUserPaginated(userName,1);
    }
}
