import { Component, Output, ViewChild, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output("searchQuery") parentFun: EventEmitter<any> = new EventEmitter();
  @ViewChild('autoInput') input: Event

  updateText() {
    this.parentFun.emit(this.input)
  }
}
