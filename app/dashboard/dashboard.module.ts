import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-pro-ui/chart/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

// app
import { NeedsAuthentication } from '../decorators/needsAuthentication';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from '~/dashboard/dashboard.routing.module';
import { DashboardComponent } from '~/dashboard/dashboard.component';
import { RevenueChartComponent } from '~/dashboard/components/revenue/revenue.component';
import { ExpensesChartComponent } from '~/dashboard/components/expenses/expenses.component';
import { DashboardFilterComponent } from '~/dashboard/components/filter/dashboard-filter.component';
import { DashboardChartComponent } from '~/dashboard/components/chart/dashboard-chart.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    NativeScriptUIChartModule,
    TNSCheckBoxModule
  ],
  declarations: [DashboardComponent, RevenueChartComponent, ExpensesChartComponent, DashboardFilterComponent, DashboardChartComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class DashboardModule { }
