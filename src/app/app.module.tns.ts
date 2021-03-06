import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// nativescript
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
// vendor dependencies
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// app
import {Config} from './common/index';
import {AppComponent} from './app.component';
import {SHARED_MODULES} from './app.common';
import {AppRoutes} from './app.routes';
import {ServiceModule} from './services/service.module';
import {AppState, reducers} from './store';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {ActionModule} from './actions/actions.module';
import {ServiceConfig} from './services/service.config';
import {storeLogger} from './store/middleware/storeLogger';
import {localStorageSync} from './store/middleware/rehydrateAppState';
import {NeedsAuthentication} from './decorators/needsAuthentication';
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import {Fab} from 'nativescript-floatingactionbutton';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(<any>http, '/assets/i18n/', '.json');
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['session'], rehydrate: true })(reducer);
}

export function logger(reducer: ActionReducer<AppState>): any {
    // default, no options
    return storeLogger()(reducer);
}

let metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
elementRegistryModule.registerElement("Fab", () => Fab);
elementRegistryModule.registerElement("Carousel", () => require("nativescript-carousel").Carousel);
elementRegistryModule.registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);
elementRegistryModule.registerElement("FilterSelect", () => require("nativescript-filter-select").FilterSelect);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(AppRoutes, { enableTracing: false }),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        ServiceModule.forRoot(),
        ActionModule.forRoot(),
        ...SHARED_MODULES
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        NeedsAuthentication,
        {
            provide: ServiceConfig,
            useValue: { apiUrl: 'https://api.giddh.com/', appUrl: 'http://apitest.giddh.com/' }
        },
    ],
    exports: [NativeScriptRouterModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
