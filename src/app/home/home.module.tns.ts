import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// nativescript
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
// app
import {HomeComponent} from './home.component';
import {SharedModule} from './../shared/shared.module';
import {HomeRoutes} from './home.routes';
import {NativeScriptRouterModule} from 'nativescript-angular/router';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(HomeRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [NativeScriptRouterModule],
    declarations: [HomeComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
