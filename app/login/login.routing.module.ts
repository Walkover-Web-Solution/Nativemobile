import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent, LoginWithOtpComponent, LoginWithEmailComponent, LoginTwoWayComponent, ForgotComponent, SignUpComponent } from "./components";
import { LinkedInLoginComponent } from "~/login/components/linkedin-login/linkedin-login.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login-with-otp',
    component: LoginWithOtpComponent
  },
  {
    path: 'login-with-email',
    component: LoginWithEmailComponent
  },
  {
    path: 'login-two-way',
    component: LoginTwoWayComponent
  },
  {
    path: 'forgot-password',
    component: ForgotComponent
  }, {
    path: 'linkedin-login',
    component: LinkedInLoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule { }
