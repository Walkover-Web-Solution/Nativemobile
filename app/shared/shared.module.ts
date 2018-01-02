import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptUIGaugesModule } from "nativescript-pro-ui/gauges/angular";

import { MyDrawerItemComponent } from "./my-drawer-item/my-drawer-item.component";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";
import { MyButonComponent } from "./my-button/my-botton.component";
import { MyLogoutComponent } from "./logout-button/logout-botton.component";
import { PieChartComponent } from "~/shared/pie-chart/pie-chart.component";
import { DropDownModule } from "nativescript-drop-down/angular";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIGaugesModule,
    DropDownModule
  ],
  declarations: [
    MyDrawerComponent,
    MyDrawerItemComponent,
    MyButonComponent,
    MyLogoutComponent,
    PieChartComponent,
  ],
  exports: [
    MyDrawerComponent,
    MyButonComponent,
    MyLogoutComponent,
    PieChartComponent,
    NativeScriptUISideDrawerModule,
    NativeScriptUIGaugesModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
