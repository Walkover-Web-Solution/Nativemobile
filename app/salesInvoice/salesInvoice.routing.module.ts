
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SalesInvoiceComponent } from "~/salesInvoice/salesInvoice.component";
import { SaleListComponent } from "~/salesInvoice/component/saleList/saleList.component";
import { SaleAddComponent } from "~/salesInvoice/component/saleAdd/saleAdd.component";


export const routes: Routes = [
  {
    path: '',
    component: SalesInvoiceComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', pathMatch: 'full', component: SaleListComponent },
      { path: 'add', pathMatch: 'full', component: SaleAddComponent },
    ]
  },
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SalesInvoiceRoutingModule { }