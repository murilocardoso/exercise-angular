import { UserService } from './../../../core/user/user.service';
import { Directive, HostListener, Renderer } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from '@angular/core';

@Directive({
  selector: '[OnlyLoggedUser]'
})
export class OnlyLoggedUserDirective implements OnInit {

  currentDisplay: string;

  constructor(private element: ElementRef<any>,
              private render: Renderer,
              private userService: UserService) {}

    ngOnInit(): void {
      this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
      this.userService.getUser().subscribe(user => {

        if (user) {
          this.render.setElementStyle(this.element.nativeElement, 'display',  this.currentDisplay);
        } else {
          this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
          this.render.setElementStyle(this.element.nativeElement,"display","none");
        }
      })
    }
}
