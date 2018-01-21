import { CustomActions } from '../customActions';
import { TaxResponse } from "~/models/api-models/Company";
import { CompanyConstants } from '~/actions/company/company.const';
import { BaseResponse } from '~/models/api-models/BaseResponse';
import { SettingsTaxesConstants } from '~/actions/settings/taxes/settings.taxes.const';
import * as _ from 'lodash';

export interface CurrentCompanyState {
  taxes: TaxResponse[];
  isTaxesLoading: boolean;
  isCreateTaxInProcess: boolean;
  isCreateTaxSuccess: boolean;
}

/**
 * Setting the InitialState for this Reducer's Store
 */
const initialState: CurrentCompanyState = {
  taxes: null,
  isTaxesLoading: false,
  isCreateTaxInProcess: false,
  isCreateTaxSuccess: false
};

export function CompanyReducer(state: CurrentCompanyState = initialState, action: CustomActions): CurrentCompanyState {

  switch (action.type) {

    case CompanyConstants.GET_COMPANY_TAX:
      return Object.assign({}, state, {
        isTaxesLoading: true
      });
    case CompanyConstants.GET_COMPANY_TAX_RESPONSE:
      let taxes: BaseResponse<TaxResponse[], string> = action.payload;
      if (taxes.status === 'success') {
        return Object.assign({}, state, {
          taxes: taxes.body,
          isTaxesLoading: false
        });
      }
      return Object.assign({}, state, {
        isTaxesLoading: false
      });

    case SettingsTaxesConstants.CREATE_TAX:
      return Object.assign({}, state, {
        isCreateTaxInProcess: true
      });

    case SettingsTaxesConstants.CREATE_TAX_RESPONSE: {
      let res: BaseResponse<TaxResponse, string> = action.payload;
      if (res.status === 'success') {
        let newState = _.cloneDeep(state);
        newState.taxes.push(res.body);
        newState.isCreateTaxInProcess = false;
        newState.isCreateTaxSuccess = true;
        return Object.assign({}, state, newState);
      }
      return Object.assign({}, state, {
        isCreateTaxInProcess: false,
        isCreateTaxSuccess: false
      });
    }
    case SettingsTaxesConstants.RESET_CREATE_TAX_UI_FLAGS: {
      return Object.assign({}, state, {
        isCreateTaxInProcess: false,
        isCreateTaxSuccess: false
      });
    }
    default:
      return state;
  }
}