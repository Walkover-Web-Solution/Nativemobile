import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { Observable } from 'rxjs/Observable';
import { BaseResponse } from '../../../models/api-models/BaseResponse';
import { Router } from '@angular/router';
import { SettingsProfileService } from '../../../services/settings.profile.service';
import { SmsKeyClass } from '../../../models/api-models/SettingsIntegraion';
import { SettingsTaxesService } from '../../../services/settings.taxes.service';
import { CustomActions } from '../../../store/customActions';
import { SettingsTaxesConstants } from '~/actions/settings/taxes/settings.taxes.const';
import * as dialogs from "ui/dialogs";

@Injectable()
export class SettingsTaxesActions {

  @Effect()
  public CreateTax$: Observable<CustomActions> = this.action$
    .ofType(SettingsTaxesConstants.CREATE_TAX)
    .switchMap((action: CustomActions) => this.settingsTaxesService.CreateTax(action.payload))
    .map(response => this.CreateTaxResponse(response));

  @Effect()
  public CreateTaxResponse$: Observable<CustomActions> = this.action$
    .ofType(SettingsTaxesConstants.CREATE_TAX_RESPONSE)
    .map((response: CustomActions) => {
      let data: BaseResponse<any, any> = response.payload;
      console.log('response', JSON.stringify(data));
      if (data.status === 'error') {
        dialogs.alert(data.message);
      }
      return { type: 'EmptyAction' };
    });

  // @Effect()
  // public UpdateTax$: Observable<Action> = this.action$
  //   .ofType(SettingsTaxesConstants.UPDATE_TAX)
  //   .switchMap((action: CustomActions) => {
  //     return this.settingsTaxesService.UpdateTax(action.payload, action.payload.uniqueName)
  //       .map(response => this.UpdateTaxResponse(response));
  //   });

  // @Effect()
  // public UpdateTaxResponse$: Observable<Action> = this.action$
  //   .ofType(SettingsTaxesConstants.UPDATE_TAX_RESPONSE)
  //   .map((response: CustomActions) => {
  //     let data: BaseResponse<any, any> = response.payload;
  //     if (data.status === 'error') {
  //       console.log(data.message);
  //     }
  //     return { type: 'EmptyAction' };
  //   });

  // @Effect()
  // public DeleteTax$: Observable<Action> = this.action$
  //   .ofType(SettingsTaxesConstants.DELETE_TAX)
  //   .switchMap((action: CustomActions) => {
  //     return this.settingsTaxesService.DeleteTax(action.payload)
  //       .map(response => this.DeleteTaxResponse(response));
  //   });

  // @Effect()
  // public DeleteTaxResponse$: Observable<Action> = this.action$
  //   .ofType(SettingsTaxesConstants.DELETE_TAX_RESPONSE)
  //   .map((response: CustomActions) => {
  //     let data: BaseResponse<any, any> = response.payload;
  //     if (data.status === 'error') {
  //       console.log(data.message);
  //     }
  //     return { type: 'EmptyAction' };
  //   });

  constructor(private action$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private settingsTaxesService: SettingsTaxesService) {
  }

  public CreateTax(value): CustomActions {
    return {
      type: SettingsTaxesConstants.CREATE_TAX,
      payload: value
    };
  }

  public CreateTaxResponse(value): CustomActions {
    return {
      type: SettingsTaxesConstants.CREATE_TAX_RESPONSE,
      payload: value
    };
  }

  public UpdateTax(value): CustomActions {
    return {
      type: SettingsTaxesConstants.UPDATE_TAX,
      payload: value
    };
  }

  public UpdateTaxResponse(value): CustomActions {
    return {
      type: SettingsTaxesConstants.UPDATE_TAX_RESPONSE,
      payload: value
    };
  }

  public DeleteTax(value: string): CustomActions {
    return {
      type: SettingsTaxesConstants.DELETE_TAX,
      payload: value
    };
  }

  public DeleteTaxResponse(value): CustomActions {
    return {
      type: SettingsTaxesConstants.DELETE_TAX_RESPONSE,
      payload: value
    };
  }

  public ResetCreateTaxUi(): CustomActions {
    return {
      type: SettingsTaxesConstants.RESET_CREATE_TAX_UI_FLAGS
    }
  }

}
