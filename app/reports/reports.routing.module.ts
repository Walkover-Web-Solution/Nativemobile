import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ReportsComponent } from "~/reports/reports.component";



export const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ReportsRoutingModule { }
