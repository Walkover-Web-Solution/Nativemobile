import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { LoginActions } from './login/login.action';
import { CompanyActions } from './company/company.action';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      LoginActions,
      CompanyActions,
      DashboardActions
    ])
  ],
  exports: [EffectsModule]
})
export class ActionModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionModule,
      providers: []
    };
  }
}
