import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//FORM
import { FormsModule } from '@angular/forms';
// ROUTER IMPORTING
import { RouterModule} from '@angular/router';
//TOASTR IMPORTING
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { IssueViewComponent } from './issue-view/issue-view.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedComponentModule,
    AngularFontAwesomeModule,
    NgxEditorModule,
    ToastrModule,
    RouterModule.forChild([
      {path:'dashboard',component:DashboardComponent},
      {path:'create',component:IssueCreateComponent},
      {path:'edit/:issueId',component:IssueEditComponent},
      {path:'view/:issueId',component:IssueViewComponent}
    ]),
  ],
  declarations: [DashboardComponent, IssueViewComponent, IssueEditComponent, IssueCreateComponent]
})
export class IssueModule { }
