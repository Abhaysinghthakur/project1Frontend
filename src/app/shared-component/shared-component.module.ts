import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBoardComponent } from './data-board/data-board.component';
import {RouterModule} from '@angular/router';
import { SingleDataBoardComponent } from './single-data-board/single-data-board.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  declarations: [DataBoardComponent, SingleDataBoardComponent],
  exports:[DataBoardComponent,SingleDataBoardComponent]
})
export class SharedComponentModule { }
