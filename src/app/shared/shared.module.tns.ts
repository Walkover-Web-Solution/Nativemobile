import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";

import { MyDrawerItemComponent } from "./my-drawer-item/my-drawer-item.component";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";
import { MyButonComponent } from "./my-button/my-botton.component";
import { MyLogoutComponent } from "./logout-button/logout-botton.component";
import { PieChartComponent } from "../shared/pie-chart/pie-chart.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { MyChipsComponent } from "../shared/my-chips/my-chips.component";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MyHeaderComponent } from "./my-header/my-header.component";
import {VsForDirective} from './ng2-vs-for/ng2-vs-for';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIGaugeModule,
        DropDownModule,
        TNSCheckBoxModule,
        TNSFontIconModule.forRoot({
            'fa': './assets/font-awesome.min.css'
        })
    ],
    declarations: [
        MyDrawerComponent,
        MyDrawerItemComponent,
        MyButonComponent,
        MyLogoutComponent,
        PieChartComponent,
        MyChipsComponent,
        MyHeaderComponent,
        // VsForDirective
    ],
    exports: [
        NativeScriptRouterModule,
        MyDrawerComponent,
        MyButonComponent,
        MyLogoutComponent,
        MyChipsComponent,
        PieChartComponent,
        NativeScriptUISideDrawerModule,
        NativeScriptUIGaugeModule,
        TNSCheckBoxModule,
        DropDownModule,
        TNSFontIconModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
