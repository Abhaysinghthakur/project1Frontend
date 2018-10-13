import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {

  public possibleStatus = ['Backlog', 'In-progress', 'In-test', 'Done'];
  public users = [];

  public issueTitle: String;
  public issueDescription: String;
  public issueStatus: any;
  public assginedTo: any;
  public assignedToName: String;
  public issue: any;

  constructor(private http: HttpServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.issueStatus = this.possibleStatus[0];

    this.http.allUsers().subscribe(
      (apiResponse) => {
        if (apiResponse['status'] == 200) {
          this.users = apiResponse['data'];
          console.log(this.users)
        } else {
          this.toastr.warning('No user Found')
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public createIssue = () => {
    for (let user of this.users) {
      if (user.userId === this.assginedTo) {
        this.assignedToName = `${user.firstName} ${user.lastName}`
      }
    }

    this.issue = {
      status: this.issueStatus,
      title: this.issueTitle,
      description: this.issueDescription,
      assignedToName: this.assignedToName,
      assignedToId: this.assginedTo,
      by: Cookie.get('userName'),
      byId: Cookie.get('userId')
    }

    this.http.createIssue(this.issue).subscribe(
      (response) => {
        if (response['status'] == 200) {
          this.toastr.success('New Issue Created');
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 2000)
        }
      }
    )
  }
}
