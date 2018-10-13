import { Injectable } from '@angular/core';
//OBSERVABLE IMPORTING
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
//HTTP Import
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';
//Cookie import.
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private url = 'http://localhost:3000/api/project';

  constructor(private http:HttpClient,private toastr:ToastrService){}

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/users/login`, params);
  }// signinFunction end 

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/users/signup`, params);

  }// signupFunction end

  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))
    return this.http.post(`${this.url}/users/logout`, params);
  } // end logout function

  public allUsers = () =>{
    return this.http.get(`${this.url}/users/allUsers`);
  }

  public createIssue = (data)=>{

    const params = new HttpParams()
      .set('by',data.by)
      .set('title',data.title)
      .set('description',data.description)
      .set('byId',data.byId)
      .set('status',data.status)
      .set('assignedToId',data.assignedToId)
      .set('assignedToName',data.assignedToName)

    return this.http.post(`${this.url}/issue/create`,params)
  }

  public getIssue = (issueId)=>{
    return this.http.get(`${this.url}/issue/view/${issueId}`);
  }

  public getComments = (issueId)=>{
    return this.http.get(`${this.url}/issue/readComment/${issueId}`);
  }

  public makeComment = (commentData)=>{
    const params = new HttpParams()
      .set('issueId',commentData.issueId)
      .set('description',commentData.description)
      .set('by',Cookie.get('userName'))
      .set('byId',Cookie.get('userId'))

    return this.http.post(`${this.url}/issue/addComment`,params);
  }

  public editIssue(data): Observable<any>{
    const params = new HttpParams()
    .set('by',data.by)
    .set('title',data.title)
    .set('description',data.description)
    .set('userId',Cookie.get('userId'))
    .set('status',data.status)
    .set('assignedToId',data.assignedToId)
    .set('assignedToName',data.assignedToName)

    return this.http.post(`${this.url}/issue/edit/${data.issueId}`,params)
  }

  public assignedIssue = ()=>{
    return this.http.get(`${this.url}/issue/assigned/${Cookie.get('userId')}`);
  }

  public searchIssue = (arg,skip=0)=>{
    return this.http.get(`${this.url}/issue/search?arg=${arg}&skip=${skip}`);
  }

  public getNotification = ()=>{
    return this.http.get(`${this.url}/notify/get/${Cookie.get("userId")}`);
  }

  public addToWatcherList =(issueId)=>{
    const params = new HttpParams()
      .set('issueId',issueId)
      .set('userId',Cookie.get('userId'))

    return this.http.post(`${this.url}/notify/addWatcher/${Cookie.get('userId')}`,params);
  }

  public getWatcherList = ()=>{
    return this.http.get(`${this.url}/getwatcherlist/${Cookie.get('userId')}`);
  }

  public getWatcherIssues = (data)=>{
    const params = new HttpParams()
      .set('issueIdArray',data.data[0].issueIdArray);

    return this.http.post(`${this.url}/issue/filter`,params);
  }

  public getnotifications = ()=>{
    return this.http.get(`${this.url}/notify/get/${Cookie.get('userId')}`);
  }
}
