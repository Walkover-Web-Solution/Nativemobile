// angular
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [NativeScriptRouterModule,NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
