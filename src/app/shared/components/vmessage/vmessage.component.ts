import { Component } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { Input } from '@angular/core';

@Component({
  selector: 'ap-vmessage',
  templateUrl: './vmessage.component.html'
})
export class VMessageComponent {
  @Input() text = '';
}
