import { AccountDetails } from "../../models/api-models/tb-pl-bs";
import { ChildGroup } from "../../models/api-models/Search";
import { CustomActions } from "../customActions";
import { TlPlConst } from "../../actions/tl-pl/tl-pl.const";
import * as _ from 'lodash';

interface TbState {
    data?: AccountDetails;
    exportData: ChildGroup[];
    count: 0;
    detailedGroups: any;
    showLoader: boolean;
    noData: boolean;
}

export interface TBPlBsState {
    tb?: TbState;
}

const initialState: TBPlBsState = {
    tb: {
        data: null,
        noData: true,
        showLoader: false,
        exportData: [],
        count: 0,
        detailedGroups: [],
    }
};


export function tbPlBsReducer(state = initialState, action: CustomActions): TBPlBsState {
    switch (action.type) {
        case TlPlConst.GET_TRIAL_BALANCE_RESPONSE: {
            // no payload means error from server
            if (action.payload) {
                let data: AccountDetails = _.cloneDeep(action.payload) as AccountDetails;
                data.groupDetails = removeZeroAmountAccount((data.groupDetails));
                let noData = false;
                let showLoader = false;
                if (data.closingBalance.amount === 0 && data.creditTotal === 0 && data.debitTotal === 0 && data.forwardedBalance.amount === 0) {
                    noData = true;
                }
                return {
                    ...state,
                    tb: { ...state.tb, data, noData, showLoader, exportData: data.groupDetails }
                };
            } else {
                return { ...state, tb: { ...state.tb, showLoader: false, exportData: [], data: null, noData: true } };
            }
        }
        case TlPlConst.GET_TRIAL_BALANCE_REQUEST: {
            return { ...state, tb: { ...state.tb, showLoader: true } };
        }
    }
}

// TB Functions
const removeZeroAmountAccount = (grpList: ChildGroup[]) => {
    _.each(grpList, (grp) => {
        let count = 0;
        let tempAcc = [];
        if (grp.closingBalance.amount > 0 || grp.forwardedBalance.amount > 0 || grp.creditTotal > 0 || grp.debitTotal > 0) {
            _.each(grp.accounts, (account) => {
                if (account.closingBalance.amount > 0 || account.openingBalance.amount > 0 || account.creditTotal > 0 || account.debitTotal > 0) {
                    return tempAcc.push(account);
                } else {
                    return count = count + 1;
                }
            });
        }
        if (tempAcc.length > 0) {
            grp.accounts = tempAcc;
        }
        if (grp.childGroups.length > 0) {
            return removeZeroAmountAccount(grp.childGroups);
        }
    });
    // console.log(grpList);

    return grpList;
};
