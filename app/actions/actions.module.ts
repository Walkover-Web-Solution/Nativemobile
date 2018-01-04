import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { LoginActions } from './login/login.action';
import { CompanyActions } from './company/company.action';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import { GeneralActions } from '~/actions/general/general.actions';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      LoginActions,
      CompanyActions,
      DashboardActions,
      GeneralActions
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
