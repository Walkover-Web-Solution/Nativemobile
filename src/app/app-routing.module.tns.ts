// angular
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PreloadAllModules, Routes } from "@angular/router";
// app
import { AppRoutes } from './app.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(<any>AppRoutes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

