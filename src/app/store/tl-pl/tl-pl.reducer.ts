import {AccountDetails} from '../../models/api-models/tb-pl-bs';
import {ChildGroup} from '../../models/api-models/Search';
import {CustomActions} from '../customActions';
import {TlPlConst} from '../../actions/tl-pl/tl-pl.const';
import * as _ from 'lodash';
import {IFlattenGroupsAccountsDetail} from '../../models/interfaces/flattenGroupsAccountsDetail.interface';
import {TransactionsResponse} from '../../models/api-models/Ledger';
import {AccountResponse} from '../../models/api-models/Account';

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
    flattenGroupsAccounts: IFlattenGroupsAccountsDetail[];
    isFlyAccountInProcess: boolean;
    transactionsResponse?: TransactionsResponse;
    transactionInProgress: boolean;
    accountDetails?: AccountResponse;
    accountDetailsInProgress: boolean;
}

const initialState: TBPlBsState = {
    tb: {
        data: null,
        noData: true,
        showLoader: false,
        exportData: [],
        count: 0,
        detailedGroups: [],
    },
    flattenGroupsAccounts: [],
    isFlyAccountInProcess: false,
    transactionInProgress: false,
    transactionsResponse: null,
    accountDetails: null,
    accountDetailsInProgress: false
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
                    tb: {...state.tb, data, noData, showLoader, exportData: data.groupDetails}
                };
            } else {
                return {...state, tb: {...state.tb, showLoader: false, exportData: [], data: null, noData: true}};
            }
        }
        case TlPlConst.GET_TRIAL_BALANCE_REQUEST: {
            return {...state, tb: {...state.tb, showLoader: true}};
        }

        case TlPlConst.GET_FLAT_ACCOUNT_W_GROUP_REQUEST:
            return Object.assign({}, state, {isFlyAccountInProcess: true});
        case TlPlConst.GET_FLAT_ACCOUNT_W_GROUP_RESPONSE:
            return Object.assign({}, state, {
                isFlyAccountInProcess: false,
                flattenGroupsAccounts: prepare(action.payload ? action.payload.results : [])
            });

        case TlPlConst.GET_ACC_TRANSACTION: {
            return {
                ...state,
                transactionInProgress: true
            };
        }
        case TlPlConst.GET_ACC_TRANSACTION_RESPONSE: {
            return {
                ...state,
                transactionInProgress: false,
                transactionsResponse: action.payload
            };
        }
        case TlPlConst.GET_MORE_ACC_TRANSACTION: {
            return {
                ...state,
                transactionInProgress: true
            };
        }
        case TlPlConst.GET_MORE_ACC_TRANSACTION_RESPONSE: {
            let response: TransactionsResponse = action.payload;
            if (response) {
                return {
                    ...state,
                    transactionInProgress: false,
                    transactionsResponse: {
                        ...state.transactionsResponse,
                        totalPages: response.totalPages,
                        closingBalance: response.closingBalance,
                        count: response.count,
                        creditTotal: response.creditTotal,
                        creditTransactionsCount: response.creditTransactionsCount,
                        debitTotal: response.debitTotal,
                        debitTransactionsCount: response.debitTransactionsCount,
                        forwardedBalance: response.forwardedBalance,
                        page: response.page,
                        totalItems: response.totalItems,
                        creditTransactions: state.transactionsResponse.creditTransactions.concat(response.creditTransactions),
                        debitTransactions: state.transactionsResponse.debitTransactions.concat(response.debitTransactions)
                    }
                };
            }
            return {
                ...state,
                transactionInProgress: false,
                transactionsResponse: response
            }
        }
        case TlPlConst.GET_LEDGER_ACCOUNT:
            return {
                ...state,
                accountDetailsInProgress: true
            };
        case  TlPlConst.GET_LEDGER_ACCOUNT_RESPONSE:
            if (action.payload) {
                return {
                    ...state,
                    accountDetailsInProgress: false,
                    accountDetails: action.payload
                };
            } else {
                return {
                    ...state,
                    accountDetailsInProgress: false,
                    accountDetails: null
                };
            }
        default:
            return state;
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

// FlattenAccountWGroups Functions
const prepare = (data: IFlattenGroupsAccountsDetail[]) => {
    if (data) {
        return data.map(p => {
            return {
                accountDetails: p.accountDetails,
                groupName: p.groupName,
                applicableTaxes: p.applicableTaxes,
                groupSynonyms: p.groupSynonyms,
                isOpen: false,
                groupUniqueName: p.groupUniqueName
            };
        });
    }
};
