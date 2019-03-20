import { OnInit, OnDestroy, Component, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  debounce: Subject<string> = new Subject<string>();

  @Output() onTyping = new EventEmitter<string>();
  @Input() value : string = '';

  ngOnInit() : void{
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

}
