import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';

import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public email: String;
    public password: String;
    public password2: String;
    public socialData: any;

    constructor(private router: Router, private http: HttpServiceService, private toastr: ToastrService, private socialAuthService: AuthService) { }

    ngOnInit() {
    }

    public signinFunction: any = () => {
        if (!this.email) {
            this.toastr.warning("Enter the email");
        } else if (!this.password) {
            this.toastr.warning("Enter the password");
        } else {
            let data = {
                email: this.email,
                password: this.password
            }

            this.http.signinFunction(data)
                .subscribe((apiResponse) => {
                    if (apiResponse.status === 200) {
                        console.log(apiResponse)
                        //setting the cokies here 
                        Cookie.set('authtoken', apiResponse.data.authToken);
                        Cookie.set('userId', apiResponse.data.userDetails.userId);
                        Cookie.set('userName', `${apiResponse.data.userDetails.firstName} ${(!apiResponse.data.userDetails.lastName || apiResponse.data.userDetails.lastName == 'undefined')?"":apiResponse.data.userDetails.lastName}`);
                        this.toastr.success(apiResponse.message, 'Login Sucessful')
                        this.router.navigate(['/dashboard'])
                    } else {
                        this.toastr.error(apiResponse.message)
                    }
                }, (err) => {
                    if (err.status === 500) {
                        this.toastr.error('Invalid Password');
                    }
                })

        }
    }


    public goToSignUp = () => {
        this.router.navigate(['/signup'])
    }

    public socialSignIn(socialPlatform: string) {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (userData) => {
                console.log(socialPlatform + " sign in data : ", userData);
                this.socialData = userData;
            }
        );
    }

    public signUp = () => {
        if (this.password2&&this.socialData) {
            let data = {
                firstName: this.socialData.name,
                mobile: 0,
                email: this.socialData.email,
                password: this.password2
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
        }else{
          this.toastr.error("password or social data missing","Social SignUp error")
        }
    }

}
