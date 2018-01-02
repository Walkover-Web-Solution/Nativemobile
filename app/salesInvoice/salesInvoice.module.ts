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
import { SalesInvoiceRoutingModule } from '~/salesInvoice/salesInvoice.routing.module';
import { SalesInvoiceComponent } from '~/salesInvoice/salesInvoice.component';
import { SaleListComponent } from '~/salesInvoice/component/saleList/saleList.component';
import { SaleAddComponent } from '~/salesInvoice/component/saleAdd/saleAdd.component';
import { StockAddComponent } from '~/salesInvoice/component/stockAdd/stockAdd.component';



@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SalesInvoiceRoutingModule,
    NativeScriptUIChartModule
  ],
  declarations: [SalesInvoiceComponent, SaleListComponent, SaleAddComponent, StockAddComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SalesInvoiceModule { }
