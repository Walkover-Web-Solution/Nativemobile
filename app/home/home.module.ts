import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";

// app
import { HomeComponent } from './home.component';
import { NeedsAuthentication } from '../decorators/needsAuthentication';
import { HomeRoutingModule } from './home.routing.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule { }
