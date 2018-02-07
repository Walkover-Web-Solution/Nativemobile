import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from '~/shared/shared.module';
import { ReportsComponent } from '~/reports/reports.component';
import { ReportsRoutingModule } from '~/reports/reports.routing.module';
import { PlChartComponent } from "~/reports/components/pl-chart/pl-chart.component";
import { NativeScriptUIChartModule } from "nativescript-pro-ui/chart/angular";
import { PlDataComponent } from "~/reports/components/pl-data/pl-data.component";
import { BsDataComponent } from "~/reports/components/bs-data/bs-data.component";


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FormsModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NativeScriptUIChartModule
  ],
  declarations: [ReportsComponent, PlChartComponent, PlDataComponent, BsDataComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ReportsModule {
}
