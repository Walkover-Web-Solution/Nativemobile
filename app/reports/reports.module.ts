import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from './../shared/shared.module';
import { ReportsComponent } from '~/reports/reports.component';
import { ReportsRoutingModule } from '~/reports/reports.routing.module';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FormsModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ReportsComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ReportsModule { }
