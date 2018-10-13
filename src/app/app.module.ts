import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-management/login/login.component';
//resources
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http'
//modules
import { UserManagementModule } from './user-management/user-management.module';
import { SharedComponentModule } from './shared-component/shared-component.module';
//services
import { HttpServiceService } from './http-service.service';
import { IssueModule } from './issue/issue.module';
//social login
import { SocialLoginModule,AuthServiceConfig,
  GoogleLoginProvider} from "angular-6-social-login";


export function getAuthServiceConfigs(){
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("440119432708-mkpkund91033ei0r05od5fmjvpkcfa6u.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IssueModule,
    SharedComponentModule,
    UserManagementModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
      {path:'login', component:LoginComponent},
      {path:'', component:LoginComponent},
      {path:'*', component:LoginComponent},
      {path:'**', component:LoginComponent}
    ])
  ],
  providers: [HttpServiceService,
    {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
    }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
