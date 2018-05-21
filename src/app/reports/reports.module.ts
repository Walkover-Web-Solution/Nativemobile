import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';



import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from '../reports/reports.component';
import { PlChartComponent } from '../reports/components/pl-chart/pl-chart.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '../common';
import { ReportsRoutes } from './reports.routes';
import { ReportsFilterComponent } from './components/reports-filter/reports-filter.component';
import { PlSheetComponent } from './components/pl-sheet/pl-sheet.component';
import { BsSheetComponent } from './components/bs-sheet/bs-sheet.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';



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
        FormsModule,
        RouterModule.forChild(ReportsRoutes),
        ReactiveFormsModule,
        ChartModule,
        SharedModule,
    ],
    declarations: [ReportsComponent, PlChartComponent, ReportsFilterComponent, PlSheetComponent, BsSheetComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        ReportsFilterComponent
    ]
})
export class ReportsModule {
}
