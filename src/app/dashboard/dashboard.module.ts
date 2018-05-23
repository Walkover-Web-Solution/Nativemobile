import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';


// app
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { RevenueChartComponent } from './components/revenue/revenue.component';
import { ExpensesChartComponent } from './components/expenses/expenses.component';
import { DashboardFilterComponent } from './components/filter/dashboard-filter.component';
import { DashboardChartComponent } from './components/chart/dashboard-chart.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routes';
import { RouterModule } from '../common';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
// nativescript

declare let require: any;
export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}
@NgModule({
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(<any>DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        SharedModule
    ],
    declarations: [DashboardComponent, RevenueChartComponent, ExpensesChartComponent, DashboardFilterComponent, DashboardChartComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [DashboardFilterComponent]
})
export class DashboardModule { }
