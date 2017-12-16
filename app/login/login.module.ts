import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { COMPONENTS, LoginComponent, LoginWithOtpComponent, ForgotComponent } from './components';
import { CommonModule } from '@angular/common';

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
    path: 'forgot-password',
    component: ForgotComponent
  }
];

@NgModule({
  imports: [CommonModule, NativeScriptRouterModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [...COMPONENTS],

  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule { }
