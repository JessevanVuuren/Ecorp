import { Component, Output, ViewChild, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @ViewChild('autoInput') input: Event


  @Output("searchQuery") parentFun: EventEmitter<any> = new EventEmitter();

  updateText() {
    this.parentFun.emit(this.input)
  }

}
