import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from '../reports/reports.component';
import { PlChartComponent } from '../reports/components/pl-chart/pl-chart.component';
import { ReportsRoutes } from './reports.routes';
import { RouterModule } from '../common';
import { PlSheetComponent } from './components/pl-sheet/pl-sheet.component';
import { BsSheetComponent } from './components/bs-sheet/bs-sheet.component';
import { ReportsFilterComponent } from './components/reports-filter/reports-filter.component';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        FormsModule,
        RouterModule.forChild(ReportsRoutes),
        ReactiveFormsModule,
        SharedModule,
        NativeScriptUIChartModule
    ],
    declarations: [ReportsComponent, PlChartComponent, PlSheetComponent, BsSheetComponent, ReportsFilterComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReportsModule {
}
