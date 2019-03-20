import { User } from './../../../core/user/user';
import { Directive } from "@angular/core";
import { Photo } from "../../photo/Photo";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { UserService } from "../../../core/user/user.service";
import { ElementRef } from "@angular/core";
import { Renderer } from "@angular/core";

@Directive({
  selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {
  @Input() photo : Photo;

  constructor(private element: ElementRef<any>,
              private renderer: Renderer,
              private userService: UserService) {}

  ngOnInit(): void {
     this.userService.getUser()
                      .subscribe( user => {
                        if (!user || user.id != this.photo.userId) {
                          this.renderer.setElementStyle(this.element.nativeElement,"display","none");
                        }
                      });
  }



}
