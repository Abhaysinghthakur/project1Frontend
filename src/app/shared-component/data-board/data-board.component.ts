import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'data-board',
  templateUrl: './data-board.component.html',
  styleUrls: ['./data-board.component.css']
})
export class DataBoardComponent implements OnInit {

  @Input() backlogs:any;
  @Input() inProgress:any;
  @Input() inTest:any
  @Input() done:any;
  
  constructor() { }

  ngOnInit() {}

}
