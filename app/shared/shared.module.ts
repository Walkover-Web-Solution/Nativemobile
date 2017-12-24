import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { MyDrawerItemComponent } from "./my-drawer-item/my-drawer-item.component";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";
import { MyButonComponent } from "./my-button/my-botton.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule
  ],
  declarations: [
    MyDrawerComponent,
    MyDrawerItemComponent,
    MyButonComponent
  ],
  exports: [
    MyDrawerComponent,
    MyButonComponent,
    NativeScriptUISideDrawerModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
