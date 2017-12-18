// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NSModuleFactoryLoader, NativeScriptRouterModule } from 'nativescript-angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounce';

import { NgModule, NgModuleFactoryLoader } from "@angular/core";
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

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['session'], rehydrate: true })(reducer);
}

let metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
let config = require('./config/config');
@NgModule({
  declarations: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    AppRoutingModule,
    NativeScriptDevToolsMonitors,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    ServiceModule.forRoot(),
    ActionModule.forRoot()
  ],
  providers: [
    NeedsAuthentication,
    {
      provide: NgModuleFactoryLoader,
      useClass: NSModuleFactoryLoader
    },
    {
      provide: ServiceConfig,
      useValue: { apiUrl: config.ApiUrl, appUrl: config.AppUrl }
    }
  ],
  bootstrap: [AppComponent]
})
class AppModule { };

platformNativeScriptDynamic().bootstrapModule(AppModule);
