import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// app
import { COMPONENTS, LoginComponent, LoginWithOtpComponent, LoginWithEmailComponent, ForgotComponent, SignUpComponent, LoginTwoWayComponent } from './components';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [
    NativeScriptModule,
    CommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...COMPONENTS],

  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule { }
