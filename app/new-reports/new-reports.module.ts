import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-pro-ui/chart/angular";

import { SharedModule } from '~/shared/shared.module';
import { NewReportsComponent } from '~/new-reports/new-reports.component';
import { NewReportsRoutingModule } from '~/new-reports/new-reports.routing.module';
import { NewPlChartComponent } from '~/new-reports/components/new-pl-chart/new-pl-chart.component';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FormsModule,
    NewReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NativeScriptUIChartModule
  ],
  declarations: [NewReportsComponent, NewPlChartComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NewReportsModule {
}