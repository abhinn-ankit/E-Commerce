import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public ratesList: Array<string>=['1','2','3','4','5'];
  public selected: Array<string>=[];
  @Output() ratesRequest = new EventEmitter <string[]>();

  constructor() { }

  ngOnInit() {
  }

  isCheck(item) {
    return this.selected.findIndex(value => value == item) >= 0;
  }

  click(e, item) {
    const checkbox = e.target;
    const action = (checkbox.checked ? 'add' : 'remove');
    this.updateSelected(action, item);    
    this.ratesRequest.emit(this.selected);  
  }

  private updateSelected(action, item) {
    if (action == 'add' && this.selected.findIndex(value => value == item) == -1){
      console.log('add');
      this.selected.push(item);
    }
    if (action == 'remove' && this.selected.findIndex(value => value == item) != -1){
      console.log('remove');
      this.selected.splice(this.selected.findIndex(value => value == item), 1);
    }
    console.log(this.selected);
  }
}
