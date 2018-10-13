import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {HttpServiceService} from './../../http-service.service';
import {ToastrService} from 'ngx-toastr';
import { identifierModuleUrl } from '@angular/compiler';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css']
})
export class IssueViewComponent implements OnInit {

  public issueId:String;
  public data:any;
  public comment:String;
  public commentData:any;
  public makeCommentData:any;
  constructor(private router:Router,private _route:ActivatedRoute,private http:HttpServiceService,private toastr:ToastrService) { }

  ngOnInit() {
    this.issueId = this._route.snapshot.paramMap.get('issueId');

    this.http.getIssue(this.issueId).subscribe(
      (response)=>{
        if(response['status']==200){
          this.data = response['data'];
          console.log(this.data);
        }else{
          this.toastr.error('No issue by this Id')
          console.log(response);
        }
      },
      (error)=>{
        console.log(error);
      }
    )

    this.getComment();
  }

  public getComment =() =>{
    this.http.getComments(this.issueId).subscribe(
      (response)=>{
        if(response['status']==200){
          this.commentData = response['data'];
        }
      },
      (error)=>{
        this.toastr.error("error while retrieving comments");
      }
    )
  }

  public makeComment = () =>{
    this.makeCommentData ={
      issueId:this.issueId,
      description:this.comment
    }

    this.http.makeComment(this.makeCommentData).subscribe(
      (response)=>{
        if(response['status']==200){
          this.toastr.success("Comment created");
          this.getComment();
          this.comment = "";
        }
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  public addToWatcherList = ()=>{
    this.http.addToWatcherList(this.issueId).subscribe(
      (response)=>{
        if(response["status"]==200){
          this.toastr.success("Issue Added To Watcher List");
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
