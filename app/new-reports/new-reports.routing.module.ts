import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NewReportsComponent } from "~/new-reports/new-reports.component";



export const routes: Routes = [
  {
    path: '',
    component: NewReportsComponent
  },
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class NewReportsRoutingModule { }
