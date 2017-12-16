import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// app
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [
    NativeScriptModule,
    CommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent],

  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule { }
