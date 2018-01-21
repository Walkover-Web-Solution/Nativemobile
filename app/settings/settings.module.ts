import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// nativescript
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from './../shared/shared.module';
import { SettingsRoutingModule } from '~/settings/settings.routing.module';
import { SettingsComponent } from '~/settings/settings.component';
import { CompanyProfileComponent } from '~/settings/components/company-profile/company-profile.component';
import { CurrenciesComponent } from '~/settings/components/currencies/currencies.component';
import { CreateCurrenciesComponent } from '~/settings/components/create-currencies/create-currencies.component';
import { TaxesComponent } from '~/settings/components/taxes/taxes.component';
import { CreateTaxesComponent } from '~/settings/components/create-taxes/create-taxes.component';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FormsModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SettingsComponent, CompanyProfileComponent, CurrenciesComponent,
    CreateCurrenciesComponent, TaxesComponent, CreateTaxesComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SettingsModule { }