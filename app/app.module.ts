// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import * as trace from "tns-core-modules/trace";

// import "nativescript-materialdropdownlist";


import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';

import { AppComponent } from "./app.component";
import { ServiceModule } from "./services/service.module";
import { ServiceConfig } from "./services/service.config";
import { Configuration } from "./app.constants";
import { reducers } from "./store";
import { ActionModule } from "./actions/actions.module";
import { AppRoutingModule } from "./app.routing";
import 'nativescript-ngx-fonticon';
import { localStorageSync } from "./store/middleware/rehydrateAppState";
import { NeedsAuthentication } from "./decorators/needsAuthentication";
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { AppState } from './store/roots';
import { LocationStrategy } from "@angular/common";
import { SalesInvoiceModule } from "~/salesInvoice/salesInvoice.module";
import * as elementRegistryModule from 'nativescript-angular/element-registry';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['session'], rehydrate: true })(reducer);
}

let metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
let config = require('./config/config')

elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    ServiceModule.forRoot(),
    ActionModule.forRoot(),
    LoginModule,
    HomeModule,
    SalesInvoiceModule
  ],
  declarations: [AppComponent],
  providers: [
    NeedsAuthentication,
    {
      provide: ServiceConfig,
      useValue: { apiUrl: config.ApiUrl, appUrl: config.AppUrl }
    }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { };

