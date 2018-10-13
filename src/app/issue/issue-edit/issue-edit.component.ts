import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpServiceService } from './../../http-service.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  public possibleStatus = ['Backlog', 'In-progress', 'In-test', 'Done'];
  public users = [];

  public issueTitle: String;
  public issueDescription: String;
  public issueStatus: any;
  public assginedTo: any;
  public assignedToName: String;
  public issue: any;
  public issueId:String;

  constructor(private http: HttpServiceService, private toastr: ToastrService,
    private router:Router,private _route:ActivatedRoute) { }

  ngOnInit() {
    this.issueId =this._route.snapshot.paramMap.get('issueId');

    this.http.getIssue(this.issueId).subscribe(
      (response)=>{
        if(response['status']==200){
          this.issue = response['data']; 
          this.issueTitle = response['data']['title'];
          this.issueDescription = response['data']['description'];
          this.assginedTo = response['data']['assignedToId'];
          this.assignedToName = response['data']['assignedToName'];
          this.issueStatus = response['data']['status'];
        }else{
          this.toastr.error("Issue not found");
        }
      },
      (error)=>{
        console.log(error);
      }
    )

    this.http.allUsers().subscribe(
      (apiResponse) => {
        if (apiResponse['status'] == 200) {
          this.users = apiResponse['data']
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
      issueId:this.issueId,
      status: this.issueStatus,
      title: this.issueTitle,
      description: this.issueDescription,
      assignedToName: this.assignedToName,
      assignedToId: this.assginedTo
    }

    this.http.editIssue(this.issue).subscribe(
      (response)=>{
        if(response['status']==200){
          this.toastr.success(response['message']);
          setTimeout(()=>{
            this.router.navigate(['/dashboard'])
          },2000)
        }
      }
    )

  }
}
