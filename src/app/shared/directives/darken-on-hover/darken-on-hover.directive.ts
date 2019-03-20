import { Directive, HostListener, Renderer } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Input } from "@angular/core";

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective{
  private el: ElementRef;
  private render: Renderer;

  @Input() brigthness = "70%";

  constructor(el: ElementRef, render: Renderer) {
    this.el = el;
    this.render = render;
  }

  @HostListener('mouseover')
  darkenOn() {
    this.render.setElementStyle(this.el.nativeElement, "filter", `brightness(${this.brigthness})`);
  }

  @HostListener('mouseleave')
  darkenOff() {
    this.render.setElementStyle(this.el.nativeElement, "filter", "brightness(100%)");
  }
}
