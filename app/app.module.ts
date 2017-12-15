// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounce';

import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import { AppComponent } from "./app.component";
import { ServiceModule } from "./services/service.module";
import { ServiceConfig } from "./services/service.config";
import { Configuration } from "./app.constants";
import { reducers } from "./store";
import { ActionModule } from "./actions/actions.module";
import { AppRoutingModule } from "./app.routing";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    ServiceModule.forRoot(),
    ActionModule.forRoot()
  ],
  providers: [
    {
      provide: ServiceConfig,
      useValue: { apiUrl: Configuration.ApiUrl, appUrl: Configuration.AppUrl }
    }
  ],
  bootstrap: [AppComponent]
})
class AppModule { };

platformNativeScriptDynamic().bootstrapModule(AppModule);
