import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-pro-ui/chart/angular";

// app
import { NeedsAuthentication } from '../decorators/needsAuthentication';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from '~/dashboard/dashboard.routing.module';
import { DashboardComponent } from '~/dashboard/dashboard.component';
import { RevenueChartComponent } from '~/dashboard/components/revenue/revenue.component';
import { ExpensesChartComponent } from '~/dashboard/components/expenses/expenses.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    NativeScriptUIChartModule
  ],
  declarations: [DashboardComponent, RevenueChartComponent, ExpensesChartComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class DashboardModule { }
