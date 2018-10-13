import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;

  constructor(private router: Router, private http: HttpServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  public signupFunction = () => {
    if (!this.firstName) {
      this.toastr.warning('Enter first Name')
    } else if (!this.lastName) {
      this.toastr.warning('Enter Last Name')
    } else if (!this.mobile) {
      this.toastr.warning('Enter Mobile No')
    } else if (!this.email) {
      this.toastr.warning('Enter Email')
    } else if (!this.password) {
      this.toastr.warning('Enter Password')
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName || "",
        mobile: this.mobile || 0,
        email: this.email,
        password: this.password
      }
    
      this.http.signupFunction(data).subscribe(
        (apiResponse)=>{
          if(apiResponse["status"]==200){
            console.log(apiResponse)
            this.toastr.success('Signup sucessful');
            setTimeout(()=>{
              this.router.navigate(['/dashboard']);
            },1000)
          }else{
            this.toastr.error(apiResponse['message']);
          }
        },
        (error)=>{
          console.log(error);
          this.toastr.error('error occoured while signing in');
        }
      )
    }
  }



  public goToLogIn = () => {
    this.router.navigate(['/'])
  }
}
