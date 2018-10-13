import { Component, OnInit, Input ,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'single-data-board',
  templateUrl: './single-data-board.component.html',
  styleUrls: ['./single-data-board.component.css']
})
export class SingleDataBoardComponent implements OnInit {

  constructor() { }

  @Input() data:any;

  ngOnInit() {
    console.log(this.data);
  }

  ngOnChanges(changes:SimpleChanges){
    let someData = changes.data;
    this.data = someData.currentValue;
  }
}
