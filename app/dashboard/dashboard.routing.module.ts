import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DashboardComponent } from "~/dashboard/dashboard.component";
import { DashboardChartComponent } from "~/dashboard/components/chart/dashboard-chart.component";
import { DashboardFilterComponent } from "~/dashboard/components/filter/dashboard-filter.component";


export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'charts'
      },
      {
        path: 'charts',
        component: DashboardChartComponent
      },
      {
        path: 'filter/:chartType',
        component: DashboardFilterComponent
      }
    ]
  },
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class DashboardRoutingModule { }
