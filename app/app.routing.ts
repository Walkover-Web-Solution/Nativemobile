// angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NeedsAuthentication } from './decorators/needsAuthentication';

// app

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [NeedsAuthentication]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes, { enableTracing: false })]
})
export class AppRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: []
    };
  }
}
