import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// nativescript
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { COMPONENTS, LoginComponent, LoginWithOtpComponent, LoginWithEmailComponent, ForgotComponent, SignUpComponent, LoginTwoWayComponent } from './components';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NativeScriptRouterModule],
  declarations: [...COMPONENTS],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class LoginModule { }
