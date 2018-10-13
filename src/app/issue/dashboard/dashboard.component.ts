import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../http-service.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public today = Date.now();
  public someIssueData: any;
  public userName: String;
  public firstChar;
  public backlogs = [];
  public inProgress = [];
  public inTest = [];
  public done = [];
  public searchData: String;
  public toggler: boolean = true;
  public watcherList: any;
  public notificationData:any;

  constructor(private http: HttpServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.userName = Cookie.get('userName') || "Test User";
    this.firstChar = this.userName[0];

    this.http.assignedIssue().subscribe(
      (response) => {
        this.someIssueData = response['data'];
        for (let x of this.someIssueData) {
          switch (x.status) {
            case 'Backlog':
              this.backlogs.push(x);
              break;
            case 'In-progress':
              this.inProgress.push(x)
              break;
            case 'In-test':
              this.inTest.push(x)
              break;
            case 'Done':
              this.done.push(x)
              break;
          }
        }
      },
      (error) => {
        console.log(error)
      }
    )

    this.http.getWatcherList().subscribe(
      (response) => {
        this.watcherList = response;
      }, (error) => {
        console.log(error);
        this.toastr.error("error while retriving watcherList");
      }
    )
  }

  public logout = () => {
    this.http.logout().subscribe(
      (apiResponse) => {
        if (apiResponse['status'] == 200) {
          console.log('logout');
          console.log(apiResponse);
          this.router.navigate(['/login']);
          Cookie.deleteAll();
        }
      },
      (error) => {
        console.log(error.message);
      }
    )
  }


  public searchIssue: any = (event: any) => {

    if (event.keyCode == 13) {
      this.http.searchIssue(this.searchData).subscribe(
        (response) => {
          if (response['status'] == 200) {
            this.searchData = "";
            this.someIssueData = response['data'];
            this.toggler = false;
          } else if (response['status'] == 404) {
            this.toastr.info('No result Found')
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error('Some error ocurred');
        }
      )
    }

  }

  public home = () => {
    this.toggler = true;
  }

  public functionBacklog = () => {
    this.toggler = false;
    this.someIssueData = this.backlogs;
  }

  public functionInprogess = () => {
    this.toggler = false;
    this.someIssueData = this.inProgress;
  }

  public functionIntest = () => {
    this.toggler = false;
    this.someIssueData = this.inTest;
  }

  public functionDone = () => {
    this.toggler = false;
    this.someIssueData = this.done;
  }

  public getNotification = () => {
    this.http.getNotification().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public issuesWatching = () => {
    if (this.watcherList['status'] == 200) {
      this.http.getWatcherIssues(this.watcherList).subscribe(
        (response) => {
          if (response['status'] == 200) {
            this.toggler = false;
            this.someIssueData = response['data'];
          } else if (response['status'] == 404) {
            this.toastr.info('No issues found');
          }
        }
      )
    } else {
      this.toastr.info('No issues watching');
    }
  }

  public getNotifications = ()=>{
    console.log('here');
    this.watcherList.data[0].notificationCount =0;

    if(!this.notificationData){
      this.http.getNotification().subscribe(
        (response)=>{
          console.log(response);
          if(response['status']==200){
            this.notificationData = response["data"];
          }
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

}
